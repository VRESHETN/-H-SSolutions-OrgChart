sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/Dialog",
  "sap/m/Tree",
  "sap/m/StandardTreeItem",
  "sap/m/Button",
  "sap/m/VBox",
  "sap/m/Toolbar",
  "sap/m/ToolbarSpacer",
  "sap/m/SearchField"
], function (Controller, JSONModel, Dialog, Tree, StandardTreeItem, Button, VBox, Toolbar, ToolbarSpacer, SearchField) {
  "use strict"

  return Controller.extend("hs.com.orgchart.controller.Orgchart", {

    onInit: function () {
      this.byId("chartHost").setContent("<div id='tree'></div>")
      this._nodeMap = {}
      this._detailMap = {}
      this._skillMap = {}
      this._orgRows = []
      this._orgLoaded = false
      this._detailsLoaded = false
      this._skillsLoaded = false
      this._allNodes = []
      this.onLoad()

      this.getView().setModel(new JSONModel({
        query: "",
        results: [],
        visible: false
      }), "searchModel")

      this.getView().setModel(new JSONModel({
        nodes: [],
        selectedIds: [],
        selectionText: ""
      }), "treeFilterModel")

    },

    onLoad: function () {
      var model = this.getOwnerComponent().getModel()

      model.read("/OrgUnitSet", {
        success: function (response) {
          this._orgRows = response.results || []
          this._orgLoaded = true
          this._tryBuildChart()
        }.bind(this),
        error: function () {
          this._orgRows = []
          this._orgLoaded = true
          this._tryBuildChart()
        }.bind(this)
      })

      model.read("/OrgNodeDetailSet", {
        success: function (response) {
          var rows = response.results || []

          this._detailMap = {}
          rows.forEach(function (item) {
            if (item.NodeId) {
              this._detailMap[item.NodeId] = item
            }
          }.bind(this))

          this._detailsLoaded = true
          this._tryBuildChart()
        }.bind(this),
        error: function () {
          this._detailMap = {}
          this._detailsLoaded = true
          this._tryBuildChart()
        }.bind(this)
      })

      model.read("/OrgNodeSkillSet", {
        success: function (response) {
          var rows = response.results || []

          this._skillMap = {}
          rows.forEach(function (item) {
            var nodeId = item.NodeId
            var skillName = item.SkillName || ""

            if (!nodeId) {
              return
            }

            if (!this._skillMap[nodeId]) {
              this._skillMap[nodeId] = []
            }

            this._skillMap[nodeId].push(skillName)
          }.bind(this))

          Object.keys(this._skillMap).forEach(function (nodeId) {
            this._skillMap[nodeId] = this._sanitizeSkills(this._skillMap[nodeId])
          }.bind(this))

          this._skillsLoaded = true
          this._tryBuildChart()
        }.bind(this),
        error: function () {
          this._skillMap = {}
          this._skillsLoaded = true
          this._tryBuildChart()
        }.bind(this)
      })
    },

    _tryBuildChart: function () {
      if (!this._orgLoaded || !this._detailsLoaded || !this._skillsLoaded) {
        return
      }

      this.onData({
        results: this._orgRows
      })
    },

    onData: function (response) {
      var rows = response.results || []
      var originalNodes = rows.map(function (item) {
        var isEmp = item.NodeType !== "O" && item.NodeType !== "S"
        var detail = this._detailMap[item.NodeId] || {}
        var skills = isEmp ? this._sanitizeSkills(this._skillMap[item.NodeId] || []) : []

        var email = isEmp ? this._sanitizeText(detail.Email || "") : ""
        var phone = isEmp ? this._sanitizeText(detail.Phone || "") : ""
        var photoUrl = isEmp
          ? this._normalizePhoto(detail.PhotoUrl || item.PhotoUrl || "")
          : (item.PhotoUrl || "")

        var tags = []

        if (item.NodeType === "O") {
          tags = ["unit"]
        } else if (item.NodeType === "S") {
          tags = ["pos"]
        } else {
          tags = ["emp"]
        }

        return {
          id: item.NodeId,
          pid: item.ParentId || "",
          node_type: item.NodeType,
          name: this._sanitizeText(item.Name || ""),
          title: this._sanitizeRoleTitle(item.Title || ""),
          email: email,
          phone: phone,
          photo_url: photoUrl,
          teams_url: isEmp ? this._buildTeamsUrl(email) : "",
          outlook_url: isEmp ? this._buildOutlookUrl(email) : "",
          skills: skills,
          tags: tags
        }
      }.bind(this))

      this._profileNodeMap = {}

      originalNodes.forEach(function (node) {
        this._profileNodeMap[node.id] = node
      }.bind(this))

      this._prepareNodeFilter(originalNodes)

      var chartNodes = this._insertTeamContainers(originalNodes)
      chartNodes = this._insertTopAnchors(chartNodes)

      this._nodeMap = {}

      chartNodes.forEach(function (node) {
        this._nodeMap[node.id] = node
      }.bind(this))

      this._allNodes = chartNodes
      this.initChart(chartNodes)
    },

    initChart: function (nodes) {
      this._prepareTeamTemplates(nodes)

      var nodeBinding = this._createNodeBinding()
      var chartTags = this._createChartTags(nodes)

      this._chart = new OrgChart(document.getElementById("tree"), {
        layout: OrgChart.layout.tree,
        template: "ula_custom_emp",
        nodeTreeMenu: false,
        enableSearch: false,
        mouseScrool: OrgChart.action.zoom,
        nodeMouseClick: OrgChart.action.none,
        scaleInitial: OrgChart.match.boundary,
        padding: 80,
        levelSeparation: 80,
        siblingSeparation: 180,
        subtreeSeparation: 300,
        nodeBinding: nodeBinding,
        nodes: nodes,
        tags: chartTags,
        toolbar: {
          zoom: true,
          fit: true,
          fullScreen: true,
          expandAll: true,
          collapseAll: true
        },
        editForm: {
          buttons: {
            pdf: null,
            edit: null,
            share: null,
            remove: null
          }
        }
      })

      this._registerTeamMemberClick()

      this._chart.on("click", function (sender, args) {
        var nativeEvent = args.event || args.e || window.event
        var target = nativeEvent && nativeEvent.target

        if (target && target.closest && target.closest(".hs-card-action-link")) {
          return true
        }

        var node = args.node

        if (!node) {
          return false
        }

        if (node.tags && node.tags.indexOf("emp") !== -1) {
          this._chart.editUI.show(node.id)
        }

        return false
      }.bind(this))

      this._chart.editUI.on("show", function (sender, nodeId) {
        var node = this._nodeMap[nodeId]

        if (!node || !node.tags) {
          return
        }

        if (node.tags.indexOf("emp") === -1) {
          return
        }

        setTimeout(function () {
          this._renderEmployeeProfile(node)
        }.bind(this), 50)
      }.bind(this))
    },

    _insertTopAnchors: function (nodes) {
      var result = []

      nodes.forEach(function (node) {
        var needsAnchor = node.member_count && node.pid

        if (!needsAnchor) {
          result.push(node)
          return
        }

        var anchorId = "ANCHOR_" + node.id

        result.push({
          id: anchorId,
          pid: node.pid,
          node_type: "A",
          name: "",
          title: "",
          photo_url: "",
          tags: ["anchor"]
        })

        node.pid = anchorId
        result.push(node)
      })

      return result
    },

    _prepareNodeFilter: function (nodes) {
      var allNodeMap = {}
      var orgNodeMap = {}
      var childrenMap = {}
      var rootNodes = []
      var flatNodes = []

      nodes.forEach(function (node) {
        if (!node.id) {
          return
        }

        allNodeMap[node.id] = node

        if (node.node_type === "O" && node.id !== "ROOT_MANAGEMENT") {
          orgNodeMap[node.id] = {
            id: node.id,
            text: node.name || node.id,
            pid: node.pid || "",
            children: []
          }
        }
      })

      function findNearestOrgParentId(node) {
        var parentId = node.pid
        var safetyCounter = 0

        while (parentId && safetyCounter < 50) {
          if (orgNodeMap[parentId]) {
            return parentId
          }

          var parentNode = allNodeMap[parentId]

          if (!parentNode) {
            return ""
          }

          parentId = parentNode.pid
          safetyCounter++
        }

        return ""
      }

      Object.keys(orgNodeMap).forEach(function (nodeId) {
        var orgNode = orgNodeMap[nodeId]
        var sourceNode = allNodeMap[nodeId]
        var nearestOrgParentId = findNearestOrgParentId(sourceNode)

        if (nearestOrgParentId && orgNodeMap[nearestOrgParentId]) {
          if (!childrenMap[nearestOrgParentId]) {
            childrenMap[nearestOrgParentId] = []
          }

          childrenMap[nearestOrgParentId].push(orgNode)
        } else {
          rootNodes.push(orgNode)
        }
      })

      function sortByText(firstNode, secondNode) {
        var firstText = String(firstNode.text || "").toLowerCase()
        var secondText = String(secondNode.text || "").toLowerCase()

        if (firstText < secondText) {
          return -1
        }

        if (firstText > secondText) {
          return 1
        }

        return 0
      }

      function buildTree(node) {
        var children = childrenMap[node.id] || []

        children.sort(sortByText)

        children.forEach(function (child) {
          node.children.push(child)
          buildTree(child)
        })
      }

      rootNodes.sort(sortByText)

      rootNodes.forEach(function (node) {
        buildTree(node)
      })

      this.getView().setModel(new JSONModel({
        nodes: rootNodes,
        selectedIds: [],
        selectionText: ""
      }), "treeFilterModel")
    },

    onOpenNodeFilterDialog: function () {
      if (!this._nodeFilterDialog) {
        var tree = new Tree(this.createId("nodeFilterTree"), {
          mode: "MultiSelect",
          includeItemInSelection: true,
          items: {
            path: "treeFilterModel>/nodes",
            parameters: {
              arrayNames: ["children"]
            },
            template: new StandardTreeItem({
              title: "{treeFilterModel>text}"
            })
          }
        })

        var searchField = new SearchField(this.createId("nodeFilterTreeSearch"), {
          width: "100%",
          placeholder: "Organisationseinheit suchen",
          liveChange: function (event) {
            this.onNodeTreeSearch(event)
          }.bind(this)
        })

        this._nodeFilterDialog = new Dialog(this.createId("nodeFilterDialog"), {
          title: "Organisationseinheiten auswählen",
          contentWidth: "560px",
          contentHeight: "620px",
          resizable: true,
          draggable: true,
          content: [
            new VBox({
              width: "100%",
              items: [
                searchField,
                tree
              ]
            })
          ],
          buttons: [
            new Button({
              text: "Übernehmen",
              type: "Emphasized",
              press: function () {
                this.onApplyNodeTreeFilter()
              }.bind(this)
            }),
            new Button({
              text: "Abbrechen",
              press: function () {
                this._nodeFilterDialog.close()
              }.bind(this)
            })
          ]
        })

        this.getView().addDependent(this._nodeFilterDialog)
      }

      this._syncNodeTreeSelection()
      this._nodeFilterDialog.open()
    },

    onNodeTreeSearch: function (event) {
      var query = String(event.getParameter("newValue") || "").trim()
      var tree = this.byId("nodeFilterTree")

      if (!tree) {
        return
      }

      if (query) {
        tree.expandToLevel(10)
      } else {
        tree.expandToLevel(1)
      }
    },

    _syncNodeTreeSelection: function () {
      var tree = this.byId("nodeFilterTree")
      var treeModel = this.getView().getModel("treeFilterModel")
      var selectedIds = treeModel ? treeModel.getProperty("/selectedIds") || [] : []

      if (!tree) {
        return
      }

      tree.removeSelections(true)

      tree.getItems().forEach(function (item) {
        var context = item.getBindingContext("treeFilterModel")
        var object = context ? context.getObject() : null

        if (object && selectedIds.indexOf(object.id) !== -1) {
          tree.setSelectedItem(item, true)
        }
      })
    },

    onApplyNodeTreeFilter: function () {
      var tree = this.byId("nodeFilterTree")
      var treeModel = this.getView().getModel("treeFilterModel")
      var selectedItems = tree ? tree.getSelectedItems() : []
      var selectedIds = []
      var selectedNames = []

      selectedItems.forEach(function (item) {
        var context = item.getBindingContext("treeFilterModel")
        var object = context ? context.getObject() : null

        if (!object || !object.id) {
          return
        }

        selectedIds.push(object.id)
        selectedNames.push(object.text)
      })

      if (treeModel) {
        treeModel.setProperty("/selectedIds", selectedIds)

        if (!selectedNames.length) {
          treeModel.setProperty("/selectionText", "")
        } else if (selectedNames.length === 1) {
          treeModel.setProperty("/selectionText", selectedNames[0])
        } else {
          treeModel.setProperty("/selectionText", selectedNames.length + " Organisationseinheiten ausgewählt")
        }
      }

      this._applyNodeFilterByIds(selectedIds)

      if (this._nodeFilterDialog) {
        this._nodeFilterDialog.close()
      }
    },

    _applyNodeFilterByIds: function (selectedIds) {
      if (!selectedIds || !selectedIds.length) {
        this._nodeMap = {}

        this._allNodes.forEach(function (node) {
          this._nodeMap[node.id] = node
        }.bind(this))

        if (this._chart) {
          this._chart.load(this._allNodes)
        }

        return
      }

      var filteredNodes = this._getFilteredNodesWithParentsAndChildren(selectedIds)

      this._nodeMap = {}

      filteredNodes.forEach(function (node) {
        this._nodeMap[node.id] = node
      }.bind(this))

      if (this._chart) {
        this._chart.load(filteredNodes)
      }
    },

    onApplyFilters: function () {
      var treeModel = this.getView().getModel("treeFilterModel")
      var selectedIds = treeModel ? treeModel.getProperty("/selectedIds") || [] : []

      this._applyNodeFilterByIds(selectedIds)
    },

    onClearNodeFilter: function () {
      var filter = this.byId("nodeFilter")
      var searchModel = this.getView().getModel("searchModel")
      var treeModel = this.getView().getModel("treeFilterModel")
      var employeeSearch = this.byId("employeeSearch")
      var tree = this.byId("nodeFilterTree")

      if (filter) {
        filter.removeAllSelectedItems()
        filter.setSelectedKeys([])
      }

      if (tree) {
        tree.removeSelections(true)
      }

      if (treeModel) {
        treeModel.setProperty("/selectedIds", [])
        treeModel.setProperty("/selectionText", "")
      }

      if (searchModel) {
        searchModel.setProperty("/query", "")
        searchModel.setProperty("/results", [])
        searchModel.setProperty("/visible", false)
      }

      if (employeeSearch) {
        employeeSearch.setValue("")
      }

      this._applyNodeFilterByIds([])
    },

    _getFilteredNodesWithParentsAndChildren: function (selectedIds) {
      var resultMap = {}
      var nodeMap = {}
      var childrenMap = {}

      this._allNodes.forEach(function (node) {
        nodeMap[node.id] = node

        if (node.pid) {
          if (!childrenMap[node.pid]) {
            childrenMap[node.pid] = []
          }

          childrenMap[node.pid].push(node)
        }
      })

      function addChildren(node) {
        resultMap[node.id] = node

        var children = childrenMap[node.id] || []

        children.forEach(function (child) {
          addChildren(child)
        })
      }

      selectedIds.forEach(function (selectedId) {
        var selectedNode = nodeMap[selectedId]

        if (!selectedNode) {
          return
        }

        addChildren(selectedNode)
      })

      return this._allNodes.filter(function (node) {
        return !!resultMap[node.id]
      })
    },

    _buildTeamsUrl: function (email) {
      if (!email) {
        return ""
      }

      return "https://teams.microsoft.com/l/chat/0/0?users=" + encodeURIComponent(email)
    },

    _normalizePhoto: function (photoValue) {
      if (!photoValue) {
        return ""
      }

      if (
        photoValue.indexOf("http://") === 0 ||
        photoValue.indexOf("https://") === 0 ||
        photoValue.indexOf("data:image") === 0 ||
        photoValue.indexOf("sap-icon://") === 0
      ) {
        return photoValue
      }

      return "data:image/jpeg;base64," + photoValue
    },

    _sanitizeText: function (value) {
      var text = String(value || "").trim()

      if (!text) {
        return ""
      }

      if (text.toLowerCase() === "lorem ipsum") {
        return ""
      }

      return text
    },

    _sanitizeSkills: function (skills) {
      var uniqueSkills = []
      var seen = {}
      var safeSkills = skills || []

      safeSkills.forEach(function (skill) {
        var normalized = this._sanitizeText(skill)

        if (!normalized) {
          return
        }

        var key = normalized.toLowerCase()
        if (!seen[key]) {
          seen[key] = true
          uniqueSkills.push(normalized)
        }
      }.bind(this))

      return uniqueSkills
    },

    _insertTeamContainers: function (nodes) {
      var nodeMap = {}
      var childrenMap = {}
      var hiddenIds = {}
      var rootIds = {}
      var rootId = ""

      nodes.forEach(function (node) {
        nodeMap[node.id] = node

        if (node.pid) {
          if (!childrenMap[node.pid]) {
            childrenMap[node.pid] = []
          }

          childrenMap[node.pid].push(node)
        }
      })

      nodes.forEach(function (node) {
        if (node.node_type === "O" && (!node.pid || !nodeMap[node.pid])) {
          rootIds[node.id] = true
          rootId = node.id
        }
      })

      function isEmployeeNode(node) {
        return node.tags && node.tags.indexOf("emp") !== -1
      }

      function isLeaderNode(node) {
        return node && node.id && node.id.indexOf("LP") === 0
      }

      function findDirectLeader(orgNode) {
        var children = childrenMap[orgNode.id] || []
        var leader = null

        children.some(function (child) {
          if (isLeaderNode(child)) {
            leader = child
            return true
          }

          return false
        })

        if (!leader && orgNode.leader_id && nodeMap[orgNode.leader_id]) {
          leader = nodeMap[orgNode.leader_id]
        }

        return leader
      }

      function findInheritedLeader(orgNode) {
        var parentId = orgNode.pid
        var safetyCounter = 0

        while (parentId && safetyCounter < 50) {
          var parentNode = nodeMap[parentId]

          if (!parentNode) {
            return null
          }

          if (parentNode.node_type === "O") {
            var leader = findDirectLeader(parentNode)

            if (leader) {
              return leader
            }
          }

          parentId = parentNode.pid
          safetyCounter++
        }

        return null
      }

      if (rootId) {
        var rootChildren = childrenMap[rootId] || []
        var managementMembers = []

        rootChildren.forEach(function (child) {
          if (isLeaderNode(child)) {
            managementMembers.push(child)
            return
          }

          if (isEmployeeNode(child)) {
            managementMembers.push(child)
          }
        })

        if (managementMembers.length) {
          var managementNode = {
            id: "ROOT_MANAGEMENT",
            pid: rootId,
            node_type: "O",
            name: "Geschäftsführung",
            title: "Unternehmensleitung",
            photo_url: "",
            tags: ["team_" + String(managementMembers.length)],
            member_count: managementMembers.length
          }

          for (var clearIndex = 1; clearIndex <= 20; clearIndex++) {
            managementNode["emp_" + clearIndex + "_id"] = ""
            managementNode["emp_" + clearIndex + "_name"] = ""
            managementNode["emp_" + clearIndex + "_title"] = ""
            managementNode["emp_" + clearIndex + "_photo"] = ""
            managementNode["emp_" + clearIndex + "_teams_url"] = ""
            managementNode["emp_" + clearIndex + "_outlook_url"] = ""
          }

          var leader = managementMembers[0]

          managementNode.leader_id = leader.id
          managementNode.leader_name = leader.name || ""
          managementNode.leader_title = leader.title || ""
          managementNode.leader_photo = leader.photo_url || ""
          managementNode.leader_teams_url = leader.teams_url || ""
          managementNode.leader_outlook_url = leader.outlook_url || ""

          managementMembers.slice(1).forEach(function (employee, index) {
            var number = index + 1

            managementNode["emp_" + number + "_id"] = employee.id
            managementNode["emp_" + number + "_name"] = employee.name || ""
            managementNode["emp_" + number + "_title"] = employee.title || ""
            managementNode["emp_" + number + "_photo"] = employee.photo_url || ""
            managementNode["emp_" + number + "_teams_url"] = employee.teams_url || ""
            managementNode["emp_" + number + "_outlook_url"] = employee.outlook_url || ""
          })

          managementMembers.forEach(function (employee) {
            hiddenIds[employee.id] = true
          })

          nodes.forEach(function (node) {
            if (node.node_type === "O" && node.pid === rootId) {
              node.pid = managementNode.id
            }
          })

          nodes.push(managementNode)
          nodeMap[managementNode.id] = managementNode
        }
      }

      nodes.forEach(function (teamNode) {
        if (teamNode.node_type !== "O") {
          return
        }

        if (rootIds[teamNode.id]) {
          teamNode.tags = ["unit"]
          return
        }

        if (teamNode.id === "ROOT_MANAGEMENT") {
          return
        }

        var children = childrenMap[teamNode.id] || []
        var leader = null
        var inheritedLeader = null
        var directEmployees = []

        children.forEach(function (child) {
          if (isLeaderNode(child)) {
            leader = child
            return
          }

          if (isEmployeeNode(child)) {
            directEmployees.push(child)
          }
        })

        if (!leader) {
          inheritedLeader = findInheritedLeader(teamNode)
          leader = inheritedLeader
        }

        if (!leader) {
          teamNode.tags = ["empty_team"]
          return
        }

        var employees = []

        if (!inheritedLeader) {
          var leaderChildren = childrenMap[leader.id] || []

          employees = leaderChildren.filter(function (child) {
            return isEmployeeNode(child) && child.id !== leader.id
          })

          leaderChildren.forEach(function (child) {
            if (child.node_type === "O") {
              child.pid = teamNode.id
            }
          })

          hiddenIds[leader.id] = true
        }

        directEmployees.forEach(function (employee) {
          var exists = employees.some(function (item) {
            return item.id === employee.id
          })

          if (!exists && employee.id !== leader.id) {
            employees.push(employee)
          }
        })

        employees.forEach(function (employee) {
          hiddenIds[employee.id] = true
        })

        for (var clearIndex = 1; clearIndex <= 20; clearIndex++) {
          teamNode["emp_" + clearIndex + "_id"] = ""
          teamNode["emp_" + clearIndex + "_name"] = ""
          teamNode["emp_" + clearIndex + "_title"] = ""
          teamNode["emp_" + clearIndex + "_photo"] = ""
          teamNode["emp_" + clearIndex + "_teams_url"] = ""
          teamNode["emp_" + clearIndex + "_outlook_url"] = ""
        }

        teamNode.member_count = employees.length + 1
        teamNode.leader_id = leader.id
        teamNode.leader_name = leader.name || ""
        teamNode.leader_title = leader.title || ""
        teamNode.leader_photo = leader.photo_url || ""
        teamNode.leader_teams_url = leader.teams_url || ""
        teamNode.leader_outlook_url = leader.outlook_url || ""

        employees.forEach(function (employee, index) {
          var number = index + 1

          teamNode["emp_" + number + "_id"] = employee.id
          teamNode["emp_" + number + "_name"] = employee.name || ""
          teamNode["emp_" + number + "_title"] = employee.title || ""
          teamNode["emp_" + number + "_photo"] = employee.photo_url || ""
          teamNode["emp_" + number + "_teams_url"] = employee.teams_url || ""
          teamNode["emp_" + number + "_outlook_url"] = employee.outlook_url || ""
        })

        teamNode.tags = ["team_" + String(teamNode.member_count)]
      })

      return nodes.filter(function (node) {
        if (hiddenIds[node.id]) {
          return false
        }

        if (node.id && node.id.indexOf("TEAM_") === 0) {
          return false
        }

        return true
      })
    },

    _sanitizeRoleTitle: function (value) {
      var text = this._sanitizeText(value)

      if (!text) {
        return ""
      }

      text = text.replace(/\s*\d+\s*$/g, "")

      return text.trim()
    },

    _createNodeBinding: function () {
      var binding = {
        field_0: "name",
        field_1: "title",
        field_2: "",
        field_3: "teams_url",
        field_4: "outlook_url",
        field_5: "",

        field_6: "leader_name",
        field_7: "leader_title",
        field_8: "leader_teams_url",
        field_9: "leader_outlook_url",
        field_10: "leader_id",
        field_11: "",
        field_12: "",

        img_0: "photo_url",
        img_1: "leader_photo"
      }

      for (var index = 1; index <= 20; index++) {
        var base = 20 + (index - 1) * 7

        binding["field_" + base] = "emp_" + index + "_name"
        binding["field_" + (base + 1)] = "emp_" + index + "_title"
        binding["field_" + (base + 2)] = "emp_" + index + "_teams_url"
        binding["field_" + (base + 3)] = "emp_" + index + "_outlook_url"
        binding["field_" + (base + 4)] = "emp_" + index + "_id"
        binding["field_" + (base + 5)] = ""
        binding["field_" + (base + 6)] = ""

        binding["img_" + (index + 1)] = "emp_" + index + "_photo"
      }

      return binding
    },

    _createChartTags: function (nodes) {
      var tags = {
        unit: { template: "ula_custom_unit" },
        pos: { template: "ula_custom_pos" },
        emp: { template: "ula_custom_emp" },
        emp_noskills: { template: "ula_custom_emp_noskills" },
        empty_team: { template: "ula_custom_empty_team" },
        anchor: { template: "ula_custom_anchor" }
      }

      nodes.forEach(function (node) {
        if (!node.member_count) {
          return
        }

        tags["team_" + String(node.member_count)] = {
          template: "ula_custom_team_" + String(node.member_count)
        }
      })

      return tags
    },

    _prepareTeamTemplates: function (nodes) {
      var maxCount = 1

      nodes.forEach(function (node) {
        if (node.member_count && node.member_count > maxCount) {
          maxCount = node.member_count
        }
      })

      if (window.HsOrgChartTemplates && window.HsOrgChartTemplates.createTeamTemplates) {
        window.HsOrgChartTemplates.createTeamTemplates(maxCount)
      }
    },

    _registerTeamMemberClick: function () {
      var chartElement = document.getElementById("tree")

      if (!chartElement) {
        return
      }

      chartElement.onclick = function (event) {
        var linkElement = event.target && event.target.closest ? event.target.closest(".hs-card-action-link") : null

        if (linkElement) {
          return
        }

        var target = event.target
        var memberElement = target && target.closest ? target.closest(".hs-team-member-click") : null

        if (!memberElement) {
          return
        }

        var memberId = memberElement.getAttribute("data-member-id")
        var memberNode = this._profileNodeMap && this._profileNodeMap[memberId]

        if (!memberNode) {
          return
        }

        var chartNodeElement = target.closest("[data-n-id]")
        var chartNodeId = chartNodeElement ? chartNodeElement.getAttribute("data-n-id") : ""

        if (chartNodeId) {
          this._chart.editUI.show(chartNodeId)
        }

        setTimeout(function () {
          this._renderEmployeeProfile(memberNode)
        }.bind(this), 50)

        event.preventDefault()
        event.stopPropagation()
      }.bind(this)
    },

    _renderEmployeeProfile: function (node) {
      var form = document.querySelector(".boc-edit-form")

      if (!form) {
        return
      }

      var header = form.querySelector(".boc-edit-form-header")
      var body = form.querySelector(".boc-edit-form-body")
      var contentArea = form.querySelector(".boc-edit-form-content")
      var fieldsContainer = form.querySelector(".boc-edit-form-fields")

      if (!fieldsContainer) {
        return
      }

      form.classList.add("hs-orgchart-popup")

      if (header) {
        header.classList.add("hs-orgchart-popup-header")
        header.textContent = "Mitarbeiterprofil"
      }

      if (body) {
        body.classList.add("hs-orgchart-popup-body")
      }

      if (contentArea) {
        contentArea.classList.add("hs-orgchart-popup-content")
      }

      fieldsContainer.className = "boc-edit-form-fields hs-orgchart-popup-fields"
      fieldsContainer.innerHTML = ""

      var wrapper = document.createElement("div")
      wrapper.className = "hs-orgchart-profile"

      var topSection = document.createElement("div")
      topSection.className = "hs-orgchart-profile-top"

      var image = document.createElement("img")
      image.className = "hs-orgchart-profile-image"
      image.src = node.photo_url || ""
      image.alt = node.name || ""

      if (!node.photo_url) {
        image.style.display = "none"
      }

      var identity = document.createElement("div")
      identity.className = "hs-orgchart-profile-identity"

      var nameEl = document.createElement("div")
      nameEl.className = "hs-orgchart-profile-name"
      nameEl.textContent = node.name || ""

      var roleEl = document.createElement("div")
      roleEl.className = "hs-orgchart-profile-role"
      roleEl.textContent = node.title || ""

      identity.appendChild(nameEl)
      identity.appendChild(roleEl)

      topSection.appendChild(image)
      topSection.appendChild(identity)

      var content = document.createElement("div")
      content.className = "hs-orgchart-profile-content"

      function createInfoCard(labelText, valueNode) {
        var row = document.createElement("div")
        row.className = "hs-orgchart-info-row"

        var label = document.createElement("div")
        label.className = "hs-orgchart-info-label"
        label.textContent = labelText

        row.appendChild(label)
        row.appendChild(valueNode)

        return row
      }

      function createTextValue(text) {
        var value = document.createElement("div")
        value.className = "hs-orgchart-text-value"
        value.textContent = text
        return value
      }

      function createLink(text, href, extraClass, targetBlank) {
        var link = document.createElement("a")
        link.className = "hs-orgchart-link " + (extraClass || "")
        link.href = href
        link.textContent = text

        if (targetBlank) {
          link.target = "_blank"
          link.rel = "noopener noreferrer"
        }

        return link
      }

      function createActionButton(text, href, modifierClass) {
        var link = document.createElement("a")
        link.className = "hs-orgchart-action-button " + (modifierClass || "")
        link.href = href
        link.textContent = text
        link.target = "_blank"
        link.rel = "noopener noreferrer"
        return link
      }

      function createSkillsTable(skills) {
        var section = document.createElement("div")
        section.className = "hs-orgchart-skills-table"

        if (!skills || !skills.length) {
          section.appendChild(createTextValue("Keine Kompetenzen vorhanden"))
          return section
        }

        var table = document.createElement("div")
        table.className = "hs-orgchart-skills-grid"

        skills.forEach(function (skill, index) {
          var row = document.createElement("div")
          row.className = "hs-orgchart-skill-row"

          var indexCell = document.createElement("div")
          indexCell.className = "hs-orgchart-skill-index"
          indexCell.textContent = String(index + 1)

          var valueCell = document.createElement("div")
          valueCell.className = "hs-orgchart-skill-value"
          valueCell.textContent = skill

          row.appendChild(indexCell)
          row.appendChild(valueCell)
          table.appendChild(row)
        })

        section.appendChild(table)
        return section
      }

      if (node.email) {
        content.appendChild(
          createInfoCard(
            "E-Mail",
            createLink(node.email, "mailto:" + node.email, "hs-orgchart-link-primary", false)
          )
        )
      }

      if (node.phone) {
        content.appendChild(
          createInfoCard(
            "Telefon",
            createLink(node.phone, "tel:" + node.phone, "hs-orgchart-link-dark", false)
          )
        )
      }

      if (node.teams_url || node.outlook_url) {
        var actionsWrap = document.createElement("div")
        actionsWrap.className = "hs-orgchart-actions"

        if (node.teams_url) {
          actionsWrap.appendChild(
            createActionButton("In Teams öffnen", node.teams_url, "hs-orgchart-action-button-primary")
          )
        }

        if (node.outlook_url) {
          actionsWrap.appendChild(
            createActionButton("In Outlook öffnen", node.outlook_url, "hs-orgchart-action-button-secondary")
          )
        }

        content.appendChild(createInfoCard("Aktionen", actionsWrap))
      }

      if (node.skills && node.skills.length) {
        content.appendChild(
          createInfoCard("Kompetenzen", createSkillsTable(node.skills))
        )
      }

      wrapper.appendChild(topSection)
      wrapper.appendChild(content)
      fieldsContainer.appendChild(wrapper)
    },

    onEmployeeSearch: function (event) {
      var query = event.getParameter("newValue") || event.getParameter("query") || ""
      var normalizedQuery = String(query).toLowerCase().trim()
      var results = []
      var seen = {}

      if (!normalizedQuery) {
        this.getView().getModel("searchModel").setProperty("/results", [])
        this.getView().getModel("searchModel").setProperty("/visible", false)
        return
      }

      Object.keys(this._profileNodeMap || {}).forEach(function (nodeId) {
        var node = this._profileNodeMap[nodeId]

        if (!node || !node.tags) {
          return
        }

        if (node.tags.indexOf("emp") === -1 && node.tags.indexOf("emp_noskills") === -1) {
          return
        }

        var duplicateKey = String(node.name || "").toLowerCase().trim()

        if (!duplicateKey || seen[duplicateKey]) {
          return
        }

        if (seen[duplicateKey]) {
          return
        }

        var matchedSkill = ""
        var skills = node.skills || []

        skills.some(function (skill) {
          var skillText = String(skill || "")

          if (skillText.toLowerCase().indexOf(normalizedQuery) !== -1) {
            matchedSkill = skillText
            return true
          }

          return false
        })

        var mainText = [
          node.name,
          node.title,
          node.email,
          node.phone
        ].join(" ").toLowerCase()

        if (mainText.indexOf(normalizedQuery) === -1 && !matchedSkill) {
          return
        }

        seen[duplicateKey] = true

        results.push({
          id: node.id,
          name: node.name || "",
          title: node.title || "",
          photo_url: node.photo_url || "",
          matched_skill: matchedSkill || node.title || "",
          original_node_id: node.id
        })
      }.bind(this))

      this.getView().getModel("searchModel").setProperty("/results", results)
      this.getView().getModel("searchModel").setProperty("/visible", results.length > 0)
    },

    onEmployeeSearchClear: function () {
      var searchModel = this.getView().getModel("searchModel")

      searchModel.setProperty("/query", "")
      searchModel.setProperty("/results", [])
      searchModel.setProperty("/visible", false)
    },

    onEmployeeSearchResultPress: function (event) {
      var result = event.getSource().getBindingContext("searchModel").getObject()

      if (!result || !result.original_node_id) {
        return
      }

      var node = this._profileNodeMap[result.original_node_id]

      if (!node) {
        return
      }

      this.getView().getModel("searchModel").setProperty("/visible", false)

      var visibleNodeId = this._findVisibleNodeForEmployee(node)

      if (visibleNodeId && this._chart) {
        this._chart.editUI.show(visibleNodeId)

        setTimeout(function () {
          this._renderEmployeeProfile(node)
        }.bind(this), 50)

        return
      }

      this._renderEmployeeProfile(node)
    },

    _findVisibleNodeForEmployee: function (employeeNode) {
      if (!employeeNode) {
        return ""
      }

      if (this._nodeMap && this._nodeMap[employeeNode.id]) {
        return employeeNode.id
      }

      var resultId = ""

      Object.keys(this._nodeMap || {}).some(function (nodeId) {
        var node = this._nodeMap[nodeId]

        if (!node.member_count) {
          return false
        }

        if (node.leader_id === employeeNode.id) {
          resultId = node.id
          return true
        }

        for (var index = 1; index <= 20; index++) {
          if (node["emp_" + index + "_id"] === employeeNode.id) {
            resultId = node.id
            return true
          }
        }

        return false
      }.bind(this))

      return resultId
    },

    _buildOutlookUrl: function (email) {
      if (!email) {
        return ""
      }

      return "mailto:" + email
    },
  })
})
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
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
          tags = skills.length ? ["emp"] : ["emp_noskills"]
        }

        return {
          id: item.NodeId,
          pid: item.ParentId || "",
          name: this._sanitizeText(item.Name || ""),
          title: this._sanitizeText(item.Title || ""),
          email: email,
          phone: phone,
          photo_url: photoUrl,
          teams_url: isEmp ? this._buildTeamsUrl(email) : "",
          skills: skills,
          skill_1: skills[0] || "",
          skill_2: skills[1] || "",
          skill_3: skills[2] || "",
          tags: tags
        }
      }.bind(this))

      this._profileNodeMap = {}

      originalNodes.forEach(function (node) {
        this._profileNodeMap[node.id] = node
      }.bind(this))

      var chartNodes = this._insertTeamContainers(originalNodes)

      this._nodeMap = {}

      chartNodes.forEach(function (node) {
        this._nodeMap[node.id] = node
      }.bind(this))

      this._allNodes = chartNodes
      this._prepareNodeFilter(chartNodes)
      this.initChart(chartNodes)
    },


    initChart: function (nodes) {
      this._prepareTeamTemplates(nodes)
      var nodeBinding = this._createNodeBinding()
      var chartTags = this._createChartTags(nodes)
      // var searchFields = this._createSearchFields()
      this._chart = new OrgChart(document.getElementById("tree"), {
        layout: OrgChart.layout.tree,

        template: "ula_custom_emp",
        nodeTreeMenu: false,
        // enableSearch: true,
        // searchFields: searchFields,
        enableSearch: false,
        mouseScrool: OrgChart.action.zoom,
        nodeMouseClick: OrgChart.action.none,
        scaleInitial: OrgChart.match.boundary,
        padding: 50,
        levelSeparation: 80,
        siblingSeparation: 55,
        subtreeSeparation: 120,
        nodeBinding: nodeBinding,
        // nodeBinding: {
        //   field_0: "name",
        //   field_1: "title",
        //   field_2: "leader_name",
        //   field_3: "emp_1_name",
        //   field_4: "emp_2_name",
        //   field_5: "emp_3_name",
        //   img_0: "photo_url",
        //   img_1: "leader_photo",
        //   img_2: "emp_1_photo",
        //   img_3: "emp_2_photo",
        //   img_4: "emp_3_photo",
        //   img_5: "emp_4_photo"
        // },

        nodes: nodes,
        // tags: {
        //   unit: { template: "ula_custom_unit" },
        //   pos: { template: "ula_custom_pos" },
        //   emp: { template: "ula_custom_emp" },
        //   emp_noskills: { template: "ula_custom_emp_noskills" },
        //   team: { template: "ula_custom_team" }
        // },
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
      /*this._chart.on("redraw", function () {
        setTimeout(function () {
          this._drawTeamFrames()
        }.bind(this), 100)
      }.bind(this))*/

      this._chart.on("click", function (sender, args) {
        var event = args.event || window.event
        var target = event && event.target
        var memberElement = target && target.closest ? target.closest(".hs-team-member-click") : null

        if (memberElement) {
          var memberId = memberElement.getAttribute("data-member-id")
          var memberNode = this._nodeMap[memberId]

          if (memberNode) {
            this._chart.editUI.show(memberNode.id)
          }

          return false
        }

        var node = args.node

        if (!node) {
          return false
        }

        if (node.tags && (node.tags.indexOf("emp") !== -1 || node.tags.indexOf("emp_noskills") !== -1)) {
          this._chart.editUI.show(node.id)
        }

        return false
      }.bind(this))

      this._chart.editUI.on("show", function (sender, nodeId) {
        var node = this._nodeMap[nodeId]

        if (!node || !node.tags || (node.tags.indexOf("emp") === -1 && node.tags.indexOf("emp_noskills") === -1)) {
          return
        }

        setTimeout(function () {
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

          if (node.teams_url) {
            var actionsWrap = document.createElement("div")
            actionsWrap.className = "hs-orgchart-actions"

            actionsWrap.appendChild(
              createActionButton("In Teams öffnen", node.teams_url, "hs-orgchart-action-button-primary")
            )

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
        }, 50)
      }.bind(this))
    },

    _prepareNodeFilter: function (nodes) {
      var filterNodes = nodes
        .filter(function (node) {
          return node.tags && node.tags.indexOf("unit") !== -1
        })
        .map(function (node) {
          return {
            id: node.id,
            text: node.name || node.id
          }
        })

      var filterModel = new JSONModel({
        nodes: filterNodes
      })

      this.getView().setModel(filterModel, "filterModel")
    },

    onNodeFilterChange: function (event) {
      var selectedItems = event.getSource().getSelectedItems()
      var selectedIds = selectedItems.map(function (item) {
        return item.getKey()
      })

      if (!selectedIds.length) {
        this._chart.load(this._allNodes)
        return
      }

      var filteredNodes = this._getFilteredNodesWithParentsAndChildren(selectedIds)

      this._nodeMap = {}
      filteredNodes.forEach(function (node) {
        this._nodeMap[node.id] = node
      }.bind(this))

      this._chart.load(filteredNodes)
    },

    onClearNodeFilter: function () {
      var filter = this.byId("nodeFilter")

      filter.removeAllSelectedItems()

      this._nodeMap = {}
      this._allNodes.forEach(function (node) {
        this._nodeMap[node.id] = node
      }.bind(this))

      if (this._chart) {
        this._chart.load(this._allNodes)
      }
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

      nodes.forEach(function (node) {
        nodeMap[node.id] = node

        if (node.pid) {
          if (!childrenMap[node.pid]) {
            childrenMap[node.pid] = []
          }

          childrenMap[node.pid].push(node)
        }
      })

      nodes.forEach(function (leader) {
        var isLeader = leader.id && leader.id.indexOf("LP") === 0

        if (!isLeader) {
          return
        }

        var employees = childrenMap[leader.id] || []

        employees = employees.filter(function (child) {
          return child.tags &&
            (child.tags.indexOf("emp") !== -1 || child.tags.indexOf("emp_noskills") !== -1) &&
            child.id !== leader.id
        })

        if (!employees.length) {
          return
        }

        var teamNode = leader.pid ? nodeMap[leader.pid] : null

        if (!teamNode) {
          return
        }

        hiddenIds[leader.id] = true

        employees.forEach(function (employee) {
          hiddenIds[employee.id] = true
        })

        teamNode.member_count = employees.length + 1
        teamNode.leader_id = leader.id
        teamNode.leader_name = leader.name || ""
        teamNode.leader_title = leader.title || ""
        teamNode.leader_photo = leader.photo_url || ""
        teamNode.leader_skill_1 = leader.skill_1 || ""
        teamNode.leader_skill_2 = leader.skill_2 || ""
        teamNode.leader_skill_3 = leader.skill_3 || ""
        teamNode.leader_marker = "👑"
        teamNode.leader_skill_1_visible = leader.skill_1 ? "1" : "0"
        teamNode.leader_skill_2_visible = leader.skill_2 ? "1" : "0"
        teamNode.leader_skill_3_visible = leader.skill_3 ? "1" : "0"
        teamNode.tags = ["team_" + String(teamNode.member_count)]

        for (var clearIndex = 1; clearIndex <= 20; clearIndex++) {
          teamNode["emp_" + clearIndex + "_id"] = ""
          teamNode["emp_" + clearIndex + "_name"] = ""
          teamNode["emp_" + clearIndex + "_title"] = ""
          teamNode["emp_" + clearIndex + "_photo"] = ""
          teamNode["emp_" + clearIndex + "_skill_1"] = ""
          teamNode["emp_" + clearIndex + "_skill_2"] = ""
          teamNode["emp_" + clearIndex + "_skill_3"] = ""
          teamNode["emp_" + clearIndex + "_skill_1_visible"] = "0"
          teamNode["emp_" + clearIndex + "_skill_2_visible"] = "0"
          teamNode["emp_" + clearIndex + "_skill_3_visible"] = "0"
        }

        employees.forEach(function (employee, index) {
          var number = index + 1

          teamNode["emp_" + number + "_id"] = employee.id
          teamNode["emp_" + number + "_name"] = employee.name || ""
          teamNode["emp_" + number + "_title"] = employee.title || ""
          teamNode["emp_" + number + "_photo"] = employee.photo_url || ""
          teamNode["emp_" + number + "_skill_1"] = employee.skill_1 || ""
          teamNode["emp_" + number + "_skill_2"] = employee.skill_2 || ""
          teamNode["emp_" + number + "_skill_3"] = employee.skill_3 || ""
          teamNode["emp_" + number + "_skill_1_visible"] = employee.skill_1 ? "1" : "0"
          teamNode["emp_" + number + "_skill_2_visible"] = employee.skill_2 ? "1" : "0"
          teamNode["emp_" + number + "_skill_3_visible"] = employee.skill_3 ? "1" : "0"
        })

        teamNode.search_display = [
          teamNode.leader_name,
          teamNode.leader_title,
          teamNode.leader_skill_1,
          teamNode.leader_skill_2,
          teamNode.leader_skill_3
        ].concat(
          employees.map(function (employee) {
            return [
              employee.name,
              employee.title,
              employee.skill_1,
              employee.skill_2,
              employee.skill_3
            ].join(" ")
          })
        ).join(" | ")

        teamNode.search_name = employees.map(function (employee) {
          return employee.name || ""
        }).join(" | ")

        teamNode.search_title = employees.map(function (employee) {
          return employee.title || ""
        }).join(" | ")

        teamNode.search_skills = employees.map(function (employee) {
          return [
            employee.skill_1,
            employee.skill_2,
            employee.skill_3
          ].join(" ")
        }).join(" | ")
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

    _createNodeBinding: function () {
      var binding = {
        field_0: "name",
        field_1: "title",
        field_3: "skill_1",
        field_4: "skill_2",
        field_5: "skill_3",

        field_6: "leader_name",
        field_7: "leader_title",
        field_8: "leader_skill_1_visible",
        field_9: "leader_skill_2_visible",
        field_10: "leader_id",
        field_11: "leader_skill_3_visible",
        field_13: "leader_skill_1",
        field_14: "leader_skill_2",
        field_15: "leader_skill_3",

        img_0: "photo_url",
        img_1: "leader_photo"
      }

      for (var index = 1; index <= 20; index++) {
        var base = 20 + (index - 1) * 9

        binding["field_" + base] = "emp_" + index + "_name"
        binding["field_" + (base + 1)] = "emp_" + index + "_title"
        binding["field_" + (base + 2)] = "emp_" + index + "_skill_1_visible"
        binding["field_" + (base + 3)] = "emp_" + index + "_skill_2_visible"
        binding["field_" + (base + 4)] = "emp_" + index + "_skill_3_visible"
        binding["field_" + (base + 5)] = "emp_" + index + "_id"
        binding["field_" + (base + 6)] = "emp_" + index + "_skill_1"
        binding["field_" + (base + 7)] = "emp_" + index + "_skill_2"
        binding["field_" + (base + 8)] = "emp_" + index + "_skill_3"
        binding["img_" + (index + 1)] = "emp_" + index + "_photo"
      }

      return binding
    },

    _createChartTags: function (nodes) {
      var tags = {
        unit: { template: "ula_custom_unit" },
        pos: { template: "ula_custom_pos" },
        emp: { template: "ula_custom_emp" },
        emp_noskills: { template: "ula_custom_emp_noskills" }
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

    _openEmployeePopupFromNode: function (node) {
      if (!node) {
        return
      }

      this._chart.editUI.show(node.id)

      setTimeout(function () {
        var form = document.querySelector(".boc-edit-form")

        if (!form) {
          return
        }

        var fieldsContainer = form.querySelector(".boc-edit-form-fields")

        if (!fieldsContainer) {
          return
        }

        fieldsContainer.innerHTML = ""

        var wrapper = document.createElement("div")
        wrapper.className = "hs-orgchart-profile"

        var nameEl = document.createElement("div")
        nameEl.className = "hs-orgchart-profile-name"
        nameEl.textContent = node.name || ""

        var roleEl = document.createElement("div")
        roleEl.className = "hs-orgchart-profile-role"
        roleEl.textContent = node.title || ""

        wrapper.appendChild(nameEl)
        wrapper.appendChild(roleEl)
        fieldsContainer.appendChild(wrapper)
      }, 50)
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

      if (node.teams_url) {
        var actionsWrap = document.createElement("div")
        actionsWrap.className = "hs-orgchart-actions"

        actionsWrap.appendChild(
          createActionButton("In Teams öffnen", node.teams_url, "hs-orgchart-action-button-primary")
        )

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


    _createSearchFields: function () {
      var searchFields = [
        "name",
        "title",
        "skill_1",
        "skill_2",
        "skill_3",
        "leader_name",
        "leader_title",
        "leader_skill_1",
        "leader_skill_2",
        "leader_skill_3",
        "search_display",
        "search_name",
        "search_title",
        "search_skills"
      ]

      for (var index = 1; index <= 20; index++) {
        searchFields.push("emp_" + index + "_name")
        searchFields.push("emp_" + index + "_title")
        searchFields.push("emp_" + index + "_skill_1")
        searchFields.push("emp_" + index + "_skill_2")
        searchFields.push("emp_" + index + "_skill_3")
      }

      return searchFields
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

  })
})
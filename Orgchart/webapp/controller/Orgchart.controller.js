sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/Dialog",
  "sap/m/Tree",
  "sap/m/StandardTreeItem",
  "sap/m/Button",
  "sap/m/VBox",
  "sap/m/Bar",
  "sap/m/Title",
  "sap/m/SearchField"
], function (Controller, JSONModel, Dialog, Tree, StandardTreeItem, Button, VBox, Bar, Title, SearchField) {
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
      this._visibleNodeMap = {}
      this._areaCardByHiddenId = {}
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
      this._visibleNodeMap = {}
      var chartNodes = this._insertTeamContainers(originalNodes)
      chartNodes = this._insertAreaCardContainers(chartNodes)


      this._nodeMap = {}

      chartNodes.forEach(function (node) {
        this._nodeMap[node.id] = node
      }.bind(this))

      this._allNodes = chartNodes
      this.initChart(chartNodes)
    },

    initChart: function (nodes, scaleInitial) {
      this._prepareTeamTemplates(nodes)
      this._prepareAreaCardTemplates(nodes)

      var nodeBinding = this._createNodeBinding()
      var chartTags = this._createChartTags(nodes)

      this._chart = new OrgChart(document.getElementById("tree"), {
        layout: OrgChart.layout.tree,
        template: "ula_custom_emp",
        nodeTreeMenu: false,
        enableSearch: false,
        mouseScrool: OrgChart.action.zoom,
        nodeMouseClick: OrgChart.action.none,
        scaleInitial: scaleInitial || 0.35,
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
    },

    _prepareNodeFilter: function (nodes) {
      var allNodeMap = {}
      var orgNodeMap = {}
      var childrenMap = {}
      var rootNodes = []

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
          selectionChange: function (event) {
            this.onNodeTreeSelectionChange(event)
          }.bind(this),
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
          width: "420px",
          placeholder: "Organisationseinheit suchen",
          liveChange: function (event) {
            this.onNodeTreeSearch(event)
          }.bind(this)
        }).addStyleClass("sapUiSmallMarginBottom")

        this._nodeFilterDialog = new Dialog(this.createId("nodeFilterDialog"), {
          contentWidth: "560px",
          contentHeight: "620px",
          resizable: true,
          draggable: true,

          customHeader: new Bar({
            contentMiddle: [
              new Title({
                text: "Organisationseinheiten auswählen"
              })
            ],
            contentRight: [
              new Button({
                icon: "sap-icon://decline",
                type: "Transparent",
                tooltip: "Schließen",
                press: function () {
                  this._nodeFilterDialog.close()
                }.bind(this)
              })
            ]
          }),

          content: [
            new VBox({
              width: "100%",
              items: [
                searchField,
                tree
              ]
            }).addStyleClass("sapUiSmallMargin")
          ],

          buttons: [
            new Button({
              text: "Übernehmen",
              type: "Emphasized",
              press: function () {
                this.onApplyNodeTreeFilter()
              }.bind(this)
            })
          ]
        }).addStyleClass("hsNodeFilterDialog")

        this.getView().addDependent(this._nodeFilterDialog)
      }

      this._syncNodeTreeSelection()
      // this._updateDeselectAllNodeButtonState()
      var searchField = this.byId("nodeFilterTreeSearch")
      var treeModel = this.getView().getModel("treeFilterModel")

      if (searchField) {
        searchField.setValue("")
      }

      if (treeModel && this._nodeFilterOriginalNodes) {
        treeModel.setProperty("/nodes", this._cloneNodeFilterTree(this._nodeFilterOriginalNodes))
      }

      var tree = this.byId("nodeFilterTree")

      if (tree) {
        tree.expandToLevel(1)
      }
      this._nodeFilterDialog.open()
    },

    // onSelectAllNodeTreeItems: function () {
    //   var tree = this.byId("nodeFilterTree")

    //   if (!tree) {
    //     return
    //   }

    //   tree.getItems().forEach(function (item) {
    //     tree.setSelectedItem(item, true)
    //   })

    //   this._updateDeselectAllNodeButtonState()
    // },

    // onDeselectAllNodeTreeItems: function () {
    //   var tree = this.byId("nodeFilterTree")

    //   if (!tree) {
    //     return
    //   }

    //   tree.removeSelections(true)
    //   this._updateDeselectAllNodeButtonState()
    // },

    // _updateDeselectAllNodeButtonState: function () {
    //   var tree = this.byId("nodeFilterTree")
    //   var button = this.byId("deselectAllNodeButton")

    //   if (!tree || !button) {
    //     return
    //   }

    //   button.setEnabled(tree.getSelectedItems().length > 0)
    // },


    onNodeTreeSelectionChange: function (event) {
      var tree = this.byId("nodeFilterTree")
      var changedItem = event.getParameter("listItem")
      var selected = event.getParameter("selected")
      var context
      var object
      var ids = []

      if (!tree || !changedItem) {
        return
      }

      context = changedItem.getBindingContext("treeFilterModel")
      object = context ? context.getObject() : null

      if (!object) {
        return
      }

      this._collectNodeFilterChildIds(object, ids)

      tree.getItems().forEach(function (item) {
        var itemContext = item.getBindingContext("treeFilterModel")
        var itemObject = itemContext ? itemContext.getObject() : null

        if (itemObject && ids.indexOf(itemObject.id) !== -1) {
          tree.setSelectedItem(item, selected)
        }
      })
    },

    _collectNodeFilterChildIds: function (node, ids) {
      if (!node || !node.id) {
        return
      }

      ids.push(node.id)

        ; (node.children || []).forEach(function (child) {
          this._collectNodeFilterChildIds(child, ids)
        }.bind(this))
    },

    onNodeTreeSearch: function (event) {
      var query = String(event.getParameter("newValue") || "").trim()
      var tree = this.byId("nodeFilterTree")
      var treeModel = this.getView().getModel("treeFilterModel")
      var originalNodes

      if (!tree || !treeModel) {
        return
      }

      if (!this._nodeFilterOriginalNodes) {
        this._nodeFilterOriginalNodes = this._cloneNodeFilterTree(treeModel.getProperty("/nodes") || [])
      }

      originalNodes = this._cloneNodeFilterTree(this._nodeFilterOriginalNodes)

      if (!query) {
        treeModel.setProperty("/nodes", originalNodes)
        tree.expandToLevel(1)
        this._syncNodeTreeSelection()
        // this._updateDeselectAllNodeButtonState()
        return
      }

      treeModel.setProperty("/nodes", this._filterNodeTreeBySearch(originalNodes, query))
      tree.expandToLevel(10)
      this._syncNodeTreeSelection()
      // this._updateDeselectAllNodeButtonState()
    },

    _filterNodeTreeBySearch: function (nodes, query) {
      var normalizedQuery = String(query || "").toLowerCase()

      function filterNode(node) {
        var nodeText = String(node.text || "").toLowerCase()
        var nodeMatches = nodeText.indexOf(normalizedQuery) !== -1
        var filteredChildren = []

          ; (node.children || []).forEach(function (child) {
            var filteredChild = filterNode(child)

            if (filteredChild) {
              filteredChildren.push(filteredChild)
            }
          })

        if (nodeMatches) {
          return node
        }

        if (filteredChildren.length) {
          node.children = filteredChildren
          return node
        }

        return null
      }

      return nodes.map(filterNode).filter(function (node) {
        return !!node
      })
    },

    _cloneNodeFilterTree: function (nodes) {
      return JSON.parse(JSON.stringify(nodes || []))
    },

    // _sortNodeFilterTreeBySearch: function (nodes, query) {
    //   var normalizedQuery = String(query || "").toLowerCase()

    //   function nodeMatches(node) {
    //     return String(node.text || "").toLowerCase().indexOf(normalizedQuery) !== -1
    //   }

    //   function prepareNode(node) {
    //     var children = node.children || []
    //     var preparedChildren = children.map(prepareNode)

    //     preparedChildren.sort(function (firstNode, secondNode) {
    //       if (firstNode._searchRank !== secondNode._searchRank) {
    //         return firstNode._searchRank - secondNode._searchRank
    //       }

    //       return String(firstNode.text || "").localeCompare(String(secondNode.text || ""))
    //     })

    //     node.children = preparedChildren

    //     if (nodeMatches(node)) {
    //       node._searchRank = 0
    //     } else if (preparedChildren.some(function (child) {
    //       return child._searchRank < 2
    //     })) {
    //       node._searchRank = 1
    //     } else {
    //       node._searchRank = 2
    //     }

    //     return node
    //   }

    //   nodes = nodes.map(prepareNode)

    //   nodes.sort(function (firstNode, secondNode) {
    //     if (firstNode._searchRank !== secondNode._searchRank) {
    //       return firstNode._searchRank - secondNode._searchRank
    //     }

    //     return String(firstNode.text || "").localeCompare(String(secondNode.text || ""))
    //   })

    //   function cleanNode(node) {
    //     delete node._searchRank

    //       ; (node.children || []).forEach(cleanNode)
    //   }

    //   nodes.forEach(cleanNode)

    //   return nodes
    // },

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

    _recreateChart: function (nodes, scaleInitial) {
      var treeElement = document.getElementById("tree")

      if (!treeElement) {
        return
      }

      if (this._chart && this._chart.destroy) {
        this._chart.destroy()
      }

      treeElement.innerHTML = ""

      this.initChart(nodes, scaleInitial)
    },

    _applyNodeFilterByIds: function (selectedIds) {
      if (!selectedIds || !selectedIds.length) {
        this._nodeMap = {}

        this._allNodes.forEach(function (node) {
          this._nodeMap[node.id] = node
        }.bind(this))

        this._prepareAreaCardTemplates(this._allNodes)
        this._recreateChart(this._allNodes, 0.35)

        return
      }

      var filteredNodes = this._buildFocusedFilterNodes(selectedIds)

      this._nodeMap = {}

      filteredNodes.forEach(function (node) {
        this._nodeMap[node.id] = node
      }.bind(this))

      this._prepareAreaCardTemplates(filteredNodes)
      this._recreateChart(filteredNodes, 0.5)
    },

    onApplyFilters: function () {
      var treeModel = this.getView().getModel("treeFilterModel")
      var selectedIds = treeModel ? treeModel.getProperty("/selectedIds") || [] : []

      this._applyNodeFilterByIds(selectedIds)
    },

    onClearNodeFilter: function () {
      // var filter = this.byId("nodeFilter")
      var searchModel = this.getView().getModel("searchModel")
      var treeModel = this.getView().getModel("treeFilterModel")
      var employeeSearch = this.byId("employeeSearch")
      var tree = this.byId("nodeFilterTree")

      // if (filter) {
      //   filter.removeAllSelectedItems()
      //   filter.setSelectedKeys([])
      // }

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

    _buildFocusedFilterNodes: function (selectedIds) {
      var nodeMap = {}
      var resultMap = {}
      var areaGroups = {}
      var normalSelectedIds = []

      this._allNodes.forEach(function (node) {
        nodeMap[node.id] = node
      })

      selectedIds.forEach(function (selectedId) {
        var areaId = this._areaCardByHiddenId[selectedId]

        if (areaId && nodeMap[areaId]) {
          if (!areaGroups[areaId]) {
            areaGroups[areaId] = []
          }

          if (areaGroups[areaId].indexOf(selectedId) === -1) {
            areaGroups[areaId].push(selectedId)
          }

          return
        }

        if (nodeMap[selectedId] && normalSelectedIds.indexOf(selectedId) === -1) {
          normalSelectedIds.push(selectedId)
        }
      }.bind(this))

      Object.keys(areaGroups).forEach(function (areaId) {
        var areaNode = nodeMap[areaId]

        if (!areaNode) {
          return
        }

        var focusedAreaNode = this._buildFocusedAreaNodeForSelectedIds(areaGroups[areaId], areaNode)

        focusedAreaNode.pid = ""
        resultMap[focusedAreaNode.id] = focusedAreaNode
      }.bind(this))

      if (normalSelectedIds.length) {
        var childrenMap = {}

        this._allNodes.forEach(function (node) {
          if (!node.pid) {
            return
          }

          if (!childrenMap[node.pid]) {
            childrenMap[node.pid] = []
          }

          childrenMap[node.pid].push(node)
        })

        function addChildren(node, isRoot) {
          var clonedNode = Object.assign({}, node)

          if (isRoot) {
            clonedNode.pid = ""
          }

          resultMap[node.id] = clonedNode

            ; (childrenMap[node.id] || []).forEach(function (child) {
              addChildren(child, false)
            })
        }

        normalSelectedIds.forEach(function (selectedId) {
          var selectedNode = nodeMap[selectedId]

          if (!selectedNode) {
            return
          }

          addChildren(selectedNode, true)
        })
      }

      return Object.keys(resultMap).map(function (nodeId) {
        return resultMap[nodeId]
      })
    },

    _buildFocusedAreaNodeForSelectedIds: function (selectedIds, areaNode) {
      var clone = Object.assign({}, areaNode)
      var layout = JSON.parse(areaNode.area_layout_json || '{"roots":[],"cards":[]}')
      var slotMap = JSON.parse(areaNode.area_slot_map_json || '{}')
      var areaRootSelected = false
      var selectedTopSlots = {}
      var selectedChildSlotsByParent = {}
      var hasConcreteSelection = false
      var keepSlots = {}
      var newRoots = []

      selectedIds.forEach(function (selectedId) {
        var slotInfo = slotMap[selectedId]

        if (!slotInfo) {
          return
        }

        if (slotInfo.areaRoot) {
          areaRootSelected = true
          return
        }

        hasConcreteSelection = true

        if (!slotInfo.parentSlot) {
          selectedTopSlots[slotInfo.slot] = true
          return
        }

        if (!selectedChildSlotsByParent[slotInfo.parentSlot]) {
          selectedChildSlotsByParent[slotInfo.parentSlot] = {}
        }

        selectedChildSlotsByParent[slotInfo.parentSlot][slotInfo.slot] = true
      })

      layout.roots.forEach(function (root) {
        var rootIsSelected = !!selectedTopSlots[root.slot]
        var selectedChildren = selectedChildSlotsByParent[root.slot]
        var childrenToKeep = []

        if (areaRootSelected && !hasConcreteSelection) {
          keepSlots[root.slot] = true

            ; (root.children || []).forEach(function (childSlot) {
              keepSlots[childSlot] = true
              childrenToKeep.push(childSlot)
            })

          newRoots.push({
            slot: root.slot,
            children: childrenToKeep
          })

          return
        }

        if (areaRootSelected && hasConcreteSelection) {
          if (rootIsSelected || selectedChildren) {
            keepSlots[root.slot] = true

            if (rootIsSelected && !selectedChildren) {
              ; (root.children || []).forEach(function (childSlot) {
                keepSlots[childSlot] = true
                childrenToKeep.push(childSlot)
              })
            }

            if (selectedChildren) {
              ; (root.children || []).forEach(function (childSlot) {
                if (!selectedChildren[childSlot]) {
                  return
                }

                keepSlots[childSlot] = true
                childrenToKeep.push(childSlot)
              })
            }

            newRoots.push({
              slot: root.slot,
              children: childrenToKeep
            })
          }

          return
        }

        if (rootIsSelected) {
          keepSlots[root.slot] = true

          if (selectedChildren) {
            ; (root.children || []).forEach(function (childSlot) {
              if (!selectedChildren[childSlot]) {
                return
              }

              keepSlots[childSlot] = true
              childrenToKeep.push(childSlot)
            })
          } else {
            ; (root.children || []).forEach(function (childSlot) {
              keepSlots[childSlot] = true
              childrenToKeep.push(childSlot)
            })
          }

          newRoots.push({
            slot: root.slot,
            children: childrenToKeep
          })

          return
        }

        if (selectedChildren) {
          ; (root.children || []).forEach(function (childSlot) {
            if (!selectedChildren[childSlot]) {
              return
            }

            keepSlots[childSlot] = true

            newRoots.push({
              slot: childSlot,
              children: []
            })
          })
        }
      })

      if (!newRoots.length) {
        clone.pid = ""
        return clone
      }

      layout.roots = newRoots
      layout.cards = (layout.cards || []).filter(function (card) {
        return !!keepSlots[card.slot]
      })

      layout.hideOuterFrame = true

      if (areaRootSelected) {
        layout.hideAreaTitle = false
        layout.hideHeaderLeader = false
        layout.hideRootConnector = false
      } else {
        layout.hideAreaTitle = true
        layout.hideHeaderLeader = true
        layout.hideRootConnector = true

        clone.leader_id = ""
        clone.leader_name = ""
        clone.leader_title = ""
        clone.leader_photo = ""
        clone.leader_teams_url = ""
        clone.leader_outlook_url = ""
      }

      clone.area_layout_json = JSON.stringify(layout)
      clone.pid = ""

      var cardWidth = 470
      var cardGap = 52
      var subtreeGap = 64
      var outerPadding = 52
      var areaHeaderHeight = areaRootSelected ? 280 : 24
      var cardHeaderHeight = 82
      var leaderHeight = 142
      var employeeHeight = 126
      var cardBottomPadding = 24
      var rowGap = 70
      var cardMetaMap = {}

      layout.cards.forEach(function (card) {
        cardMetaMap[card.slot] = card
      })

      function getCardHeight(slot) {
        var card = cardMetaMap[slot] || { employeeCount: 0 }
        return cardHeaderHeight + (card.hideLeader ? 0 : leaderHeight) + (card.employeeCount || 0) * employeeHeight + cardBottomPadding
      }

      var topRowMaxHeight = 0
      var bottomRowMaxHeight = 0
      var hasBottomRow = false
      var contentWidth = 0

      layout.roots.forEach(function (root, index) {
        var topHeight = getCardHeight(root.slot)

        if (topHeight > topRowMaxHeight) {
          topRowMaxHeight = topHeight
        }

        var childCount = (root.children || []).length
        var childWidth = childCount ? childCount * cardWidth + (childCount - 1) * cardGap : 0
        var subtreeWidth = Math.max(cardWidth, childWidth)

        if (index > 0) {
          contentWidth += subtreeGap
        }

        contentWidth += subtreeWidth

          ; (root.children || []).forEach(function (childSlot) {
            hasBottomRow = true

            var childHeight = getCardHeight(childSlot)

            if (childHeight > bottomRowMaxHeight) {
              bottomRowMaxHeight = childHeight
            }
          })
      })

      clone.area_width = Math.max(520, outerPadding * 2 + contentWidth)
      clone.area_height = areaHeaderHeight + topRowMaxHeight + (hasBottomRow ? rowGap + bottomRowMaxHeight : 0) + outerPadding

      return clone
    },

    _buildTeamsUrl: function (email) {
      if (!email) {
        return ""
      }

      return "msteams://teams.microsoft.com/l/chat/0/0?users=" + encodeURIComponent(email)
    },


    _getDefaultAvatarImage: function () {
      var svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">' +
        '<circle cx="60" cy="60" r="60" fill="#edf4ff"/>' +
        '<circle cx="60" cy="44" r="22" fill="#7fa7d6"/>' +
        '<path d="M24 104c5-26 22-40 36-40s31 14 36 40" fill="#7fa7d6"/>' +
        '</svg>'

      return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg)
    },

    _normalizePhoto: function (photoValue) {
      var value = String(photoValue || "").trim()

      if (!value) {
        return this._getDefaultAvatarImage()
      }

      if (
        value.indexOf("http://") === 0 ||
        value.indexOf("https://") === 0 ||
        value.indexOf("data:image") === 0
      ) {
        return value
      }

      return "data:image/jpeg;base64," + value
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

          nodes.push(managementNode)
          nodeMap[managementNode.id] = managementNode
        }
      }

      nodes.forEach(function (teamNode) {
        if (teamNode.node_type !== "O") {
          return
        }

        if (rootIds[teamNode.id]) {
          teamNode.tags = ["root_unit"]
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

    _insertAreaCardContainers: function (nodes) {
      var that = this
      var nodeMap = {}
      var childrenMap = {}
      var hiddenIds = {}
      var result = []
      var rootId = ""
      var managementNodeId = ""
      var areaIndex = 1

      this._areaCardByHiddenId = {}

      nodes.forEach(function (node) {
        if (!node || !node.id) {
          return
        }

        nodeMap[node.id] = node

        if (node.id === "ROOT_MANAGEMENT") {
          managementNodeId = node.id
        }

        if (node.pid) {
          if (!childrenMap[node.pid]) {
            childrenMap[node.pid] = []
          }

          childrenMap[node.pid].push(node)
        }
      })

      nodes.forEach(function (node) {
        if (node.node_type === "O" && (!node.pid || !nodeMap[node.pid])) {
          rootId = node.id
        }
      })

      if (!rootId) {
        return nodes
      }

      var sourceParentId = rootId
      var targetParentId = managementNodeId || rootId
      var areaRootNodes = []

      var rootOrgChildren = (childrenMap[sourceParentId] || []).filter(function (node) {
        return node && node.id && node.node_type === "O" && node.id !== "ROOT_MANAGEMENT"
      })

      rootOrgChildren.forEach(function (rootChild) {
        areaRootNodes.push(rootChild)
      })

      function getDirectOrgChildren(nodeId) {
        return (childrenMap[nodeId] || []).filter(function (child) {
          return child && child.node_type === "O" && child.id !== "ROOT_MANAGEMENT"
        })
      }

      function getEmployeeCount(card) {
        var count = 0

        for (var index = 1; index <= 8; index++) {
          if (card["emp_" + index + "_id"] || card["emp_" + index + "_name"]) {
            count++
          }
        }

        return count
      }

      function fillAreaCardData(target, slot, card) {
        var prefix = "area_card_" + slot + "_"

        target[prefix + "name"] = card.name || ""
        target[prefix + "leader_id"] = card.leader_id || ""
        target[prefix + "leader_name"] = card.leader_name || ""
        target[prefix + "leader_title"] = card.leader_title || ""
        target[prefix + "leader_photo"] = card.leader_photo || ""
        target[prefix + "leader_teams_url"] = card.leader_teams_url || ""
        target[prefix + "leader_outlook_url"] = card.leader_outlook_url || ""

        for (var employeeIndex = 1; employeeIndex <= 8; employeeIndex++) {
          target[prefix + "emp_" + employeeIndex + "_id"] = card["emp_" + employeeIndex + "_id"] || ""
          target[prefix + "emp_" + employeeIndex + "_name"] = card["emp_" + employeeIndex + "_name"] || ""
          target[prefix + "emp_" + employeeIndex + "_title"] = card["emp_" + employeeIndex + "_title"] || ""
          target[prefix + "emp_" + employeeIndex + "_photo"] = card["emp_" + employeeIndex + "_photo"] || ""
          target[prefix + "emp_" + employeeIndex + "_teams_url"] = card["emp_" + employeeIndex + "_teams_url"] || ""
          target[prefix + "emp_" + employeeIndex + "_outlook_url"] = card["emp_" + employeeIndex + "_outlook_url"] || ""
        }
      }

      function markHiddenRecursive(nodeId) {
        hiddenIds[nodeId] = true

          ; (childrenMap[nodeId] || []).forEach(function (child) {
            markHiddenRecursive(child.id)
          })
      }

      areaRootNodes.forEach(function (areaRootNode) {
        var wrapperId = "AREA_WRAPPER_" + areaRootNode.id
        var areaId = "AREA_CARD_" + areaRootNode.id
        var topCards = getDirectOrgChildren(areaRootNode.id)
        var slotMap = {}

        slotMap[areaRootNode.id] = {
          slot: 0,
          parentSlot: 0,
          areaRoot: true,
          name: areaRootNode.name || "",
          title: areaRootNode.title || ""
        }
        var layout = {
          roots: [],
          cards: []
        }

        if (!topCards.length) {
          topCards = [areaRootNode]
        }

        var nextSlot = 1
        var cardWidth = 470
        var cardGap = 52
        var subtreeGap = 64
        var outerPadding = 52
        var areaHeaderHeight = 280
        var cardHeaderHeight = 82
        var leaderHeight = 142
        var employeeHeight = 126
        var cardBottomPadding = 24
        var rowGap = 70
        var topDefs = []

        function getCardHeightByCount(employeeCount) {
          return cardHeaderHeight + leaderHeight + employeeCount * employeeHeight + cardBottomPadding
        }

        topCards.forEach(function (topCard) {
          var topSlot = nextSlot++
          var childCards = getDirectOrgChildren(topCard.id)
          var childSlots = []

          slotMap[topCard.id] = {
            slot: topSlot,
            parentSlot: 0,
            name: topCard.name || "",
            title: topCard.title || ""
          }

          childCards.forEach(function (childCard) {
            var childSlot = nextSlot++
            childSlots.push(childSlot)

            slotMap[childCard.id] = {
              slot: childSlot,
              parentSlot: topSlot,
              name: childCard.name || "",
              title: childCard.title || ""
            }
          })

          topDefs.push({
            node: topCard,
            slot: topSlot,
            children: childCards,
            childSlots: childSlots
          })

          layout.roots.push({
            slot: topSlot,
            children: childSlots
          })

          layout.cards.push({
            slot: topSlot,
            employeeCount: getEmployeeCount(topCard)
          })

          childCards.forEach(function (childCard, childIndex) {
            layout.cards.push({
              slot: childSlots[childIndex],
              employeeCount: getEmployeeCount(childCard)
            })
          })
        })

        var wrapperNode = {
          id: wrapperId,
          pid: targetParentId,
          node_type: "A",
          name: "",
          title: "",
          photo_url: "",
          tags: ["anchor"]
        }

        var areaNode = {
          id: areaId,
          pid: wrapperId,
          node_type: "F",
          name: areaRootNode.name || "",
          title: areaRootNode.title || "",
          leader_id: areaRootNode.leader_id || "",
          leader_name: areaRootNode.leader_name || "",
          leader_title: areaRootNode.leader_title || "",
          leader_photo: areaRootNode.leader_photo || "",
          leader_teams_url: areaRootNode.leader_teams_url || "",
          leader_outlook_url: areaRootNode.leader_outlook_url || "",
          area_index: areaIndex,
          area_card_count: nextSlot - 1,
          area_slot_map_json: JSON.stringify(slotMap),
          tags: ["area_card_" + String(areaIndex)]
        }

        topDefs.forEach(function (topDef) {
          fillAreaCardData(areaNode, topDef.slot, topDef.node)

          topDef.children.forEach(function (childCard, childIndex) {
            fillAreaCardData(areaNode, topDef.childSlots[childIndex], childCard)
          })
        })

        var topRowMaxHeight = 0
        var bottomRowMaxHeight = 0
        var hasBottomRow = false
        var contentWidth = 0

        topDefs.forEach(function (topDef, topIndex) {
          var topEmployeeCount = getEmployeeCount(topDef.node)
          var topCardHeight = getCardHeightByCount(topEmployeeCount)

          if (topCardHeight > topRowMaxHeight) {
            topRowMaxHeight = topCardHeight
          }

          var childWidth = topDef.children.length
            ? topDef.children.length * cardWidth + (topDef.children.length - 1) * cardGap
            : 0

          var subtreeWidth = Math.max(cardWidth, childWidth)

          if (topIndex > 0) {
            contentWidth += subtreeGap
          }

          contentWidth += subtreeWidth

          topDef.children.forEach(function (childCard) {
            hasBottomRow = true

            var childEmployeeCount = getEmployeeCount(childCard)
            var childCardHeight = getCardHeightByCount(childEmployeeCount)

            if (childCardHeight > bottomRowMaxHeight) {
              bottomRowMaxHeight = childCardHeight
            }
          })
        })

        areaNode.area_layout_json = JSON.stringify(layout)
        areaNode.area_width = Math.max(520, outerPadding * 2 + contentWidth)
        areaNode.area_height = areaHeaderHeight + topRowMaxHeight + (hasBottomRow ? rowGap + bottomRowMaxHeight : 0) + outerPadding

        function mapHiddenNodesToArea(nodeId) {
          that._visibleNodeMap[nodeId] = areaId
          that._areaCardByHiddenId[nodeId] = areaId

            ; (childrenMap[nodeId] || []).forEach(function (child) {
              mapHiddenNodesToArea(child.id)
            })
        }

        mapHiddenNodesToArea(areaRootNode.id)
        markHiddenRecursive(areaRootNode.id)

        result.push(wrapperNode)
        result.push(areaNode)

        areaIndex++
      })

      nodes.forEach(function (node) {
        if (hiddenIds[node.id]) {
          return
        }

        result.push(node)
      })

      result.sort(function (firstNode, secondNode) {
        if (firstNode.id === rootId) {
          return -1
        }

        if (secondNode.id === rootId) {
          return 1
        }

        if (firstNode.id === managementNodeId) {
          return -1
        }

        if (secondNode.id === managementNodeId) {
          return 1
        }

        return 0
      })

      return result
    },

    _prepareAreaCardTemplates: function (nodes) {
      if (!window.HsOrgChartTemplates || !window.HsOrgChartTemplates.createAreaCardTemplate) {
        return
      }

      nodes.forEach(function (node) {
        if (!node || !node.area_index) {
          return
        }

        window.HsOrgChartTemplates.createAreaCardTemplate(
          node.area_index,
          node.area_layout_json,
          node.area_width,
          node.area_height
        )
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

      for (var areaCardIndex = 1; areaCardIndex <= 12; areaCardIndex++) {
        var areaBase = 200 + (areaCardIndex - 1) * 50
        var areaImageBase = 100 + (areaCardIndex - 1) * 10

        binding["field_" + areaBase] = "area_card_" + areaCardIndex + "_name"
        binding["field_" + (areaBase + 1)] = "area_card_" + areaCardIndex + "_leader_name"
        binding["field_" + (areaBase + 2)] = "area_card_" + areaCardIndex + "_leader_title"
        binding["field_" + (areaBase + 3)] = "area_card_" + areaCardIndex + "_leader_teams_url"
        binding["field_" + (areaBase + 4)] = "area_card_" + areaCardIndex + "_leader_outlook_url"
        binding["field_" + (areaBase + 5)] = "area_card_" + areaCardIndex + "_leader_id"

        binding["img_" + areaImageBase] = "area_card_" + areaCardIndex + "_leader_photo"

        for (var areaMemberIndex = 1; areaMemberIndex <= 8; areaMemberIndex++) {
          var memberBase = areaBase + 10 + (areaMemberIndex - 1) * 5

          binding["field_" + memberBase] = "area_card_" + areaCardIndex + "_emp_" + areaMemberIndex + "_name"
          binding["field_" + (memberBase + 1)] = "area_card_" + areaCardIndex + "_emp_" + areaMemberIndex + "_title"
          binding["field_" + (memberBase + 2)] = "area_card_" + areaCardIndex + "_emp_" + areaMemberIndex + "_teams_url"
          binding["field_" + (memberBase + 3)] = "area_card_" + areaCardIndex + "_emp_" + areaMemberIndex + "_outlook_url"
          binding["field_" + (memberBase + 4)] = "area_card_" + areaCardIndex + "_emp_" + areaMemberIndex + "_id"

          binding["img_" + (areaImageBase + areaMemberIndex)] = "area_card_" + areaCardIndex + "_emp_" + areaMemberIndex + "_photo"
        }
      }

      return binding
    },

    _createChartTags: function (nodes) {
      var tags = {
        unit: { template: "ula_custom_unit" },
        root_unit: { template: "ula_custom_root_unit" },
        pos: { template: "ula_custom_pos" },
        emp: { template: "ula_custom_emp" },
        emp_noskills: { template: "ula_custom_emp_noskills" },
        empty_team: { template: "ula_custom_empty_team" },
        anchor: { template: "ula_custom_anchor" }
      }

      nodes.forEach(function (node) {
        if (node.tags) {
          node.tags.forEach(function (tag) {
            if (tag.indexOf("area_card_") === 0) {
              tags[tag] = {
                template: "ula_custom_" + tag
              }
            }
          })
        }

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

        var linkElement = target && target.closest ? target.closest(".hs-card-action-link") : null

        if (linkElement) {
          var href =
            linkElement.getAttribute("href") ||
            linkElement.getAttribute("xlink:href") ||
            linkElement.getAttributeNS("http://www.w3.org/1999/xlink", "href") ||
            ""

          if (href) {
            if (href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) {
              window.location.href = href
            } else {
              window.open(href, "_blank", "noopener,noreferrer")
            }
          }

          event.preventDefault()
          event.stopPropagation()
          return false
        }

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
        return false
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

      var existingCloseButton = form.querySelector(".hs-orgchart-popup-close")

      if (!existingCloseButton) {
        var closeButton = document.createElement("button")
        closeButton.type = "button"
        closeButton.className = "hs-orgchart-popup-close"
        closeButton.innerHTML = "×"
        closeButton.setAttribute("aria-label", "Schließen")

        closeButton.onclick = function (event) {
          event.preventDefault()
          event.stopPropagation()

          if (this._chart && this._chart.editUI && this._chart.editUI.hide) {
            this._chart.editUI.hide()
            return
          }

          form.style.display = "none"
        }.bind(this)

        form.appendChild(closeButton)
      }

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

    // _centerAndZoomNode: function (nodeId) {
    //   if (!this._chart || !nodeId) {
    //     return
    //   }

    //   setTimeout(function () {
    //     if (this._chart.center) {
    //       this._chart.center(nodeId)
    //     }
    //   }.bind(this), 250)
    // },

    onEmployeeSearchLiveChange: function (event) {
      var value = event.getParameter("value") || ""
      var searchModel = this.getView().getModel("searchModel")

      if (!searchModel) {
        return
      }

      searchModel.setProperty("/query", value)

      if (!String(value).trim()) {
        searchModel.setProperty("/results", [])
        searchModel.setProperty("/visible", false)
        return
      }

      this._updateEmployeeSearchResults(value)
    },

    _updateEmployeeSearchResults: function (query) {
      var normalizedQuery = String(query || "").toLowerCase().trim()
      var results = []
      var seen = {}
      var searchModel = this.getView().getModel("searchModel")

      if (!searchModel) {
        return
      }

      if (!normalizedQuery) {
        searchModel.setProperty("/results", [])
        searchModel.setProperty("/visible", false)
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

      searchModel.setProperty("/results", results)
      searchModel.setProperty("/visible", results.length > 0)
    },

    onEmployeeSearch: function (event) {
      var query = event.getParameter("suggestValue") || event.getParameter("newValue") || event.getParameter("query") || ""
      var searchModel = this.getView().getModel("searchModel")

      if (searchModel) {
        searchModel.setProperty("/query", query)
      }

      this._updateEmployeeSearchResults(query)
    },

    onEmployeeSuggestionSelected: function (event) {
      var item = event.getParameter("selectedItem")
      var employeeSearch = this.byId("employeeSearch")
      var searchModel = this.getView().getModel("searchModel")

      if (!item) {
        return
      }

      var employeeNode = this._profileNodeMap[item.getKey()]

      if (!employeeNode) {
        return
      }

      var selectedEmployeeName = employeeNode.name || ""

      if (searchModel) {
        searchModel.setProperty("/query", selectedEmployeeName)
        searchModel.setProperty("/results", [])
        searchModel.setProperty("/visible", false)
      }

      if (employeeSearch) {
        employeeSearch.setValue(selectedEmployeeName)
      }

      setTimeout(function () {
        if (searchModel) {
          searchModel.setProperty("/query", selectedEmployeeName)
          searchModel.setProperty("/results", [])
          searchModel.setProperty("/visible", false)
        }

        if (employeeSearch) {
          employeeSearch.setValue(selectedEmployeeName)
        }
      }, 0)

      var visibleNodeId = this._findVisibleNodeForEmployee(employeeNode)

      if (visibleNodeId && this._chart) {
        this._recreateChart(this._allNodes, 0.5)

        setTimeout(function () {
          var refreshedVisibleNodeId = this._findVisibleNodeForEmployee(employeeNode)

          if (refreshedVisibleNodeId && this._chart && this._chart.center) {
            this._chart.center(refreshedVisibleNodeId)
          }

          setTimeout(function () {
            if (refreshedVisibleNodeId && this._chart) {
              this._chart.editUI.show(refreshedVisibleNodeId)
            }

            setTimeout(function () {
              this._renderEmployeeProfile(employeeNode)
            }.bind(this), 80)
          }.bind(this), 250)
        }.bind(this), 120)

        return
      }

      this._renderEmployeeProfile(employeeNode)
    },

    _findVisibleNodeForEmployee: function (employeeNode) {
      if (!employeeNode) {
        return ""
      }

      if (this._nodeMap && this._nodeMap[employeeNode.id]) {
        return employeeNode.id
      }

      if (this._visibleNodeMap && this._visibleNodeMap[employeeNode.id]) {
        return this._visibleNodeMap[employeeNode.id]
      }

      var resultId = ""

      Object.keys(this._nodeMap || {}).some(function (nodeId) {
        var node = this._nodeMap[nodeId]

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

        for (var areaCardIndex = 1; areaCardIndex <= 12; areaCardIndex++) {
          if (node["area_card_" + areaCardIndex + "_leader_id"] === employeeNode.id) {
            resultId = node.id
            return true
          }

          for (var employeeIndex = 1; employeeIndex <= 8; employeeIndex++) {
            if (node["area_card_" + areaCardIndex + "_emp_" + employeeIndex + "_id"] === employeeNode.id) {
              resultId = node.id
              return true
            }
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
    }
  })
})
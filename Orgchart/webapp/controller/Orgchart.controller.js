sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
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
      this.onLoad()
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

      var nodes = rows.map(function (item) {
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

      this._nodeMap = {}
      nodes.forEach(function (node) {
        this._nodeMap[node.id] = node
      }.bind(this))

      this.initChart(nodes)
    },

    initChart: function (nodes) {
      this._chart = new OrgChart(document.getElementById("tree"), {
        layout: OrgChart.layout.tree,
        template: "ula_custom_emp",
        nodeTreeMenu: false,
        enableSearch: true,
        mouseScrool: OrgChart.action.zoom,
        nodeMouseClick: OrgChart.action.none,
        scaleInitial: OrgChart.match.boundary,
        padding: 90,
        levelSeparation: 100,
        siblingSeparation: 60,
        subtreeSeparation: 120,
        nodeBinding: {
          field_0: "name",
          field_1: "title",
          field_3: "skill_1",
          field_4: "skill_2",
          field_5: "skill_3",
          img_0: "photo_url"
        },
        nodes: nodes,
        tags: {
          unit: { template: "ula_custom_unit" },
          pos: { template: "ula_custom_pos" },
          emp: { template: "ula_custom_emp" },
          emp_noskills: { template: "ula_custom_emp_noskills" },
          team: { template: "ula_custom_team" }
        },
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

      this._chart.on("click", function (sender, args) {
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
    }

  })
})
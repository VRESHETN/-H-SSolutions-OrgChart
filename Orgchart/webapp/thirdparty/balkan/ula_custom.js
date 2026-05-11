OrgChart.templates.ula_custom_emp = Object.assign({}, OrgChart.templates.ula)
OrgChart.templates.ula_custom_emp.size = [340, 197]

OrgChart.templates.ula_custom_emp.defs =
  '<filter id="ula_custom_emp_shadow" x="-20%" y="-20%" width="160%" height="160%">' +
  '<feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#1f2937" flood-opacity="0.14"></feDropShadow>' +
  '</filter>' +
  '<clipPath id="ula_custom_emp_circle">' +
  '<circle cx="52" cy="64" r="34"></circle>' +
  '</clipPath>'

OrgChart.templates.ula_custom_emp.node =
  '<g>' +
  '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" d="M170 0 L170 12"></path>' +
  '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" d="M170 0 L170 12"></path>' +
  '<rect x="0" y="12" width="340" height="185" rx="18" ry="18" fill="#ffffff" stroke="#d7e0ea" stroke-width="1.2" filter="url(#ula_custom_emp_shadow)"></rect>' +
  '<rect x="0" y="12" width="340" height="8" rx="18" ry="18" fill="#0a6ed1"></rect>' +
  '<rect x="14" y="26" width="312" height="157" rx="14" ry="14" fill="#ffffff" stroke="#e7eef5" stroke-width="1"></rect>' +
  '<rect x="18" y="30" width="68" height="68" rx="34" ry="34" fill="#edf4ff"></rect>' +
  '<rect x="18" y="134" width="145" height="40" rx="13" ry="13" fill="#edf5ff" stroke="#cfe5ff" stroke-width="1.3"></rect>' +
  '<circle cx="48" cy="154" r="11" fill="#0a6ed1"></circle>' +
  '<text style="font-size:12px;font-weight:800;" fill="#ffffff" x="48" y="159" text-anchor="middle">T</text>' +
  '<text style="font-size:14px;font-weight:800;" fill="#0a6ed1" x="98" y="159" text-anchor="middle">Teams</text>' +
  '<rect x="177" y="134" width="145" height="40" rx="13" ry="13" fill="#f4f7fa" stroke="#dfe7ef" stroke-width="1.3"></rect>' +
  '<rect x="204" y="146" width="20" height="16" rx="4" ry="4" fill="#334e68"></rect>' +
  '<path d="M206 149 L214 155 L222 149" stroke="#ffffff" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>' +
  '<text style="font-size:14px;font-weight:800;" fill="#334e68" x="270" y="159" text-anchor="middle">Outlook</text>' +
  '</g>'

OrgChart.templates.ula_custom_emp.img_0 =
  '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ula_custom_emp_circle)" xlink:href="{val}" x="18" y="30" width="68" height="68"></image>'

OrgChart.templates.ula_custom_emp.field_0 =
  '<text data-width="218" data-text-overflow="multiline" style="font-size:18px;font-weight:700;" fill="#102a43" x="98" y="54">{val}</text>'

OrgChart.templates.ula_custom_emp.field_1 =
  '<text data-width="218" data-text-overflow="ellipsis" style="font-size:13px;font-weight:600;" fill="#0a6ed1" x="98" y="100">{val}</text>'

OrgChart.templates.ula_custom_emp.field_2 = ''

OrgChart.templates.ula_custom_emp.field_3 =
  '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
  '<rect x="18" y="134" width="145" height="40" rx="13" ry="13" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
  '</a>'

OrgChart.templates.ula_custom_emp.field_4 =
  '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
  '<rect x="177" y="134" width="145" height="40" rx="13" ry="13" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
  '</a>'

OrgChart.templates.ula_custom_emp.field_5 = ''

OrgChart.templates.ula_custom_emp.link =
  '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
  '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'


OrgChart.templates.ula_custom_emp_noskills = Object.assign({}, OrgChart.templates.ula_custom_emp)
OrgChart.templates.ula_custom_emp_noskills.size = OrgChart.templates.ula_custom_emp.size
OrgChart.templates.ula_custom_emp_noskills.defs = OrgChart.templates.ula_custom_emp.defs
OrgChart.templates.ula_custom_emp_noskills.node = OrgChart.templates.ula_custom_emp.node
OrgChart.templates.ula_custom_emp_noskills.img_0 = OrgChart.templates.ula_custom_emp.img_0
OrgChart.templates.ula_custom_emp_noskills.field_0 = OrgChart.templates.ula_custom_emp.field_0
OrgChart.templates.ula_custom_emp_noskills.field_1 = OrgChart.templates.ula_custom_emp.field_1
OrgChart.templates.ula_custom_emp_noskills.field_2 = OrgChart.templates.ula_custom_emp.field_2
OrgChart.templates.ula_custom_emp_noskills.field_3 = OrgChart.templates.ula_custom_emp.field_3
OrgChart.templates.ula_custom_emp_noskills.field_4 = OrgChart.templates.ula_custom_emp.field_4
OrgChart.templates.ula_custom_emp_noskills.field_5 = OrgChart.templates.ula_custom_emp.field_5
OrgChart.templates.ula_custom_emp_noskills.link = OrgChart.templates.ula_custom_emp.link


OrgChart.templates.ula_custom_unit = Object.assign({}, OrgChart.templates.ula_custom_emp)
OrgChart.templates.ula_custom_unit.size = [350, 162]

OrgChart.templates.ula_custom_unit.node =
  '<g>' +
  '<path stroke="#bfd0e2" stroke-width="6" fill="none" stroke-linecap="round" d="M175 0 L175 12"></path>' +
  '<path stroke="#7fa7d6" stroke-width="2.8" fill="none" stroke-linecap="round" d="M175 0 L175 12"></path>' +
  '<rect x="0" y="12" width="350" height="150" rx="18" ry="18" fill="#0a6ed1" stroke="#085caf" stroke-width="1.2" filter="url(#ula_custom_emp_shadow)"></rect>' +
  '</g>'

OrgChart.templates.ula_custom_unit.img_0 = ''

OrgChart.templates.ula_custom_unit.field_0 =
  '<text data-width="302" data-text-overflow="multiline" style="font-size:20px;font-weight:800;" fill="#ffffff" x="24" y="72">{val}</text>'

OrgChart.templates.ula_custom_unit.field_1 =
  '<text data-width="302" data-text-overflow="ellipsis" style="font-size:13px;font-weight:500;" fill="#dbe8f5" x="24" y="100">{val}</text>'

OrgChart.templates.ula_custom_unit.field_2 = ''
OrgChart.templates.ula_custom_unit.field_3 = ''
OrgChart.templates.ula_custom_unit.field_4 = ''
OrgChart.templates.ula_custom_unit.field_5 = ''

OrgChart.templates.ula_custom_unit.link =
  '<path stroke="#bfd0e2" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
  '<path stroke="#7fa7d6" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'


OrgChart.templates.ula_custom_pos = Object.assign({}, OrgChart.templates.ula_custom_emp)
OrgChart.templates.ula_custom_pos.size = [320, 132]

OrgChart.templates.ula_custom_pos.node =
  '<g>' +
  '<path stroke="#d7e3f2" stroke-width="6" fill="none" stroke-linecap="round" d="M160 0 L160 12"></path>' +
  '<path stroke="#9ebae6" stroke-width="2.7" fill="none" stroke-linecap="round" d="M160 0 L160 12"></path>' +
  '<rect x="0" y="12" width="320" height="120" rx="18" ry="18" fill="#eef4ff" stroke="#c8d7eb" stroke-width="1.2" filter="url(#ula_custom_emp_shadow)"></rect>' +
  '<rect x="0" y="12" width="320" height="8" rx="18" ry="18" fill="#7da6f7"></rect>' +
  '</g>'

OrgChart.templates.ula_custom_pos.img_0 = ''

OrgChart.templates.ula_custom_pos.field_0 =
  '<text data-width="272" data-text-overflow="multiline" style="font-size:18px;font-weight:700;" fill="#16324f" x="24" y="54">{val}</text>'

OrgChart.templates.ula_custom_pos.field_1 =
  '<text data-width="272" data-text-overflow="ellipsis" style="font-size:13px;font-weight:600;" fill="#0a6ed1" x="24" y="80">{val}</text>'

OrgChart.templates.ula_custom_pos.field_2 = ''
OrgChart.templates.ula_custom_pos.field_3 = ''
OrgChart.templates.ula_custom_pos.field_4 = ''
OrgChart.templates.ula_custom_pos.field_5 = ''

OrgChart.templates.ula_custom_pos.link =
  '<path stroke="#d7e3f2" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
  '<path stroke="#9ebae6" stroke-width="2.7" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'


window.HsOrgChartTemplates = window.HsOrgChartTemplates || {}

window.HsOrgChartTemplates.createTeamTemplates = function (maxCount) {
  for (var count = 1; count <= maxCount; count++) {
    window.HsOrgChartTemplates.createTeamTemplate(count)
  }
}

window.HsOrgChartTemplates.createTeamTemplate = function (memberCount) {
  var templateName = "ula_custom_team_" + String(memberCount)
  var topConnectorHeight = 12
  var headerHeight = 96
  var rowHeight = 138
  var footer = 18
  var imageSize = 56
  var imageRadius = 28
  var maxColumnCount = 2
  var oneColumnLimit = 3
  var columnWidth = 430
  var columnCount = memberCount <= oneColumnLimit ? 1 : Math.min(maxColumnCount, memberCount)
  var rowsPerColumn = Math.ceil(memberCount / columnCount)
  var width = columnWidth * columnCount
  var height = topConnectorHeight + headerHeight + rowsPerColumn * rowHeight + footer
  var centerX = width / 2
  var contentY = topConnectorHeight
  var headerTextWidth = width - 60

  OrgChart.templates[templateName] = Object.assign({}, OrgChart.templates.ula)
  OrgChart.templates[templateName].size = [width, height]

  var defs = ''

  for (var clipIndex = 0; clipIndex < memberCount; clipIndex++) {
    var clipColumnIndex = Math.floor(clipIndex / rowsPerColumn)
    var clipRowIndex = clipIndex % rowsPerColumn
    var clipXOffset = clipColumnIndex * columnWidth
    var clipY = contentY + headerHeight + clipRowIndex * rowHeight + 14

    defs +=
      '<clipPath id="' + templateName + '_circle_' + clipIndex + '">' +
      '<circle cx="' + (clipXOffset + 60) + '" cy="' + (clipY + imageRadius) + '" r="' + imageRadius + '"></circle>' +
      '</clipPath>'
  }

  OrgChart.templates[templateName].defs = defs

  var node =
    '<g>' +
    '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" d="M' + centerX + ' 0 L' + centerX + ' ' + contentY + '"></path>' +
    '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" d="M' + centerX + ' 0 L' + centerX + ' ' + contentY + '"></path>' +
    '<rect x="0" y="' + contentY + '" width="' + width + '" height="' + (height - topConnectorHeight) + '" rx="20" ry="20" fill="#ffffff" stroke="#0a6ed1" stroke-width="7" filter="url(#ula_custom_emp_shadow)"></rect>' +
    '<rect x="0" y="' + contentY + '" width="' + width + '" height="78" rx="20" ry="20" fill="#0a6ed1"></rect>' +
    '<rect x="0" y="' + (contentY + 56) + '" width="' + width + '" height="24" fill="#0a6ed1"></rect>'

  for (var row = 0; row < memberCount; row++) {
    var columnIndex = Math.floor(row / rowsPerColumn)
    var rowIndex = row % rowsPerColumn
    var xOffset = columnIndex * columnWidth
    var y = contentY + headerHeight + rowIndex * rowHeight

    if (row === 0) {
      node +=
        '<rect x="' + (xOffset + 12) + '" y="' + (y - 6) + '" width="406" height="140" rx="20" ry="20" fill="#d8eaff" opacity="0.55"></rect>' +
        '<rect x="' + (xOffset + 18) + '" y="' + y + '" width="394" height="128" rx="16" ry="16" fill="#ffffff" stroke="#0a6ed1" stroke-width="3"></rect>' +
        '<circle cx="' + (xOffset + 60) + '" cy="' + (y + 42) + '" r="30" fill="#eaf4ff" stroke="#0a6ed1" stroke-width="2.6"></circle>' +
        '<rect x="' + (xOffset + 300) + '" y="' + (y + 14) + '" width="88" height="24" rx="12" ry="12" fill="#eaf4ff" stroke="#b8dcff" stroke-width="1"></rect>' +
        '<text style="font-size:10px;font-weight:800;letter-spacing:0.4px;" fill="#0a6ed1" x="' + (xOffset + 344) + '" y="' + (y + 30) + '" text-anchor="middle">LEITUNG</text>'
    } else {
      node +=
        '<rect x="' + (xOffset + 18) + '" y="' + y + '" width="394" height="128" rx="16" ry="16" fill="#ffffff" stroke="#d7e0ea" stroke-width="1.2"></rect>' +
        '<circle cx="' + (xOffset + 60) + '" cy="' + (y + 42) + '" r="28" fill="#edf4ff"></circle>'
    }

    node +=
      '<rect x="' + (xOffset + 30) + '" y="' + (y + 82) + '" width="162" height="34" rx="11" ry="11" fill="#edf5ff" stroke="#cfe5ff" stroke-width="1"></rect>' +
      '<circle cx="' + (xOffset + 58) + '" cy="' + (y + 99) + '" r="8" fill="#0a6ed1"></circle>' +
      '<text style="font-size:10px;font-weight:800;" fill="#ffffff" x="' + (xOffset + 58) + '" y="' + (y + 103) + '" text-anchor="middle">T</text>' +
      '<text style="font-size:12px;font-weight:800;" fill="#0a6ed1" x="' + (xOffset + 112) + '" y="' + (y + 104) + '" text-anchor="middle">Teams</text>' +

      '<rect x="' + (xOffset + 212) + '" y="' + (y + 82) + '" width="162" height="34" rx="11" ry="11" fill="#f4f7fa" stroke="#dfe7ef" stroke-width="1"></rect>' +
      '<rect x="' + (xOffset + 240) + '" y="' + (y + 92) + '" width="16" height="13" rx="3" ry="3" fill="#334e68"></rect>' +
      '<path d="M' + (xOffset + 242) + ' ' + (y + 94) + ' L' + (xOffset + 248) + ' ' + (y + 99) + ' L' + (xOffset + 254) + ' ' + (y + 94) + '" stroke="#ffffff" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<text style="font-size:12px;font-weight:800;" fill="#334e68" x="' + (xOffset + 312) + '" y="' + (y + 104) + '" text-anchor="middle">Outlook</text>'
  }

  node += '</g>'

  OrgChart.templates[templateName].node = node

  OrgChart.templates[templateName].field_0 =
    '<text data-width="' + headerTextWidth + '" data-text-overflow="ellipsis" style="font-size:18px;font-weight:800;" fill="#ffffff" x="' + centerX + '" y="' + (contentY + 32) + '" text-anchor="middle">{val}</text>'

  OrgChart.templates[templateName].field_1 =
    '<text data-width="' + headerTextWidth + '" data-text-overflow="ellipsis" style="font-size:12px;font-weight:600;" fill="#eaf4ff" x="' + centerX + '" y="' + (contentY + 56) + '" text-anchor="middle">{val}</text>'

  OrgChart.templates[templateName].img_0 = ''

  OrgChart.templates[templateName].img_1 =
    '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#' + templateName + '_circle_0)" xlink:href="{val}" x="32" y="' + (contentY + 110) + '" width="' + imageSize + '" height="' + imageSize + '"></image>'

  OrgChart.templates[templateName].field_6 =
    '<text data-width="190" data-text-overflow="ellipsis" style="font-size:15px;font-weight:900;" fill="#0b2341" x="104" y="' + (contentY + 132) + '">{val}</text>'

  OrgChart.templates[templateName].field_7 =
    '<text data-width="190" data-text-overflow="ellipsis" style="font-size:11px;font-weight:700;" fill="#0a6ed1" x="104" y="' + (contentY + 154) + '">{val}</text>'

  OrgChart.templates[templateName].field_8 =
    '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
    '<rect x="30" y="' + (contentY + 178) + '" width="162" height="34" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
    '</a>'

  OrgChart.templates[templateName].field_9 =
    '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
    '<rect x="212" y="' + (contentY + 178) + '" width="162" height="34" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
    '</a>'

  OrgChart.templates[templateName].field_10 =
    '<rect class="hs-team-member-click" data-member-id="{val}" x="18" y="' + (contentY + 96) + '" width="394" height="78" fill="#ffffff" opacity="0.01" style="pointer-events:all;cursor:pointer;"></rect>'

  OrgChart.templates[templateName].field_11 = ''
  OrgChart.templates[templateName].field_12 = ''
  OrgChart.templates[templateName].field_13 = ''
  OrgChart.templates[templateName].field_14 = ''
  OrgChart.templates[templateName].field_15 = ''

  for (var index = 1; index <= memberCount - 1; index++) {
    var base = 20 + (index - 1) * 7
    var imageIndex = index + 1
    var memberColumnIndex = Math.floor(index / rowsPerColumn)
    var memberRowIndex = index % rowsPerColumn
    var memberXOffset = memberColumnIndex * columnWidth
    var rowY = contentY + headerHeight + memberRowIndex * rowHeight

    OrgChart.templates[templateName]["img_" + imageIndex] =
      '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#' + templateName + '_circle_' + index + ')" xlink:href="{val}" x="' + (memberXOffset + 32) + '" y="' + (rowY + 14) + '" width="' + imageSize + '" height="' + imageSize + '"></image>'

    OrgChart.templates[templateName]["field_" + base] =
      '<text data-width="238" data-text-overflow="ellipsis" style="font-size:15px;font-weight:800;" fill="#102a43" x="' + (memberXOffset + 104) + '" y="' + (rowY + 36) + '">{val}</text>'

    OrgChart.templates[templateName]["field_" + (base + 1)] =
      '<text data-width="238" data-text-overflow="ellipsis" style="font-size:11px;font-weight:600;" fill="#0a6ed1" x="' + (memberXOffset + 104) + '" y="' + (rowY + 58) + '">{val}</text>'

    OrgChart.templates[templateName]["field_" + (base + 2)] =
      '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
      '<rect x="' + (memberXOffset + 30) + '" y="' + (rowY + 82) + '" width="162" height="34" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
      '</a>'

    OrgChart.templates[templateName]["field_" + (base + 3)] =
      '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
      '<rect x="' + (memberXOffset + 212) + '" y="' + (rowY + 82) + '" width="162" height="34" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
      '</a>'

    OrgChart.templates[templateName]["field_" + (base + 4)] =
      '<rect class="hs-team-member-click" data-member-id="{val}" x="' + (memberXOffset + 18) + '" y="' + rowY + '" width="394" height="78" fill="#ffffff" opacity="0.01" style="pointer-events:all;cursor:pointer;"></rect>'

    OrgChart.templates[templateName]["field_" + (base + 5)] = ''
    OrgChart.templates[templateName]["field_" + (base + 6)] = ''
  }

  OrgChart.templates[templateName].link =
    '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
    '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'



}


OrgChart.templates.ula_custom_empty_team = Object.assign({}, OrgChart.templates.ula)
OrgChart.templates.ula_custom_empty_team.size = [430, 108]

OrgChart.templates.ula_custom_empty_team.node =
  '<g>' +
  '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" d="M215 0 L215 12"></path>' +
  '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" d="M215 0 L215 12"></path>' +
  '<rect x="0" y="12" width="430" height="96" rx="20" ry="20" fill="#ffffff" stroke="#0a6ed1" stroke-width="7" filter="url(#ula_custom_emp_shadow)"></rect>' +
  '<rect x="0" y="12" width="430" height="78" rx="20" ry="20" fill="#0a6ed1"></rect>' +
  '<rect x="0" y="68" width="430" height="24" fill="#0a6ed1"></rect>' +
  '</g>'

OrgChart.templates.ula_custom_empty_team.field_0 =
  '<text data-width="370" data-text-overflow="ellipsis" style="font-size:18px;font-weight:800;" fill="#ffffff" x="215" y="48" text-anchor="middle">{val}</text>'

OrgChart.templates.ula_custom_empty_team.field_1 = ''
OrgChart.templates.ula_custom_empty_team.field_2 = ''
OrgChart.templates.ula_custom_empty_team.field_3 = ''
OrgChart.templates.ula_custom_empty_team.field_4 = ''
OrgChart.templates.ula_custom_empty_team.field_5 = ''
OrgChart.templates.ula_custom_empty_team.img_0 = ''

OrgChart.templates.ula_custom_empty_team.link =
  '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
  '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'


OrgChart.templates.ula_custom_anchor = Object.assign({}, OrgChart.templates.ula)
OrgChart.templates.ula_custom_anchor.size = [1, 1]

OrgChart.templates.ula_custom_anchor.node =
  '<g>' +
  '<circle cx="0" cy="0" r="1" fill="#ffffff" opacity="0"></circle>' +
  '</g>'

OrgChart.templates.ula_custom_anchor.field_0 = ''
OrgChart.templates.ula_custom_anchor.field_1 = ''
OrgChart.templates.ula_custom_anchor.field_2 = ''
OrgChart.templates.ula_custom_anchor.field_3 = ''
OrgChart.templates.ula_custom_anchor.field_4 = ''
OrgChart.templates.ula_custom_anchor.field_5 = ''
OrgChart.templates.ula_custom_anchor.img_0 = ''

// OrgChart.templates.ula_custom_anchor.plus = ''
// OrgChart.templates.ula_custom_anchor.minus = ''

OrgChart.templates.ula_custom_anchor.link =
  '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
  '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'
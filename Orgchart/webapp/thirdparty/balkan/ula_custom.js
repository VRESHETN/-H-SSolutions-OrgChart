var HS_PERSON_CARD_WIDTH = 434
var HS_PERSON_CARD_HEIGHT = 112

var HS_PERSON_SIDE_PADDING = 18
var HS_PERSON_BUTTON_GAP = 20
var HS_PERSON_BUTTON_HEIGHT = 34
var HS_PERSON_BUTTON_WIDTH = (HS_PERSON_CARD_WIDTH - HS_PERSON_SIDE_PADDING * 2 - HS_PERSON_BUTTON_GAP) / 2

var HS_AVATAR_X = 42
var HS_AVATAR_Y = 34
var HS_AVATAR_SIZE = 56
var HS_AVATAR_RADIUS = 28

var HS_TEXT_X = 104
var HS_NAME_Y = 28
var HS_TITLE_Y = 50
var HS_BUTTON_Y = 68

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
  var rowHeight = 148
  var footer = 0
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

    node +=
      // '<rect x="' + (xOffset + 12) + '" y="' + (y - 6) + '" width="406" height="140" rx="20" ry="20" fill="#d8eaff" opacity="0.55"></rect>' +
      '<rect x="' + (xOffset + 18) + '" y="' + y + '" width="394" height="128" rx="16" ry="16" fill="#ffffff" stroke="#0a6ed1" stroke-width="3"></rect>' +
      '<circle cx="' + (xOffset + 60) + '" cy="' + (y + 42) + '" r="30" fill="#eaf4ff" stroke="#0a6ed1" stroke-width="2.6"></circle>'

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
    '<rect x="' + (centerX - 194) + '" y="160" width="176" height="34" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
    '</a>'

  OrgChart.templates[templateName].field_9 =
    '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
    '<rect x="' + (centerX + 18) + '" y="160" width="176" height="34" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
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

OrgChart.templates.ula_custom_anchor.link =
  '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
  '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'


window.HsOrgChartTemplates.createAreaCardTemplate = function (areaIndex, layoutJson, areaWidth, areaHeight) {
  var templateName = "ula_custom_area_card_" + String(areaIndex)
  var outerPadding = 52
  var cardWidth = 470
  var personCardWidth = HS_PERSON_CARD_WIDTH
  var personCardHeight = HS_PERSON_CARD_HEIGHT
  var cardGap = 52
  var subtreeGap = 64
  var layout = layoutJson ? JSON.parse(layoutJson) : { roots: [], cards: [] }



  var hideRootConnector = !!layout.hideRootConnector
  var hideHeaderLeader = !!layout.hideHeaderLeader
  var hideAreaTitle = !!layout.hideAreaTitle
  var hideOuterFrame = !!layout.hideOuterFrame
  var areaHeaderHeight = hideOuterFrame && hideRootConnector && hideAreaTitle && hideHeaderLeader ? 24 : hideAreaTitle ? (hideHeaderLeader ? 72 : 222) : (hideHeaderLeader ? 130 : 280)
  if (layout.managementOnly) {
    OrgChart.templates[templateName] = Object.assign({}, OrgChart.templates.ula)
    OrgChart.templates[templateName].size = [areaWidth, areaHeight]

    var managementPersonWidth = 434
    var managementPersonGap = 36
    var managementOuterPadding = 52
    var managementPersonY = 120
    var managementEmployeeCount = layout.employeeCount || 0

    OrgChart.templates[templateName].defs =
      '<filter id="' + templateName + '_shadow" x="-20%" y="-20%" width="160%" height="160%">' +
      '<feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#1f2937" flood-opacity="0.12"></feDropShadow>' +
      '</filter>'

    var managementNode =
      '<g>' +
      '<rect x="0" y="16" width="' + areaWidth + '" height="' + (areaHeight - 16) + '" rx="22" ry="22" fill="#ffffff" stroke="#0a6ed1" stroke-width="7" filter="url(#' + templateName + '_shadow)"></rect>' +
      '<rect x="' + (centerX - 210) + '" y="0" width="420" height="56" rx="12" ry="12" fill="#0a6ed1"></rect>'

    for (var managementIndex = 1; managementIndex <= managementEmployeeCount; managementIndex++) {
      var personX = managementOuterPadding + (managementIndex - 1) * (managementPersonWidth + managementPersonGap)
      var personY = managementPersonY

      OrgChart.templates[templateName].defs +=
        '<clipPath id="' + templateName + '_management_emp_' + managementIndex + '_circle">' +
        '<circle cx="' + (personX + 42) + '" cy="' + (personY + 34) + '" r="28"></circle>' +
        '</clipPath>'

      managementNode +=
        '<rect x="' + personX + '" y="' + personY + '" width="' + managementPersonWidth + '" height="112" rx="16" ry="16" fill="#ffffff" stroke="#d7e0ea" stroke-width="1.2"></rect>' +
        '<circle cx="' + (personX + 42) + '" cy="' + (personY + 34) + '" r="28" fill="#edf4ff"></circle>' +
        '<rect x="' + (personX + 12) + '" y="' + (personY + 68) + '" width="176" height="34" rx="11" ry="11" fill="#edf5ff" stroke="#cfe5ff" stroke-width="1"></rect>' +
        '<circle cx="' + (personX + 42) + '" cy="' + (personY + 85) + '" r="8" fill="#0a6ed1"></circle>' +
        '<text style="font-size:10px;font-weight:800;" fill="#ffffff" x="' + (personX + 42) + '" y="' + (personY + 89) + '" text-anchor="middle">T</text>' +
        '<text style="font-size:12px;font-weight:800;" fill="#0a6ed1" x="' + (personX + 104) + '" y="' + (personY + 90) + '" text-anchor="middle">Teams</text>' +
        '<rect x="' + (personX + 212) + '" y="' + (personY + 68) + '" width="176" height="34" rx="11" ry="11" fill="#f4f7fa" stroke="#dfe7ef" stroke-width="1"></rect>' +
        '<rect x="' + (personX + 242) + '" y="' + (personY + 79) + '" width="16" height="13" rx="3" ry="3" fill="#334e68"></rect>' +
        '<path d="M' + (personX + 244) + ' ' + (personY + 81) + ' L' + (personX + 250) + ' ' + (personY + 86) + ' L' + (personX + 256) + ' ' + (personY + 81) + '" stroke="#ffffff" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>' +
        '<text style="font-size:12px;font-weight:800;" fill="#334e68" x="' + (personX + 312) + '" y="' + (personY + 90) + '" text-anchor="middle">Outlook</text>'
    }

    managementNode += '</g>'

    OrgChart.templates[templateName].node = managementNode

    OrgChart.templates[templateName].field_0 =
      '<text data-width="390" data-text-overflow="ellipsis" style="font-size:22px;font-weight:900;" fill="#ffffff" x="' + centerX + '" y="36" text-anchor="middle">{val}</text>'

    for (var employeeIndex = 1; employeeIndex <= managementEmployeeCount; employeeIndex++) {
      var fieldBase = 200
      var employeeBase = fieldBase + 10 + (employeeIndex - 1) * 5
      var fieldImageBase = 100
      var personFieldX = managementOuterPadding + (employeeIndex - 1) * (managementPersonWidth + managementPersonGap)
      var personFieldY = managementPersonY

      OrgChart.templates[templateName]["img_" + (fieldImageBase + employeeIndex)] =
        '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#' + templateName + '_management_emp_' + employeeIndex + '_circle)" xlink:href="{val}" x="' + (personFieldX + 14) + '" y="' + (personFieldY + 6) + '" width="56" height="56"></image>'

      OrgChart.templates[templateName]["field_" + employeeBase] =
        '<text data-width="190" data-text-overflow="ellipsis" style="font-size:15px;font-weight:900;" fill="#0b2341" x="' + (personFieldX + 82) + '" y="' + (personFieldY + 28) + '">{val}</text>'

      OrgChart.templates[templateName]["field_" + (employeeBase + 1)] =
        '<text data-width="190" data-text-overflow="ellipsis" style="font-size:11px;font-weight:700;" fill="#0a6ed1" x="' + (personFieldX + 82) + '" y="' + (personFieldY + 50) + '">{val}</text>'

      OrgChart.templates[templateName]["field_" + (employeeBase + 2)] =
        '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
        '<rect x="' + (personFieldX + 12) + '" y="' + (personFieldY + 68) + '" width="176" height="34" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
        '</a>'

      OrgChart.templates[templateName]["field_" + (employeeBase + 3)] =
        '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
        '<rect x="' + (personFieldX + 212) + '" y="' + (personFieldY + 68) + '" width="176" height="34" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
        '</a>'

      OrgChart.templates[templateName]["field_" + (employeeBase + 4)] =
        '<rect class="hs-team-member-click" data-member-id="{val}" x="' + personFieldX + '" y="' + personFieldY + '" width="' + managementPersonWidth + '" height="68" fill="#ffffff" opacity="0.01" style="pointer-events:all;cursor:pointer;"></rect>'
    }

    OrgChart.templates[templateName].link =
      '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
      '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'

    return
  }

  var cardHeaderHeight = 82
  var leaderHeight = 142
  var employeeHeight = 126
  var cardBottomPadding = 8
  var rowGap = 70
  var centerX = areaWidth / 2

  function drawConnector(x1, y1, x2, y2) {
    return '' +
      '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="butt" d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '"></path>' +
      '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="butt" d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '"></path>'
  }

  var topRowY = areaHeaderHeight
  var cardMetaMap = {}
  var positions = {}

    ; (layout.cards || []).forEach(function (cardMeta) {
      cardMetaMap[cardMeta.slot] = cardMeta
    })

  function getCardHeight(slot) {
    var meta = cardMetaMap[slot] || { employeeCount: 0 }
    return cardHeaderHeight + (meta.hideLeader ? 0 : leaderHeight) + (meta.employeeCount || 0) * employeeHeight + cardBottomPadding
  }

  var topRowMaxHeight = 0

    ; (layout.roots || []).forEach(function (root) {
      var topHeight = getCardHeight(root.slot)

      if (topHeight > topRowMaxHeight) {
        topRowMaxHeight = topHeight
      }
    })

  var bottomRowY = topRowY + topRowMaxHeight + rowGap
  var currentX = outerPadding

    ; (layout.roots || []).forEach(function (root) {
      var childCount = root.children.length
      var childWidth = childCount ? childCount * cardWidth + (childCount - 1) * cardGap : 0
      var subtreeWidth = Math.max(cardWidth, childWidth)
      var parentX = currentX + (subtreeWidth - cardWidth) / 2

      positions[root.slot] = {
        x: parentX,
        y: topRowY
      }

      if (childCount) {
        var childStartX = currentX + (subtreeWidth - childWidth) / 2

        root.children.forEach(function (childSlot, childIndex) {
          positions[childSlot] = {
            x: childStartX + childIndex * (cardWidth + cardGap),
            y: bottomRowY
          }
        })
      }

      currentX += subtreeWidth + subtreeGap
    })

  OrgChart.templates[templateName] = Object.assign({}, OrgChart.templates.ula)
  OrgChart.templates[templateName].size = [areaWidth, areaHeight]

  OrgChart.templates[templateName].defs =
    '<filter id="' + templateName + '_shadow" x="-20%" y="-20%" width="160%" height="160%">' +
    '<feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#1f2937" flood-opacity="0.12"></feDropShadow>' +
    '</filter>' +
    '<clipPath id="' + templateName + '_leader_circle">' +
    '<circle cx="' + (centerX - 165) + '" cy="126" r="32"></circle>' +
    '</clipPath>'

  var node = '<g>'

  if (!hideOuterFrame) {
    node +=
      '<rect x="0" y="16" width="' + areaWidth + '" height="' + (areaHeight - 16) + '" rx="22" ry="22" fill="#ffffff" stroke="#0a6ed1" stroke-width="7" filter="url(#' + templateName + '_shadow)"></rect>'
  }

  if (!hideAreaTitle) {
    node +=
      '<rect x="' + (centerX - 210) + '" y="0" width="420" height="56" rx="12" ry="12" fill="#0a6ed1"></rect>'
  }
  if (!hideHeaderLeader) {
    node +=
      drawConnector(centerX, 56, centerX, 82) +
      '<rect x="' + (centerX - 220) + '" y="82" width="440" height="132" rx="18" ry="18" fill="#ffffff" stroke="#0a6ed1" stroke-width="3" filter="url(#' + templateName + '_shadow)"></rect>' +
      '<rect x="' + (centerX - 208) + '" y="94" width="416" height="108" rx="14" ry="14" fill="#ffffff"></rect>' +
      '<circle cx="' + (centerX - 165) + '" cy="126" r="32" fill="#edf4ff"></circle>' +
      '<rect x="' + (centerX + 120) + '" y="104" width="78" height="24" rx="12" ry="12" fill="#eaf4ff" stroke="#b8dcff" stroke-width="1"></rect>' +
      '<text style="font-size:10px;font-weight:800;letter-spacing:0.4px;" fill="#0a6ed1" x="' + (centerX + 159) + '" y="120" text-anchor="middle">LEITUNG</text>' +
      '<rect x="' + (centerX - 188) + '" y="160" width="176" height="34" rx="11" ry="11" fill="#edf5ff" stroke="#cfe5ff" stroke-width="1"></rect>' +
      '<circle cx="' + (centerX - 158) + '" cy="177" r="8" fill="#0a6ed1"></circle>' +
      '<text style="font-size:10px;font-weight:800;" fill="#ffffff" x="' + (centerX - 158) + '" y="181" text-anchor="middle">T</text>' +
      '<text style="font-size:12px;font-weight:800;" fill="#0a6ed1" x="' + (centerX - 96) + '" y="181" text-anchor="middle">Teams</text>' +

      '<rect x="' + (centerX + 12) + '" y="160" width="176" height="34" rx="11" ry="11" fill="#f4f7fa" stroke="#dfe7ef" stroke-width="1"></rect>' +
      '<rect x="' + (centerX + 42) + '" y="170" width="16" height="13" rx="3" ry="3" fill="#334e68"></rect>' +
      '<path d="M' + (centerX + 44) + ' 172 L' + (centerX + 50) + ' 177 L' + (centerX + 56) + ' 172" stroke="#ffffff" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<text style="font-size:12px;font-weight:800;" fill="#334e68" x="' + (centerX + 112) + '" y="181" text-anchor="middle">Outlook</text>'
  }

  var rootConnectorY = 0

  if ((layout.roots || []).length && !hideRootConnector) {
    var firstRoot = layout.roots[0]
    var lastRoot = layout.roots[layout.roots.length - 1]
    var firstRootCenterX = positions[firstRoot.slot].x + cardWidth / 2
    var lastRootCenterX = positions[lastRoot.slot].x + cardWidth / 2

    var headerLeaderBottomY = 82 + 132

    rootConnectorY = hideAreaTitle ? 54 : (hideHeaderLeader ? 84 : headerLeaderBottomY + 34)

    var rootConnectorStartY = hideAreaTitle ? 18 : (hideHeaderLeader ? 18 : headerLeaderBottomY)

    node +=
      drawConnector(centerX, rootConnectorStartY, centerX, rootConnectorY) +
      drawConnector(firstRootCenterX, rootConnectorY, lastRootCenterX, rootConnectorY)
  }

  function drawPersonCard(x, y, isLeader) {
    var badge = ''
    var buttonLeftX = x + HS_PERSON_SIDE_PADDING
    var buttonRightX = buttonLeftX + HS_PERSON_BUTTON_WIDTH + HS_PERSON_BUTTON_GAP
    var buttonY = y + HS_BUTTON_Y

    if (isLeader) {
      badge =
        '<rect x="' + (x + 318) + '" y="' + (y + 14) + '" width="96" height="24" rx="12" ry="12" fill="#eaf4ff" stroke="#b8dcff" stroke-width="1"></rect>' +
        '<text style="font-size:10px;font-weight:800;letter-spacing:0.4px;" fill="#0a6ed1" x="' + (x + 366) + '" y="' + (y + 30) + '" text-anchor="middle">LEITUNG</text>'
    }

    return '' +
      '<rect x="' + x + '" y="' + y + '" width="' + HS_PERSON_CARD_WIDTH + '" height="' + HS_PERSON_CARD_HEIGHT + '" rx="16" ry="16" fill="#ffffff" stroke="' + (isLeader ? '#0a6ed1' : '#d7e0ea') + '" stroke-width="' + (isLeader ? '3' : '1.2') + '"></rect>' +
      '<circle cx="' + (x + HS_AVATAR_X) + '" cy="' + (y + HS_AVATAR_Y) + '" r="' + (isLeader ? '30' : '28') + '" fill="#edf4ff" stroke="' + (isLeader ? '#0a6ed1' : '#edf4ff') + '" stroke-width="' + (isLeader ? '2.6' : '1') + '"></circle>' +
      badge +

      '<rect x="' + buttonLeftX + '" y="' + buttonY + '" width="' + HS_PERSON_BUTTON_WIDTH + '" height="' + HS_PERSON_BUTTON_HEIGHT + '" rx="11" ry="11" fill="#edf5ff" stroke="#cfe5ff" stroke-width="1"></rect>' +
      '<circle cx="' + (buttonLeftX + 30) + '" cy="' + (buttonY + 17) + '" r="8" fill="#0a6ed1"></circle>' +
      '<text style="font-size:10px;font-weight:800;" fill="#ffffff" x="' + (buttonLeftX + 30) + '" y="' + (buttonY + 21) + '" text-anchor="middle">T</text>' +
      '<text style="font-size:12px;font-weight:800;" fill="#0a6ed1" x="' + (buttonLeftX + HS_PERSON_BUTTON_WIDTH / 2 + 18) + '" y="' + (buttonY + 22) + '" text-anchor="middle">Teams</text>' +

      '<rect x="' + buttonRightX + '" y="' + buttonY + '" width="' + HS_PERSON_BUTTON_WIDTH + '" height="' + HS_PERSON_BUTTON_HEIGHT + '" rx="11" ry="11" fill="#f4f7fa" stroke="#dfe7ef" stroke-width="1"></rect>' +
      '<rect x="' + (buttonRightX + 30) + '" y="' + (buttonY + 11) + '" width="16" height="13" rx="3" ry="3" fill="#334e68"></rect>' +
      '<path d="M' + (buttonRightX + 32) + ' ' + (buttonY + 13) + ' L' + (buttonRightX + 38) + ' ' + (buttonY + 18) + ' L' + (buttonRightX + 44) + ' ' + (buttonY + 13) + '" stroke="#ffffff" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>' +
      '<text style="font-size:12px;font-weight:800;" fill="#334e68" x="' + (buttonRightX + HS_PERSON_BUTTON_WIDTH / 2 + 18) + '" y="' + (buttonY + 22) + '" text-anchor="middle">Outlook</text>'
  }

  function drawCardFrame(x, y, cardHeight, hideLeader) {
    var html = '' +
      '<rect x="' + x + '" y="' + y + '" width="' + cardWidth + '" height="' + cardHeight + '" rx="20" ry="20" fill="#ffffff" stroke="#0a6ed1" stroke-width="7"></rect>' +
      '<rect x="' + x + '" y="' + y + '" width="' + cardWidth + '" height="82" rx="20" ry="20" fill="#0a6ed1"></rect>' +
      '<rect x="' + x + '" y="' + (y + 58) + '" width="' + cardWidth + '" height="26" fill="#0a6ed1"></rect>'

    if (!hideLeader) {
      html += drawPersonCard(x + 18, y + 98, true)
    }

    return html
  }

  function drawEmployeeRows(x, y, employeeCount, hideLeader) {
    var html = ''
    var startY = y + cardHeaderHeight + (hideLeader ? 0 : leaderHeight)

    for (var employeeIndex = 1; employeeIndex <= employeeCount; employeeIndex++) {
      var employeeY = startY + (employeeIndex - 1) * employeeHeight
      html += drawPersonCard(x + 18, employeeY, false)
    }

    return html
  }

  (layout.roots || []).forEach(function (root) {
    var parentPos = positions[root.slot]
    var parentHeight = getCardHeight(root.slot)
    var parentCenterX = parentPos.x + cardWidth / 2
    var parentConnector = ""

    if (!hideRootConnector) {
      parentConnector = drawConnector(parentCenterX, rootConnectorY, parentCenterX, parentPos.y)
    }

    node +=
      parentConnector +
      drawCardFrame(parentPos.x, parentPos.y, parentHeight, !!(cardMetaMap[root.slot] || {}).hideLeader) +
      drawEmployeeRows(parentPos.x, parentPos.y, (cardMetaMap[root.slot] || {}).employeeCount || 0, !!(cardMetaMap[root.slot] || {}).hideLeader)

    if (root.children.length) {
      var firstChildSlot = root.children[0]
      var lastChildSlot = root.children[root.children.length - 1]
      var firstChildCenterX = positions[firstChildSlot].x + cardWidth / 2
      var lastChildCenterX = positions[lastChildSlot].x + cardWidth / 2
      var childrenConnectorY = parentPos.y + parentHeight + 30

      node +=
        drawConnector(parentCenterX, parentPos.y + parentHeight, parentCenterX, childrenConnectorY) +
        drawConnector(firstChildCenterX, childrenConnectorY, lastChildCenterX, childrenConnectorY)

      root.children.forEach(function (childSlot) {
        var childPos = positions[childSlot]
        var childHeight = getCardHeight(childSlot)
        var childCenterX = childPos.x + cardWidth / 2

        node +=
          drawConnector(childCenterX, childrenConnectorY, childCenterX, childPos.y) +
          drawCardFrame(childPos.x, childPos.y, childHeight, !!(cardMetaMap[childSlot] || {}).hideLeader) +
          drawEmployeeRows(childPos.x, childPos.y, (cardMetaMap[childSlot] || {}).employeeCount || 0, !!(cardMetaMap[childSlot] || {}).hideLeader)
      })
    }
  })

  node += '</g>'

  OrgChart.templates[templateName].node = node

  OrgChart.templates[templateName].field_0 = hideAreaTitle
    ? ''
    : '<text data-width="390" data-text-overflow="ellipsis" style="font-size:22px;font-weight:900;" fill="#ffffff" x="' + centerX + '" y="36" text-anchor="middle">{val}</text>'

  OrgChart.templates[templateName].img_1 =
    '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#' + templateName + '_leader_circle)" xlink:href="{val}" x="' + (centerX - 197) + '" y="94" width="64" height="64"></image>'

  OrgChart.templates[templateName].field_6 =
    '<text data-width="230" data-text-overflow="ellipsis" style="font-size:16px;font-weight:900;" fill="#102a43" x="' + (centerX - 110) + '" y="126">{val}</text>'

  OrgChart.templates[templateName].field_7 =
    '<text data-width="230" data-text-overflow="ellipsis" style="font-size:13px;font-weight:700;" fill="#0a6ed1" x="' + (centerX - 110) + '" y="150">{val}</text>'

  OrgChart.templates[templateName].field_8 =
    '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
    '<rect x="' + (centerX - 188) + '" y="160" width="176" height="34" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
    '</a>'

  OrgChart.templates[templateName].field_9 =
    '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
    '<rect x="' + (centerX + 12) + '" y="160" width="176" height="34" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
    '</a>'

  OrgChart.templates[templateName].field_10 =
    '<rect class="hs-team-member-click" data-member-id="{val}" x="' + (centerX - 220) + '" y="82" width="440" height="132" fill="#ffffff" opacity="0.01" style="pointer-events:all;cursor:pointer;"></rect>'

  for (var slot = 1; slot <= 12; slot++) {
    if (!positions[slot]) {
      continue
    }

    var fieldBase = 200 + (slot - 1) * 50
    var fieldImageBase = 100 + (slot - 1) * 10
    var fieldX = positions[slot].x
    var fieldY = positions[slot].y
    var fieldEmployeeCount = (cardMetaMap[slot] || {}).employeeCount || 0
    var fieldHideLeader = !!(cardMetaMap[slot] || {}).hideLeader

    OrgChart.templates[templateName].defs +=
      '<clipPath id="' + templateName + '_card_' + slot + '_leader_circle">' +
      '<circle cx="' + (fieldX + 60) + '" cy="' + (fieldY + 132) + '" r="30"></circle>' +
      '</clipPath>'

    OrgChart.templates[templateName]["field_" + fieldBase] =
      '<text data-width="' + (cardWidth - 40) + '" data-text-overflow="ellipsis" style="font-size:16px;font-weight:900;" fill="#ffffff" x="' + (fieldX + cardWidth / 2) + '" y="' + (fieldY + 34) + '" text-anchor="middle">{val}</text>'

    if (!fieldHideLeader) {
      OrgChart.templates[templateName]["img_" + fieldImageBase] =
        '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#' + templateName + '_card_' + slot + '_leader_circle)" xlink:href="{val}" x="' + (fieldX + 30) + '" y="' + (fieldY + 102) + '" width="60" height="60"></image>'

      OrgChart.templates[templateName]["field_" + (fieldBase + 1)] =
        '<text data-width="190" data-text-overflow="ellipsis" style="font-size:15px;font-weight:900;" fill="#0b2341" x="' + (fieldX + 122) + '" y="' + (fieldY + 126) + '">{val}</text>'

      OrgChart.templates[templateName]["field_" + (fieldBase + 2)] =
        '<text data-width="190" data-text-overflow="ellipsis" style="font-size:11px;font-weight:700;" fill="#0a6ed1" x="' + (fieldX + 122) + '" y="' + (fieldY + 148) + '">{val}</text>'

      OrgChart.templates[templateName]["field_" + (fieldBase + 3)] =
        '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
        '<rect x="' + (fieldX + 36) + '" y="' + (fieldY + 166) + '" width="' + HS_PERSON_BUTTON_WIDTH + '" height="' + HS_PERSON_BUTTON_HEIGHT + '" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
        '</a>'

      OrgChart.templates[templateName]["field_" + (fieldBase + 4)] =
        '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
        '<rect x="' + (fieldX + 36 + HS_PERSON_BUTTON_WIDTH + HS_PERSON_BUTTON_GAP) + '" y="' + (fieldY + 166) + '" width="' + HS_PERSON_BUTTON_WIDTH + '" height="' + HS_PERSON_BUTTON_HEIGHT + '" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
        '</a>'

      OrgChart.templates[templateName]["field_" + (fieldBase + 5)] =
        '<rect class="hs-team-member-click" data-member-id="{val}" x="' + (fieldX + 18) + '" y="' + (fieldY + 98) + '" width="' + (cardWidth - 36) + '" height="62" fill="#ffffff" opacity="0.01" style="pointer-events:all;cursor:pointer;"></rect>'
    } else {

      OrgChart.templates[templateName]["img_" + fieldImageBase] = ''
      OrgChart.templates[templateName]["field_" + (fieldBase + 1)] = ''
      OrgChart.templates[templateName]["field_" + (fieldBase + 2)] = ''
      OrgChart.templates[templateName]["field_" + (fieldBase + 3)] = ''
      OrgChart.templates[templateName]["field_" + (fieldBase + 4)] = ''
      OrgChart.templates[templateName]["field_" + (fieldBase + 5)] = ''
    }
    for (var employeeFieldIndex = 1; employeeFieldIndex <= fieldEmployeeCount; employeeFieldIndex++) {
      var employeeFieldY = fieldY + cardHeaderHeight + (fieldHideLeader ? 0 : leaderHeight) + (employeeFieldIndex - 1) * employeeHeight
      var employeeBase = fieldBase + 10 + (employeeFieldIndex - 1) * 5

      OrgChart.templates[templateName].defs +=
        '<clipPath id="' + templateName + '_card_' + slot + '_emp_' + employeeFieldIndex + '_circle">' +
        '<circle cx="' + (fieldX + 60) + '" cy="' + (employeeFieldY + 34) + '" r="28"></circle>' +
        '</clipPath>'

      OrgChart.templates[templateName]["img_" + (fieldImageBase + employeeFieldIndex)] =
        '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#' + templateName + '_card_' + slot + '_emp_' + employeeFieldIndex + '_circle)" xlink:href="{val}" x="' + (fieldX + 32) + '" y="' + (employeeFieldY + 6) + '" width="56" height="56"></image>'

      OrgChart.templates[templateName]["field_" + employeeBase] =
        '<text data-width="190" data-text-overflow="ellipsis" style="font-size:15px;font-weight:900;" fill="#0b2341" x="' + (fieldX + 122) + '" y="' + (employeeFieldY + 28) + '">{val}</text>'

      OrgChart.templates[templateName]["field_" + (employeeBase + 1)] =
        '<text data-width="190" data-text-overflow="ellipsis" style="font-size:11px;font-weight:700;" fill="#0a6ed1" x="' + (fieldX + 122) + '" y="' + (employeeFieldY + 50) + '">{val}</text>'

      OrgChart.templates[templateName]["field_" + (employeeBase + 2)] =
        '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
        '<rect x="' + (fieldX + 36) + '" y="' + (employeeFieldY + 68) + '" width="' + HS_PERSON_BUTTON_WIDTH + '" height="' + HS_PERSON_BUTTON_HEIGHT + '" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
        '</a>'

      OrgChart.templates[templateName]["field_" + (employeeBase + 3)] =
        '<a class="hs-card-action-link" xlink:href="{val}" target="_blank">' +
        '<rect x="' + (fieldX + 36 + HS_PERSON_BUTTON_WIDTH + HS_PERSON_BUTTON_GAP) + '" y="' + (employeeFieldY + 68) + '" width="' + HS_PERSON_BUTTON_WIDTH + '" height="' + HS_PERSON_BUTTON_HEIGHT + '" rx="11" ry="11" fill="#ffffff" opacity="0.01" style="cursor:pointer;pointer-events:all;"></rect>' +
        '</a>'

      OrgChart.templates[templateName]["field_" + (employeeBase + 4)] =
        '<rect class="hs-team-member-click" data-member-id="{val}" x="' + (fieldX + 18) + '" y="' + employeeFieldY + '" width="' + (cardWidth - 36) + '" height="62" fill="#ffffff" opacity="0.01" style="pointer-events:all;cursor:pointer;"></rect>'
    }
  }

  OrgChart.templates[templateName].link =
    '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
    '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'
}


OrgChart.templates.ula_custom_root_unit = Object.assign({}, OrgChart.templates.ula_custom_unit)
OrgChart.templates.ula_custom_root_unit.size = [350, 162]

OrgChart.templates.ula_custom_root_unit.node =
  '<g>' +
  '<rect x="0" y="12" width="350" height="150" rx="18" ry="18" fill="#0a6ed1" stroke="#085caf" stroke-width="1.2" filter="url(#ula_custom_emp_shadow)"></rect>' +
  '</g>'

OrgChart.templates.ula_custom_root_unit.img_0 = ''
OrgChart.templates.ula_custom_root_unit.field_0 = OrgChart.templates.ula_custom_unit.field_0
OrgChart.templates.ula_custom_root_unit.field_1 = OrgChart.templates.ula_custom_unit.field_1
OrgChart.templates.ula_custom_root_unit.field_2 = ''
OrgChart.templates.ula_custom_root_unit.field_3 = ''
OrgChart.templates.ula_custom_root_unit.field_4 = ''
OrgChart.templates.ula_custom_root_unit.field_5 = ''

OrgChart.templates.ula_custom_root_unit.link =
  '<path stroke="#bfd0e2" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
  '<path stroke="#7fa7d6" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'
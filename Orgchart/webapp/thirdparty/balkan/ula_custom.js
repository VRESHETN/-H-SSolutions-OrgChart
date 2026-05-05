OrgChart.templates.ula_custom_emp = Object.assign({}, OrgChart.templates.ula)
OrgChart.templates.ula_custom_emp.size = [320, 205]

OrgChart.templates.ula_custom_emp.defs =
  '<filter id="ula_custom_emp_shadow" x="-20%" y="-20%" width="160%" height="160%">' +
  '<feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#1f2937" flood-opacity="0.14"></feDropShadow>' +
  '</filter>' +
  '<clipPath id="ula_custom_emp_circle">' +
  '<circle cx="52" cy="52" r="34"></circle>' +
  '</clipPath>'

OrgChart.templates.ula_custom_emp.node =
  '<g>' +
  '<rect x="0" y="0" width="320" height="205" rx="18" ry="18" fill="#ffffff" stroke="#d7e0ea" stroke-width="1.2" filter="url(#ula_custom_emp_shadow)"></rect>' +
  '<rect x="0" y="0" width="320" height="8" rx="18" ry="18" fill="#0a6ed1"></rect>' +
  '<rect x="14" y="14" width="292" height="102" rx="14" ry="14" fill="#ffffff" stroke="#e7eef5" stroke-width="1"></rect>' +
  '<rect x="18" y="18" width="68" height="68" rx="34" ry="34" fill="#edf4ff"></rect>' +
  '<rect x="14" y="130" width="90" height="42" rx="12" ry="12" fill="#edf5ff" stroke="#d6e9ff" stroke-width="1.2"></rect>' +
  '<rect x="115" y="130" width="90" height="42" rx="12" ry="12" fill="#f3f6fa" stroke="#e1e8f0" stroke-width="1.2"></rect>' +
  '<rect x="216" y="130" width="90" height="42" rx="12" ry="12" fill="#eefbf3" stroke="#d6f2df" stroke-width="1.2"></rect>' +
  '<rect x="14" y="178" width="292" height="14" rx="7" ry="7" fill="#f8fbff" stroke="#eef3f8" stroke-width="1"></rect>' +
  '</g>'

OrgChart.templates.ula_custom_emp.img_0 =
  '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ula_custom_emp_circle)" xlink:href="{val}" x="18" y="18" width="68" height="68"></image>'

OrgChart.templates.ula_custom_emp.field_0 =
  '<text data-width="200" data-text-overflow="multiline" style="font-size:18px;font-weight:700;" fill="#102a43" x="98" y="42">{val}</text>'

OrgChart.templates.ula_custom_emp.field_1 =
  '<text data-width="200" data-text-overflow="ellipsis" style="font-size:13px;font-weight:600;" fill="#0a6ed1" x="98" y="88">{val}</text>'

OrgChart.templates.ula_custom_emp.field_2 = ''

OrgChart.templates.ula_custom_emp.field_3 =
  '<text data-width="74" data-text-overflow="ellipsis" style="font-size:10px;font-weight:700;" fill="#245b93" x="59" y="146" text-anchor="middle">{val}</text>'

OrgChart.templates.ula_custom_emp.field_4 =
  '<text data-width="74" data-text-overflow="ellipsis" style="font-size:10px;font-weight:700;" fill="#52606d" x="160" y="146" text-anchor="middle">{val}</text>'

OrgChart.templates.ula_custom_emp.field_5 =
  '<text data-width="74" data-text-overflow="ellipsis" style="font-size:10px;font-weight:700;" fill="#1f7a45" x="261" y="146" text-anchor="middle">{val}</text>'

OrgChart.templates.ula_custom_emp.link =
  '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
  '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'

OrgChart.templates.ula_custom_emp_noskills = Object.assign({}, OrgChart.templates.ula_custom_emp)
OrgChart.templates.ula_custom_emp_noskills.size = [320, 120]

OrgChart.templates.ula_custom_emp_noskills.node =
  '<g>' +
  '<rect x="0" y="0" width="320" height="120" rx="18" ry="18" fill="#ffffff" stroke="#d7e0ea" stroke-width="1.2" filter="url(#ula_custom_emp_shadow)"></rect>' +
  '<rect x="0" y="0" width="320" height="8" rx="18" ry="18" fill="#0a6ed1"></rect>' +
  '<rect x="14" y="14" width="292" height="92" rx="14" ry="14" fill="#ffffff" stroke="#e7eef5" stroke-width="1"></rect>' +
  '<rect x="18" y="18" width="68" height="68" rx="34" ry="34" fill="#edf4ff"></rect>' +
  '</g>'

OrgChart.templates.ula_custom_emp_noskills.img_0 =
  '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ula_custom_emp_circle)" xlink:href="{val}" x="18" y="18" width="68" height="68"></image>'

OrgChart.templates.ula_custom_emp_noskills.field_0 =
  '<text data-width="200" data-text-overflow="multiline" style="font-size:18px;font-weight:700;" fill="#102a43" x="98" y="42">{val}</text>'

OrgChart.templates.ula_custom_emp_noskills.field_1 =
  '<text data-width="200" data-text-overflow="ellipsis" style="font-size:13px;font-weight:600;" fill="#0a6ed1" x="98" y="66">{val}</text>'

OrgChart.templates.ula_custom_emp_noskills.field_2 = ''
OrgChart.templates.ula_custom_emp_noskills.field_3 = ''
OrgChart.templates.ula_custom_emp_noskills.field_4 = ''
OrgChart.templates.ula_custom_emp_noskills.field_5 = ''
OrgChart.templates.ula_custom_emp_noskills.link = OrgChart.templates.ula_custom_emp.link

OrgChart.templates.ula_custom_unit = Object.assign({}, OrgChart.templates.ula_custom_emp)
OrgChart.templates.ula_custom_unit.size = [320, 120]

OrgChart.templates.ula_custom_unit.node =
  '<g>' +
  '<rect x="0" y="0" width="320" height="120" rx="18" ry="18" fill="#245b93" stroke="#1e4b79" stroke-width="1.2" filter="url(#ula_custom_emp_shadow)"></rect>' +
  '</g>'

OrgChart.templates.ula_custom_unit.img_0 = ''

OrgChart.templates.ula_custom_unit.field_0 =
  '<text data-width="272" data-text-overflow="multiline" style="font-size:18px;font-weight:700;" fill="#ffffff" x="24" y="42">{val}</text>'

OrgChart.templates.ula_custom_unit.field_1 =
  '<text data-width="272" data-text-overflow="ellipsis" style="font-size:13px;font-weight:500;" fill="#dbe8f5" x="24" y="68">{val}</text>'

OrgChart.templates.ula_custom_unit.field_2 = ''
OrgChart.templates.ula_custom_unit.field_3 = ''
OrgChart.templates.ula_custom_unit.field_4 = ''
OrgChart.templates.ula_custom_unit.field_5 = ''

OrgChart.templates.ula_custom_unit.link =
  '<path stroke="#bfd0e2" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
  '<path stroke="#7fa7d6" stroke-width="2.8" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'

OrgChart.templates.ula_custom_pos = Object.assign({}, OrgChart.templates.ula_custom_emp)
OrgChart.templates.ula_custom_pos.size = [320, 120]

OrgChart.templates.ula_custom_pos.node =
  '<g>' +
  '<rect x="0" y="0" width="320" height="120" rx="18" ry="18" fill="#eef4ff" stroke="#c8d7eb" stroke-width="1.2" filter="url(#ula_custom_emp_shadow)"></rect>' +
  '<rect x="0" y="0" width="320" height="8" rx="18" ry="18" fill="#7da6f7"></rect>' +
  '</g>'

OrgChart.templates.ula_custom_pos.img_0 = ''

OrgChart.templates.ula_custom_pos.field_0 =
  '<text data-width="272" data-text-overflow="multiline" style="font-size:18px;font-weight:700;" fill="#16324f" x="24" y="42">{val}</text>'

OrgChart.templates.ula_custom_pos.field_1 =
  '<text data-width="272" data-text-overflow="ellipsis" style="font-size:13px;font-weight:600;" fill="#0a6ed1" x="24" y="68">{val}</text>'

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
  var width = 430
  var headerHeight = 96
  var rowHeight = 138
  var footer = 18
  var imageSize = 56
  var imageRadius = 28
  var height = headerHeight + memberCount * rowHeight + footer

  OrgChart.templates[templateName] = Object.assign({}, OrgChart.templates.ula)
  OrgChart.templates[templateName].size = [width, height]

  var defs = ''

  for (var clipIndex = 0; clipIndex < memberCount; clipIndex++) {
    var clipY = headerHeight + clipIndex * rowHeight + 14

    defs +=
      '<clipPath id="' + templateName + '_circle_' + clipIndex + '">' +
      '<circle cx="' + (32 + imageRadius) + '" cy="' + (clipY + imageRadius) + '" r="' + imageRadius + '"></circle>' +
      '</clipPath>'
  }

  OrgChart.templates[templateName].defs = defs

  var node =
    '<g>' +
    '<rect x="0" y="0" width="' + width + '" height="' + height + '" rx="20" ry="20" fill="#ffffff" stroke="#0a6ed1" stroke-width="7" filter="url(#ula_custom_emp_shadow)"></rect>' +
    '<rect x="0" y="0" width="' + width + '" height="78" rx="20" ry="20" fill="#0a6ed1"></rect>' +
    '<rect x="0" y="56" width="' + width + '" height="24" fill="#0a6ed1"></rect>'

  for (var row = 0; row < memberCount; row++) {
    var y = headerHeight + row * rowHeight

    node +=
      '<rect x="18" y="' + y + '" width="394" height="128" rx="16" ry="16" fill="#ffffff" stroke="#d7e0ea" stroke-width="1.2"></rect>' +
      '<circle cx="60" cy="' + (y + 42) + '" r="28" fill="#edf4ff"></circle>'
    // '<rect x="30" y="' + (y + 82) + '" width="96" height="34" rx="10" ry="10" fill="#edf5ff" stroke="#d6e9ff" stroke-width="1"></rect>' +
    // '<rect x="138" y="' + (y + 82) + '" width="96" height="34" rx="10" ry="10" fill="#f3f6fa" stroke="#e1e8f0" stroke-width="1"></rect>' +
    // '<rect x="246" y="' + (y + 82) + '" width="96" height="34" rx="10" ry="10" fill="#eefbf3" stroke="#d6f2df" stroke-width="1"></rect>'
  }

  node += '</g>'

  OrgChart.templates[templateName].node = node

  OrgChart.templates[templateName].field_0 =
    '<text data-width="370" data-text-overflow="ellipsis" style="font-size:18px;font-weight:800;" fill="#ffffff" x="215" y="32" text-anchor="middle">{val}</text>'

  OrgChart.templates[templateName].field_1 =
    '<text data-width="370" data-text-overflow="ellipsis" style="font-size:12px;font-weight:600;" fill="#eaf4ff" x="215" y="56" text-anchor="middle">{val}</text>'

  OrgChart.templates[templateName].img_0 = ''

  OrgChart.templates[templateName].img_1 =
    '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#' + templateName + '_circle_0)" xlink:href="{val}" x="32" y="110" width="' + imageSize + '" height="' + imageSize + '"></image>'

  OrgChart.templates[templateName].field_6 =
    '<text data-width="238" data-text-overflow="ellipsis" style="font-size:15px;font-weight:800;" fill="#102a43" x="104" y="132">{val}</text>'

  OrgChart.templates[templateName].field_7 =
    '<text data-width="238" data-text-overflow="ellipsis" style="font-size:11px;font-weight:600;" fill="#0a6ed1" x="104" y="154">{val}</text>'

  OrgChart.templates[templateName].field_8 =
    '<rect x="30" y="178" width="96" height="34" rx="10" ry="10" fill="#edf5ff" stroke="#d6e9ff" stroke-width="1" opacity="{val}"></rect>'

  OrgChart.templates[templateName].field_9 =
    '<rect x="138" y="178" width="96" height="34" rx="10" ry="10" fill="#f3f6fa" stroke="#e1e8f0" stroke-width="1" opacity="{val}"></rect>'

  OrgChart.templates[templateName].field_11 =
    '<rect x="246" y="178" width="96" height="34" rx="10" ry="10" fill="#eefbf3" stroke="#d6f2df" stroke-width="1" opacity="{val}"></rect>'

  OrgChart.templates[templateName].field_13 =
    '<text data-width="82" data-text-overflow="ellipsis" style="font-size:9px;font-weight:700;" fill="#245b93" x="78" y="202" text-anchor="middle">{val}</text>'

  OrgChart.templates[templateName].field_14 =
    '<text data-width="82" data-text-overflow="ellipsis" style="font-size:9px;font-weight:700;" fill="#52606d" x="186" y="202" text-anchor="middle">{val}</text>'

  OrgChart.templates[templateName].field_15 =
    '<text data-width="82" data-text-overflow="ellipsis" style="font-size:9px;font-weight:700;" fill="#1f7a45" x="294" y="202" text-anchor="middle">{val}</text>'

  for (var index = 1; index <= memberCount - 1; index++) {
    var base = 20 + (index - 1) * 9
    var imageIndex = index + 1
    var rowY = headerHeight + index * rowHeight

    OrgChart.templates[templateName]["img_" + imageIndex] =
      '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#' + templateName + '_circle_' + index + ')" xlink:href="{val}" x="32" y="' + (rowY + 14) + '" width="' + imageSize + '" height="' + imageSize + '"></image>'

    OrgChart.templates[templateName]["field_" + base] =
      '<text data-width="238" data-text-overflow="ellipsis" style="font-size:15px;font-weight:800;" fill="#102a43" x="104" y="' + (rowY + 36) + '">{val}</text>'

    OrgChart.templates[templateName]["field_" + (base + 1)] =
      '<text data-width="238" data-text-overflow="ellipsis" style="font-size:11px;font-weight:600;" fill="#0a6ed1" x="104" y="' + (rowY + 58) + '">{val}</text>'

    OrgChart.templates[templateName]["field_" + (base + 2)] =
      '<rect x="30" y="' + (rowY + 82) + '" width="96" height="34" rx="10" ry="10" fill="#edf5ff" stroke="#d6e9ff" stroke-width="1" opacity="{val}"></rect>'

    OrgChart.templates[templateName]["field_" + (base + 3)] =
      '<rect x="138" y="' + (rowY + 82) + '" width="96" height="34" rx="10" ry="10" fill="#f3f6fa" stroke="#e1e8f0" stroke-width="1" opacity="{val}"></rect>'

    OrgChart.templates[templateName]["field_" + (base + 4)] =
      '<rect x="246" y="' + (rowY + 82) + '" width="96" height="34" rx="10" ry="10" fill="#eefbf3" stroke="#d6f2df" stroke-width="1" opacity="{val}"></rect>'

    OrgChart.templates[templateName]["field_" + (base + 6)] =
      '<text data-width="82" data-text-overflow="ellipsis" style="font-size:9px;font-weight:700;" fill="#245b93" x="78" y="' + (rowY + 106) + '" text-anchor="middle">{val}</text>'

    OrgChart.templates[templateName]["field_" + (base + 7)] =
      '<text data-width="82" data-text-overflow="ellipsis" style="font-size:9px;font-weight:700;" fill="#52606d" x="186" y="' + (rowY + 106) + '" text-anchor="middle">{val}</text>'

    OrgChart.templates[templateName]["field_" + (base + 8)] =
      '<text data-width="82" data-text-overflow="ellipsis" style="font-size:9px;font-weight:700;" fill="#1f7a45" x="294" y="' + (rowY + 106) + '" text-anchor="middle">{val}</text>'
  }

  OrgChart.templates[templateName].link =
    '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
    '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'
}
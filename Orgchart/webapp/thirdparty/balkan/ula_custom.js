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

OrgChart.templates.ula_custom_emp_noskills.link =
  '<path stroke="#dbe5f0" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
  '<path stroke="#9fb6cc" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'

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

OrgChart.templates.ula_custom_team = Object.assign({}, OrgChart.templates.ula)
OrgChart.templates.ula_custom_team.size = [420, 80]

OrgChart.templates.ula_custom_team.node =
  '<g>' +
    '<rect x="0" y="0" width="420" height="80" rx="18" ry="18" fill="#f8fbff" stroke="#bcd0e5" stroke-width="2" stroke-dasharray="7,4" filter="url(#ula_custom_emp_shadow)"></rect>' +
    '<rect x="0" y="0" width="420" height="8" rx="18" ry="18" fill="#7da6f7"></rect>' +
  '</g>'

OrgChart.templates.ula_custom_team.img_0 = ''

OrgChart.templates.ula_custom_team.field_0 =
  '<text data-width="360" data-text-overflow="ellipsis" style="font-size:18px;font-weight:700;" fill="#16324f" x="30" y="34">{val}</text>'

OrgChart.templates.ula_custom_team.field_1 =
  '<text data-width="360" data-text-overflow="ellipsis" style="font-size:12px;font-weight:600;" fill="#5b748c" x="30" y="56">{val}</text>'

OrgChart.templates.ula_custom_team.field_2 = ''
OrgChart.templates.ula_custom_team.field_3 = ''
OrgChart.templates.ula_custom_team.field_4 = ''
OrgChart.templates.ula_custom_team.field_5 = ''

OrgChart.templates.ula_custom_team.link =
  '<path stroke="#d7e3f2" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>' +
  '<path stroke="#9ebae6" stroke-width="2.7" fill="none" stroke-linecap="round" stroke-linejoin="round" d="{rounded}"></path>'
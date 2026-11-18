'use strict';
// NS Script Atlas core: header tags, define modules, entry points, governance risks and version compatibility of SuiteScript 2.x files.
function parseHeader(text) {
  const s = String(text || ''); const re = /\/\*\*([\s\S]*?)\*\//g; let m;
  while ((m = re.exec(s))) {
    if (/@NApiVersion\b/.test(m[1])) { const g = (t) => { const x = new RegExp('@' + t + '\\s+(\\S+)').exec(m[1]); return x ? x[1] : ''; };
      return { apiVersion: g('NApiVersion'), scriptType: g('NScriptType'), moduleScope: g('NModuleScope') }; }
  }
  return { apiVersion: '', scriptType: '', moduleScope: '' };
}
function headerLine(text, tag) { const ls = String(text || '').split('\n'); for (let i = 0; i < ls.length; i++) if (ls[i].includes('@' + tag)) return i + 1; return 0; }
function parseModules(text) {
  const s = String(text || ''); const m = /define\s*\(\s*\[([\s\S]*?)\]\s*,\s*(?:function\s*\w*\s*\(([^)]*)\)|\(([^)]*)\)\s*=>|(\w+)\s*=>)/.exec(s);
  if (!m) return [];
  const mods = [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1]);
  const ps = (m[2] !== undefined ? m[2] : m[3] !== undefined ? m[3] : m[4] || '').split(',').map((x) => x.trim()).filter(Boolean);
  return mods.map((mod, i) => ({ module: mod, variable: ps[i] || '' }));
}
function exportedNames(text) {
  const s = blank(String(text || '')); const i = s.lastIndexOf('return {'); if (i < 0) return [];
  let d = 0, j = i + 'return '.length, body = '';
  for (; j < s.length; j++) { const c = s[j]; if (c === '{') { d++; if (d === 1) continue; } if (c === '}') { d--; if (d === 0) break; } if (d === 1) body += c; else body += ' '; }
  return body.split(',').map((p) => p.trim()).filter(Boolean).map((p) => (/^([A-Za-z_$][\w$]*)/.exec(p) || [])[1]).filter(Boolean);
}
const EP = { UserEventScript: ['beforeLoad', 'beforeSubmit', 'afterSubmit'],
  ClientScript: ['pageInit', 'fieldChanged', 'postSourcing', 'sublistChanged', 'lineInit', 'validateField', 'validateLine', 'validateInsert', 'validateDelete', 'saveRecord', 'localizationContextEnter', 'localizationContextExit'],
  ScheduledScript: ['execute'], MapReduceScript: ['getInputData', 'map', 'reduce', 'summarize'], Suitelet: ['onRequest'], Restlet: ['get', 'put', 'post', 'delete'], Portlet: ['render'],
  MassUpdateScript: ['each'], WorkflowActionScript: ['onAction'], BundleInstallationScript: ['beforeInstall', 'afterInstall', 'beforeUpdate', 'afterUpdate', 'beforeUninstall'], SDFInstallationScript: ['run'] };
function entryPointsFor(t) { return Object.prototype.hasOwnProperty.call(EP, t) ? EP[t].slice() : []; }
// Comments and string contents -> spaces, newlines kept. Built from slices (a 50 MB file built one character at a time
// would exhaust memory); the output is the same as reading character by character.
const spaces = (t) => t.replace(/[^\n]/g, ' ');
function blank(s) {
  const out = []; let i = 0; const n = s.length; const SPECIAL = /[\/'"`]/g;
  // next position of each quote character and of a backslash, kept for the whole scan (positions only move forward)
  const next = { "'": -2, '"': -2, '`': -2, '\\': -2 };
  const nextOf = (ch, from) => { if (next[ch] !== -1 && next[ch] < from) next[ch] = s.indexOf(ch, from); return next[ch] < 0 ? n : next[ch]; };
  while (i < n) {
    SPECIAL.lastIndex = i; const m = SPECIAL.exec(s);
    const j = m ? m.index : n;
    if (j > i) { out.push(s.slice(i, j)); i = j; if (i >= n) break; }
    const c = s[i], d = s[i + 1];
    if (c === '/' && d === '/') { const e = s.indexOf('\n', i); const end = e < 0 ? n : e; out.push(' '.repeat(end - i)); i = end; continue; }
    if (c === '/' && d === '*') { out.push('  '); i += 2; const e = s.indexOf('*/', i); const end = e < 0 ? n : e; if (end > i) out.push(spaces(s.slice(i, end))); i = end; out.push('  '); i += 2; continue; }
    if (c === "'" || c === '"' || c === '`') {
      out.push(c); i++;
      while (i < n && s[i] !== c) {
        const stop = Math.min(nextOf(c, i), nextOf('\\', i));
        if (stop > i) { out.push(spaces(s.slice(i, stop))); i = stop; continue; }
        if (s[i] === '\\') { out.push('  '); i += 2; }
      }
      out.push(c); i++; continue;
    }
    out.push(c); i++;
  }
  return out.join('');
}
const isSS = (text) => !!parseHeader(text).apiVersion || /\bdefine\s*\(/.test(String(text || ''));
const NOT = (t) => '# ' + t + '\n\nThis file is not a SuiteScript 2.x script (no @NApiVersion tag or define call).';
const pl = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');
const esc = (s) => String(s).replace(/[\r\n]+/g, ' ').replace(/([\\`*_{}\[\]()#+!|<>~&$])/g, '\\$1')
  .split('://').join('\\:\\/\\/').replace(/(^|[^A-Za-z0-9])www\./gi, (m, pre) => pre + m.slice(pre.length, pre.length + 3) + '\\.');
const cell = (s) => { s = String(s == null ? '' : s); return s === '' ? '-' : esc(s); };
// Line number of a position: line starts are indexed once per text, then found by binary search (no re-splitting per finding).
let lastText = null, lastStarts = null;
function lineAt(s, idx) {
  if (s !== lastText) { lastStarts = [0]; for (let p = s.indexOf('\n'); p >= 0; p = s.indexOf('\n', p + 1)) lastStarts.push(p + 1); lastText = s; }
  let lo = 0, hi = lastStarts.length - 1;
  while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (lastStarts[mid] <= idx) lo = mid; else hi = mid - 1; }
  return lo + 1;
}
// True when position idx lies strictly inside one of the loop ranges [a, b]: ranges sorted by start, prefix maximum of the ends.
function inLoopFinder(ranges) {
  const rs = ranges.slice().sort((x, y) => x[0] - y[0]); const maxEnd = []; let mx = -1;
  for (const [, b] of rs) { mx = Math.max(mx, b); maxEnd.push(mx); }
  return (idx) => { let lo = 0, hi = rs.length - 1, j = -1; while (lo <= hi) { const mid = (lo + hi) >> 1; if (rs[mid][0] < idx) { j = mid; lo = mid + 1; } else hi = mid - 1; } return j >= 0 && maxEnd[j] > idx; };
}
function reportSummary(text) {
  if (!isSS(text)) return NOT('Script Summary'); const h = parseHeader(text);
  const probs = []; if (!h.apiVersion) probs.push('Missing @NApiVersion.'); if (!h.scriptType) probs.push('Missing @NScriptType.');
  return '# Script Summary\n\n| Item | Value |\n| --- | --- |\n| API version | ' + cell(h.apiVersion) + ' |\n| Script type | ' + cell(h.scriptType) + ' |\n| Module scope | ' + cell(h.moduleScope) + ' |\n| Modules | ' + parseModules(text).length +
    ' |\n| Entry points | ' + cell(exportedNames(text).join(', ')) + ' |\n\n## Header problems\n\n' + (probs.length ? probs.join('\n\n') : 'No header problems.');
}
function reportEntryPoints(text) {
  if (!isSS(text)) return NOT('Entry Points'); const h = parseHeader(text); const ep = entryPointsFor(h.scriptType);
  if (!ep.length) return '# Entry Points\n\nUnknown script type ' + cell(h.scriptType) + ': entry points cannot be checked.';
  const ex = exportedNames(text); const bad = ex.filter((x) => !ep.includes(x));
  let md = '# Entry Points\n\n| Entry point | Exported |\n| --- | --- |\n' + ep.map((e) => '| ' + e + ' | ' + (ex.includes(e) ? 'yes' : 'no') + ' |').join('\n');
  if (bad.length) md += '\n\n' + bad.map((b) => esc(b) + ' is not an entry point of ' + esc(h.scriptType) + '.').join('\n\n');
  if (!ep.some((e) => ex.includes(e))) md += '\n\nNo valid entry point: NetSuite rejects this script file.';
  return md;
}
function reportModules(text) {
  if (!isSS(text)) return NOT('Modules'); const mods = parseModules(text); const code = blank(String(text)); const di = code.search(/define\s*\(/); const after = code.slice(di).replace(/^[^\n]*/, '');
  let unused = 0;
  const rows = mods.map((m) => { if (!m.variable) return '| ' + cell(m.module) + ' | - | - |'; const used = new RegExp('(^|[^\\w$])' + m.variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*[.(]').test(after); if (!used) unused++;
    return '| ' + cell(m.module) + ' | ' + cell(m.variable) + ' | ' + (used ? 'yes' : 'no') + ' |'; });
  return '# Modules\n\n' + (rows.length ? '| Module | Variable | Used |\n| --- | --- | --- |\n' + rows.join('\n') : 'No modules are imported.') + '\n\n' + (unused ? pl(unused, 'unused module') + '.' : 'Every module is used.');
}
const CALL = /\b(record\.(?:load|create|copy|delete|submitFields|transform|attach|detach)|search\.(?:load|lookupFields|delete)|https?\.(?:get|post|put|delete|request)|email\.(?:send|sendBulk))\s*\(/g;
// Index of the bracket that closes the one at position `open` (code already blanked), or the end of the code.
function closeOf(code, open) {
  const o = code[open], c = o === '(' ? ')' : '}'; let d = 0;
  for (let j = open; j < code.length; j++) { if (code[j] === o) d++; else if (code[j] === c) { d--; if (!d) return j; } }
  return code.length;
}
function loops(code) {
  const out = []; const re = /\b(for|while|do)\b|\.(forEach|each|map|filter|reduce)\s*\(/g; let m;
  while ((m = re.exec(code))) {
    if (m[2]) { const open = m.index + m[0].length - 1; out.push([m.index, closeOf(code, open)]); continue; }
    let k = m.index + m[1].length;
    if (m[1] !== 'do') {                                                   // for / while: skip the header in parentheses
      while (k < code.length && /\s/.test(code[k])) k++;
      if (code[k] !== '(') continue;
      k = closeOf(code, k) + 1;
    }
    while (k < code.length && /\s/.test(code[k])) k++;
    if (code[k] === '{') out.push([m.index, closeOf(code, k)]);
    else if (m[1] !== 'do') { const e = code.indexOf(';', k); out.push([m.index, e < 0 ? code.length : e]); }
  }
  return out;
}
function reportGovernance(text) {
  if (!isSS(text)) return NOT('Governance Risks'); const code = blank(String(text)); const f = []; const L = loops(code); let m;
  CALL.lastIndex = 0; const inLoop = inLoopFinder(L); while ((m = CALL.exec(code))) if (inLoop(m.index)) f.push([lineAt(code, m.index), 'loop_call', m[1] + ' inside a loop; every call uses governance units']);
  code.split('\n').forEach((l, i) => { const v = /\b(nlapi\w+|nlobj\w+)/.exec(l); if (v) f.push([i + 1, 'v1_api', v[1] + ' is a SuiteScript 1.0 API']); });
  const re2 = /\.run\s*\(\s*\)\s*\.each\s*\(/g; while ((m = re2.exec(code))) f.push([lineAt(code, m.index), 'each_limit', 'run().each() stops after 4000 results; use runPaged() for large searches']);
  if (!f.length) return '# Governance Risks\n\nNo governance risks found.';
  f.sort((a, b) => a[0] - b[0] || (a[1] < b[1] ? -1 : 1));
  return '# Governance Risks\n\n' + pl(f.length, 'finding') + '.\n\n| Line | Rule | Finding |\n| ---: | --- | --- |\n' + f.map((x) => '| ' + x[0] + ' | ' + x[1] + ' | ' + cell(x[2]) + ' |').join('\n');
}
function reportCompatibility(text) {
  if (!isSS(text)) return NOT('Version Compatibility'); const h = parseHeader(text); const f = [];
  if (h.moduleScope === 'Public') f.push([headerLine(text, 'NModuleScope'), 'module_scope', 'NModuleScope Public lets other accounts load this module; prefer SameAccount']);
  if (h.apiVersion === '2.0' || h.apiVersion === '2.x' || h.apiVersion === '2.X') {
    const raw = String(text); const code = blank(raw);
    const feats = [['const', /\bconst\s+[\w${[]/], ['let', /\blet\s+[\w${[]/], ['arrow function', /=>/], ['class', /\bclass\s+\w/], ['template literal', null], ['async', /\basync\b/], ['await', /\bawait\b/], ['spread', /\.\.\./], ['for...of', /\bfor\s*\([^)]*\bof\b/]];
    feats.forEach(([name, re]) => { let idx = -1; if (re) { const m = re.exec(code); if (m) idx = m.index; } else idx = code.indexOf('`'); if (idx >= 0) f.push([lineAt(code, idx), 'es2015', name + ' needs @NApiVersion 2.1']); });
  }
  if (!f.length) return '# Version Compatibility\n\nNo compatibility problems found.';
  f.sort((a, b) => a[0] - b[0] || (a[2] < b[2] ? -1 : 1));
  return '# Version Compatibility\n\n' + pl(f.length, 'finding') + '.\n\n| Line | Rule | Finding |\n| ---: | --- | --- |\n' + f.map((x) => '| ' + x[0] + ' | ' + x[1] + ' | ' + cell(x[2]) + ' |').join('\n');
}
module.exports = { parseHeader, parseModules, exportedNames, entryPointsFor, reportSummary, reportEntryPoints, reportModules, reportGovernance, reportCompatibility };

// Caps every Markdown table of a report at 500 rows and says how many there were (a 50 MB file would otherwise give a report
// too large to open). Applied to every exported report.
function capTables(md) {
  if (typeof md !== 'string') return md;
  const lines = md.split('\n'), out = [];
  for (let i = 0; i < lines.length; i++) {
    out.push(lines[i]);
    if (lines[i].startsWith('|') && /^\|[ :-]+\|/.test(lines[i + 1] || '')) {
      out.push(lines[++i]);
      let n = 0;
      while (i + 1 < lines.length && lines[i + 1].startsWith('|')) { i++; n++; if (n <= 500) out.push(lines[i]); }
      if (n > 500) { out.push(''); out.push('Showing the first 500 of ' + n + ' rows.'); }
    }
  }
  return out.join('\n');
}
for (const k of Object.keys(module.exports)) {
  if (k.startsWith('report')) { const f = module.exports[k]; module.exports[k] = function (text) { return capTables(f(text)); }; }
}

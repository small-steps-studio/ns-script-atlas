'use strict';
// Builds a SuiteScript text of about `bytes` characters for the large-file test (invented code).
function make(bytes) {
  const parts = ['/**\n * @NApiVersion 2.1\n * @NScriptType MapReduceScript\n */\ndefine(["N/record", "N/search", "N/log"], (record, search, log) => {\n']; let size = parts[0].length, i = 0;
  while (size < bytes) {
    const s = '  function step' + i + '(ids) {\n    for (let k = 0; k < ids.length; k++) {\n      const r = record.load({ type: "item", id: ids[k] }); // ' + 'x'.repeat(60) + '\n    }\n    log.debug({ title: "step ' + i + '" });\n  }\n';
    parts.push(s); size += s.length; i++;
  }
  parts.push('  return { getInputData: () => [], map: () => {}, reduce: () => {}, summarize: () => {} };\n});\n');
  return parts.join('');
}
module.exports = { make };

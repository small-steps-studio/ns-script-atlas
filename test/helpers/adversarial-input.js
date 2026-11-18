'use strict';
// Hostile and odd scripts for the adversarial test (invented; the payloads must come out as plain escaped text).
const PAY = ['x|y', '<b>y</b>', '[link](https://evil.test)', '<img src=https://evil.test/i.png>', '*b*', '_i_', '$x$', 'www.evil.test', '# h'];
const cases = [];
PAY.forEach((p, i) => {
  const id = 'v' + i;
  cases.push({ name: 'payload ' + i, text: '/**\n * @NApiVersion ' + p + '\n * @NScriptType ' + p + '\n * @NModuleScope ' + p + '\n */\ndefine([' + JSON.stringify(p) + '], function (' + id + ') {\n  return { ' + id + ': 1 };\n});\n' });
  cases.push({ name: 'payload type ' + i, text: '/**\n * @NApiVersion 2.1\n * @NScriptType UserEventScript\n */\ndefine([' + JSON.stringify(p) + '], (a) => {\n  return { _x_: 1, $y$: 2, beforeLoad: 3 };\n});\n' });
});
cases.push({ name: 'prototype names', text: '/**\n * @NApiVersion 2.0\n * @NScriptType constructor\n */\ndefine(["__proto__", "toString"], function (constructor, __proto__) {\n  return { hasOwnProperty: 1, valueOf: 2 };\n});\n' });
cases.push({ name: 'regex characters in parameters', text: 'define(["N/a", "N/b"], function (a = {}, [b], ...c) {\n  a.x(); return {};\n});\n' });
cases.push({ name: 'deep braces', text: '/**\n * @NApiVersion 2.0\n */\ndefine([], function () {\n' + 'for (;;) {'.repeat(5000) + 'record.load({});' + '}'.repeat(5000) + '\nreturn {};\n});' });
cases.push({ name: 'unclosed everything', text: '/**\n * @NApiVersion 2.1\ndefine(["N/record"], function (record) { for (var i = 0; i < 3; i++) { record.load( "' });
cases.push({ name: 'many loops', text: '/**\n * @NApiVersion 2.1\n */\ndefine(["N/record"], (record) => {\n' + 'ids.forEach((id) => record.load({ id }));\n'.repeat(5000) + 'return {};\n});' });
module.exports = { cases };

'use strict';
// Contract tests: written from the specification examples. Do not edit; fix src/core.js instead.
const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../src/core');

const plain = (v) => JSON.parse(JSON.stringify(v === undefined ? null : v));

test('core exports every specified function', () => {
  for (const n of ["parseHeader", "parseModules", "exportedNames", "entryPointsFor", "reportSummary", "reportEntryPoints", "reportModules", "reportGovernance", "reportCompatibility"]) assert.equal(typeof core[n], 'function', n);
});

test("parseHeader example 1", () => {
  assert.deepStrictEqual(plain(core.parseHeader("/**\n * @NApiVersion 2.0\n * @NScriptType UserEventScript\n * @NModuleScope Public\n */\ndefine(['N/record', 'N/search', 'N/log', 'N/runtime'], function (record, search, log, runtime) {\n    function beforeSubmit(context) {\n        var ids = [1, 2, 3];\n        ids.forEach(function (id) {\n            var rec = record.load({ type: 'customer', id: id });\n            log.debug('loaded', rec.id);\n        });\n    }\n    const afterSubmit = (context) => {\n        var r = nlapiLoadRecord('customer', 1);\n        search.create({ type: 'customer' }).run().each(function (res) { return true; });\n    };\n    return { beforeSubmit: beforeSubmit, afterSubmit: afterSubmit, onRequest: beforeSubmit };\n});\n")), {"apiVersion": "2.0", "scriptType": "UserEventScript", "moduleScope": "Public"});
});

test("parseHeader example 2", () => {
  assert.deepStrictEqual(plain(core.parseHeader("/**\n * @NApiVersion 2.x\n */\ndefine([], function () {});")), {"apiVersion": "2.x", "scriptType": "", "moduleScope": ""});
});

test("parseHeader example 3", () => {
  assert.deepStrictEqual(plain(core.parseHeader("console.log('plain script');\n")), {"apiVersion": "", "scriptType": "", "moduleScope": ""});
});

test("parseModules example 1", () => {
  assert.deepStrictEqual(plain(core.parseModules("/**\n * @NApiVersion 2.0\n * @NScriptType UserEventScript\n * @NModuleScope Public\n */\ndefine(['N/record', 'N/search', 'N/log', 'N/runtime'], function (record, search, log, runtime) {\n    function beforeSubmit(context) {\n        var ids = [1, 2, 3];\n        ids.forEach(function (id) {\n            var rec = record.load({ type: 'customer', id: id });\n            log.debug('loaded', rec.id);\n        });\n    }\n    const afterSubmit = (context) => {\n        var r = nlapiLoadRecord('customer', 1);\n        search.create({ type: 'customer' }).run().each(function (res) { return true; });\n    };\n    return { beforeSubmit: beforeSubmit, afterSubmit: afterSubmit, onRequest: beforeSubmit };\n});\n")), [{"module": "N/record", "variable": "record"}, {"module": "N/search", "variable": "search"}, {"module": "N/log", "variable": "log"}, {"module": "N/runtime", "variable": "runtime"}]);
});

test("parseModules example 2", () => {
  assert.deepStrictEqual(plain(core.parseModules("define([\"N/https\", './lib'], (https) => { return {}; });")), [{"module": "N/https", "variable": "https"}, {"module": "./lib", "variable": ""}]);
});

test("parseModules example 3", () => {
  assert.deepStrictEqual(plain(core.parseModules("console.log('plain script');\n")), []);
});

test("exportedNames example 1", () => {
  assert.deepStrictEqual(plain(core.exportedNames("/**\n * @NApiVersion 2.0\n * @NScriptType UserEventScript\n * @NModuleScope Public\n */\ndefine(['N/record', 'N/search', 'N/log', 'N/runtime'], function (record, search, log, runtime) {\n    function beforeSubmit(context) {\n        var ids = [1, 2, 3];\n        ids.forEach(function (id) {\n            var rec = record.load({ type: 'customer', id: id });\n            log.debug('loaded', rec.id);\n        });\n    }\n    const afterSubmit = (context) => {\n        var r = nlapiLoadRecord('customer', 1);\n        search.create({ type: 'customer' }).run().each(function (res) { return true; });\n    };\n    return { beforeSubmit: beforeSubmit, afterSubmit: afterSubmit, onRequest: beforeSubmit };\n});\n")), ["beforeSubmit", "afterSubmit", "onRequest"]);
});

test("exportedNames example 2", () => {
  assert.deepStrictEqual(plain(core.exportedNames("define([], function () { return { execute, run: go }; });")), ["execute", "run"]);
});

test("exportedNames example 3", () => {
  assert.deepStrictEqual(plain(core.exportedNames("console.log('plain script');\n")), []);
});

test("entryPointsFor example 1", () => {
  assert.deepStrictEqual(plain(core.entryPointsFor("UserEventScript")), ["beforeLoad", "beforeSubmit", "afterSubmit"]);
});

test("entryPointsFor example 2", () => {
  assert.deepStrictEqual(plain(core.entryPointsFor("Suitelet")), ["onRequest"]);
});

test("entryPointsFor example 3", () => {
  assert.deepStrictEqual(plain(core.entryPointsFor("Thing")), []);
});

test("reportSummary example 1", () => {
  const md = core.reportSummary("/**\n * @NApiVersion 2.0\n * @NScriptType UserEventScript\n * @NModuleScope Public\n */\ndefine(['N/record', 'N/search', 'N/log', 'N/runtime'], function (record, search, log, runtime) {\n    function beforeSubmit(context) {\n        var ids = [1, 2, 3];\n        ids.forEach(function (id) {\n            var rec = record.load({ type: 'customer', id: id });\n            log.debug('loaded', rec.id);\n        });\n    }\n    const afterSubmit = (context) => {\n        var r = nlapiLoadRecord('customer', 1);\n        search.create({ type: 'customer' }).run().each(function (res) { return true; });\n    };\n    return { beforeSubmit: beforeSubmit, afterSubmit: afterSubmit, onRequest: beforeSubmit };\n});\n");
  assert.equal(typeof md, 'string');
  for (const s of ["# Script Summary", "| API version | 2.0 |", "| Script type | UserEventScript |", "| Module scope | Public |", "| Modules | 4 |", "| Entry points | beforeSubmit, afterSubmit, onRequest |", "No header problems."]) assert.ok(md.includes(s), 'missing: ' + s);
});

test("reportSummary example 2", () => {
  const md = core.reportSummary("console.log('plain script');\n");
  assert.equal(typeof md, 'string');
  for (const s of ["# Script Summary", "This file is not a SuiteScript 2.x script"]) assert.ok(md.includes(s), 'missing: ' + s);
});

test("reportEntryPoints example 1", () => {
  const md = core.reportEntryPoints("/**\n * @NApiVersion 2.0\n * @NScriptType UserEventScript\n * @NModuleScope Public\n */\ndefine(['N/record', 'N/search', 'N/log', 'N/runtime'], function (record, search, log, runtime) {\n    function beforeSubmit(context) {\n        var ids = [1, 2, 3];\n        ids.forEach(function (id) {\n            var rec = record.load({ type: 'customer', id: id });\n            log.debug('loaded', rec.id);\n        });\n    }\n    const afterSubmit = (context) => {\n        var r = nlapiLoadRecord('customer', 1);\n        search.create({ type: 'customer' }).run().each(function (res) { return true; });\n    };\n    return { beforeSubmit: beforeSubmit, afterSubmit: afterSubmit, onRequest: beforeSubmit };\n});\n");
  assert.equal(typeof md, 'string');
  for (const s of ["# Entry Points", "| beforeLoad | no |", "| beforeSubmit | yes |", "| afterSubmit | yes |", "onRequest is not an entry point of UserEventScript."]) assert.ok(md.includes(s), 'missing: ' + s);
});

test("reportEntryPoints example 2", () => {
  const md = core.reportEntryPoints("/**\n * @NApiVersion 2.1\n * @NScriptType Suitelet\n */\ndefine([], () => { return { execute: go }; });");
  assert.equal(typeof md, 'string');
  for (const s of ["| onRequest | no |", "execute is not an entry point of Suitelet.", "No valid entry point: NetSuite rejects this script file."]) assert.ok(md.includes(s), 'missing: ' + s);
});

test("reportEntryPoints example 3", () => {
  const md = core.reportEntryPoints("console.log('plain script');\n");
  assert.equal(typeof md, 'string');
  for (const s of ["# Entry Points", "This file is not a SuiteScript 2.x script"]) assert.ok(md.includes(s), 'missing: ' + s);
});

test("reportModules example 1", () => {
  const md = core.reportModules("/**\n * @NApiVersion 2.0\n * @NScriptType UserEventScript\n * @NModuleScope Public\n */\ndefine(['N/record', 'N/search', 'N/log', 'N/runtime'], function (record, search, log, runtime) {\n    function beforeSubmit(context) {\n        var ids = [1, 2, 3];\n        ids.forEach(function (id) {\n            var rec = record.load({ type: 'customer', id: id });\n            log.debug('loaded', rec.id);\n        });\n    }\n    const afterSubmit = (context) => {\n        var r = nlapiLoadRecord('customer', 1);\n        search.create({ type: 'customer' }).run().each(function (res) { return true; });\n    };\n    return { beforeSubmit: beforeSubmit, afterSubmit: afterSubmit, onRequest: beforeSubmit };\n});\n");
  assert.equal(typeof md, 'string');
  for (const s of ["# Modules", "| N/record | record | yes |", "| N/runtime | runtime | no |", "1 unused module."]) assert.ok(md.includes(s), 'missing: ' + s);
});

test("reportModules example 2", () => {
  const md = core.reportModules("console.log('plain script');\n");
  assert.equal(typeof md, 'string');
  for (const s of ["# Modules", "This file is not a SuiteScript 2.x script"]) assert.ok(md.includes(s), 'missing: ' + s);
});

test("reportGovernance example 1", () => {
  const md = core.reportGovernance("/**\n * @NApiVersion 2.0\n * @NScriptType UserEventScript\n * @NModuleScope Public\n */\ndefine(['N/record', 'N/search', 'N/log', 'N/runtime'], function (record, search, log, runtime) {\n    function beforeSubmit(context) {\n        var ids = [1, 2, 3];\n        ids.forEach(function (id) {\n            var rec = record.load({ type: 'customer', id: id });\n            log.debug('loaded', rec.id);\n        });\n    }\n    const afterSubmit = (context) => {\n        var r = nlapiLoadRecord('customer', 1);\n        search.create({ type: 'customer' }).run().each(function (res) { return true; });\n    };\n    return { beforeSubmit: beforeSubmit, afterSubmit: afterSubmit, onRequest: beforeSubmit };\n});\n");
  assert.equal(typeof md, 'string');
  for (const s of ["# Governance Risks", "3 findings.", "| 10 | loop_call | record.load inside a loop; every call uses governance units |", "| 15 | v1_api | nlapiLoadRecord is a SuiteScript 1.0 API |", "| 16 | each_limit | run\\(\\).each\\(\\) stops after 4000 results; use runPaged\\(\\) for large searches |"]) assert.ok(md.includes(s), 'missing: ' + s);
});

test("reportGovernance example 2", () => {
  const md = core.reportGovernance("console.log('plain script');\n");
  assert.equal(typeof md, 'string');
  for (const s of ["# Governance Risks", "This file is not a SuiteScript 2.x script"]) assert.ok(md.includes(s), 'missing: ' + s);
});

test("reportGovernance example 3", () => {
  const md = core.reportGovernance("/**\n * @NApiVersion 2.1\n * @NScriptType ScheduledScript\n */\ndefine(['N/record'], (record) => {\n  function execute(ctx) {\n    const ids = [1, 2, 3];\n    ids.map((id) => record.load({ type: 'customer', id: id }));\n    for (let i = 0; i < 3; i++) count++;\n    record.create({ type: 'note' });\n  }\n  return { execute };\n});\n");
  assert.equal(typeof md, 'string');
  for (const s of ["1 finding.", "| 8 | loop_call | record.load inside a loop; every call uses governance units |"]) assert.ok(md.includes(s), 'missing: ' + s);
});

test("reportCompatibility example 1", () => {
  const md = core.reportCompatibility("/**\n * @NApiVersion 2.0\n * @NScriptType UserEventScript\n * @NModuleScope Public\n */\ndefine(['N/record', 'N/search', 'N/log', 'N/runtime'], function (record, search, log, runtime) {\n    function beforeSubmit(context) {\n        var ids = [1, 2, 3];\n        ids.forEach(function (id) {\n            var rec = record.load({ type: 'customer', id: id });\n            log.debug('loaded', rec.id);\n        });\n    }\n    const afterSubmit = (context) => {\n        var r = nlapiLoadRecord('customer', 1);\n        search.create({ type: 'customer' }).run().each(function (res) { return true; });\n    };\n    return { beforeSubmit: beforeSubmit, afterSubmit: afterSubmit, onRequest: beforeSubmit };\n});\n");
  assert.equal(typeof md, 'string');
  for (const s of ["# Version Compatibility", "3 findings.", "| 4 | module_scope | NModuleScope Public lets other accounts load this module; prefer SameAccount |", "| 14 | es2015 | arrow function needs @NApiVersion 2.1 |", "| 14 | es2015 | const needs @NApiVersion 2.1 |"]) assert.ok(md.includes(s), 'missing: ' + s);
});

test("reportCompatibility example 2", () => {
  const md = core.reportCompatibility("console.log('plain script');\n");
  assert.equal(typeof md, 'string');
  for (const s of ["# Version Compatibility", "This file is not a SuiteScript 2.x script"]) assert.ok(md.includes(s), 'missing: ' + s);
});

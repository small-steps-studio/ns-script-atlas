'use strict';
// The sample files of the Open Sample commands. All data is invented for this product; it names no real company, person or system.

const SAMPLES = {
 "openSample": {
  "title": "Open Sample File",
  "fileName": "order_after_submit.js",
  "languageId": "javascript",
  "text": "/**\n * @NApiVersion 2.x\n * @NScriptType UserEventScript\n * @NModuleScope Public\n */\n// Invented example: updates related records after a sales order is saved.\ndefine(['N/record', 'N/search', 'N/email', 'N/log', 'N/format'], function (record, search, email, log, format) {\n\n  function beforeLoad(context) {\n    log.debug({ title: 'beforeLoad', details: context.type });\n  }\n\n  function afterSubmit(context) {\n    var order = context.newRecord;\n    var lineCount = order.getLineCount({ sublistId: 'item' });\n\n    for (var i = 0; i < lineCount; i++) {\n      var itemId = order.getSublistValue({ sublistId: 'item', fieldId: 'item', line: i });\n      var item = record.load({ type: record.Type.INVENTORY_ITEM, id: itemId });\n      item.setValue({ fieldId: 'custitem_last_order', value: order.id });\n      item.save();\n    }\n\n    search.create({ type: 'customer', filters: [['salesrep', 'anyof', '7']] }).run().each(function (result) {\n      email.send({ author: 7, recipients: [result.id], subject: 'New order', body: 'Thank you' });\n      return true;\n    });\n\n    const total = order.getValue({ fieldId: 'total' });\n    log.audit({ title: 'Order total', details: total });\n  }\n\n  function onSave(context) {\n    return true;\n  }\n\n  return { beforeLoad: beforeLoad, afterSubmit: afterSubmit, onSave: onSave };\n});\n"
 }
};

/** The sample with the given id, or null. */
function sampleFor(id) { return SAMPLES[id] || null; }

module.exports = { sampleFor: sampleFor, SAMPLE_IDS: Object.keys(SAMPLES) };

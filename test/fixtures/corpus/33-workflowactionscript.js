/**
 * @NApiVersion 2.x
 * @NScriptType WorkflowActionScript
 * @NModuleScope TargetAccount
 */
define(['N/https', 'N/format'], function (https, format) {
  function onAction(context) {
    var ids = [101, 102, 103];
    var resp = https.get({ url: "https://example.test/api/rates" });
    var legacy = nlapiLoadRecord("customer", 5); // old API
    const sum = ids.reduce((a, b) => a + b, 0);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { onAction };
});

/**
 * @NApiVersion 2.0
 * @NScriptType WorkflowActionScript
 * @NModuleScope SameAccount
 */
define(['N/format'], function (format) {
  function onAction(context) {
    let ids = [101, 102, 103];
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { onAction };
});

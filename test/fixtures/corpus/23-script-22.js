/**
 * @NApiVersion 2.0
 * @NScriptType Portlet
 * @NModuleScope TargetAccount
 */
define(['N/runtime', 'N/format'], function (runtime, format) {
  function render(context) {
    var ids = [101, 102, 103];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { render };
});

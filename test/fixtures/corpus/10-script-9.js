/**
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 * @NModuleScope TargetAccount
 */
define(['N/record', 'N/log', 'N/format'], function (record, log, format) {
  function pageInit(context) {
    var ids = [101, 102, 103];
    for (var i = 0; i < ids.length; i++) {
      var rec = record.load({ type: record.Type.SALES_ORDER, id: ids[i] });
      rec.save();
    }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function fieldChanged(context) {
    var ids = [101, 102, 103];
    var legacy = nlapiLoadRecord("customer", 5); // old API
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function saveRecord(context) {
    var ids = [101, 102, 103];
    record.load({ type: "customer", id: ids[0] });
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { pageInit, fieldChanged, saveRecord };
});

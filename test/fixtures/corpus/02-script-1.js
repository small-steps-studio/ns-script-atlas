/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/record', 'N/search', 'N/log', 'N/runtime', 'N/https', 'N/ui/serverWidget'], function (record, search, log, runtime, https, serverWidget) {
  function pageInit(context) {
    var ids = [101, 102, 103];
    ids.forEach(function (id) {
      record.submitFields({ type: record.Type.CUSTOMER, id: id, values: { comments: "checked" } });
    });
    while (more) {
      var res = search.lookupFields({ type: "item", id: next, columns: ["itemid"] });
      more = false;
    }
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function fieldChanged(context) {
    var ids = [101, 102, 103];
    for (var i = 0; i < 3; i++) total++;
    record.create({ type: "note" });
    var paged = search.create({ type: "item" }).runPaged({ pageSize: 1000 });
    var resp = https.get({ url: "https://example.test/api/rates" });
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function saveRecord(context) {
    var ids = [101, 102, 103];
    for (var i = 0; i < ids.length; i++) {
      var rec = record.load({ type: record.Type.SALES_ORDER, id: ids[i] });
      rec.save();
    }
    var resp = https.get({ url: "https://example.test/api/rates" });
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function validateLine(context) {
    var ids = [101, 102, 103];
    record.load({ type: "customer", id: ids[0] });
    var legacy = nlapiLoadRecord("customer", 5); // old API
    class Helper {}
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { pageInit, fieldChanged, saveRecord, validateLine };
});

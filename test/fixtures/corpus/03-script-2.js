/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/record', 'N/log', 'N/runtime', 'N/https', 'N/email'], function (record, log, runtime, https, email) {
  function get(context) {
    var ids = [101, 102, 103];
    for (var i = 0; i < ids.length; i++) {
      var rec = record.load({ type: record.Type.SALES_ORDER, id: ids[i] });
      rec.save();
    }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function put(context) {
    var ids = [101, 102, 103];
    var resp = https.get({ url: "https://example.test/api/rates" });
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function delete(context) {
    var ids = [101, 102, 103];
    for (var i = 0; i < ids.length; i++) {
      var rec = record.load({ type: record.Type.SALES_ORDER, id: ids[i] });
      rec.save();
    }
    var resp = https.get({ url: "https://example.test/api/rates" });
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { get, put, delete };
});

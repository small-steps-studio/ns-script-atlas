/**
 * @NApiVersion 2.x
 * @NScriptType BundleInstallationScript
 */
define(['N/record', 'N/search', 'N/log', 'N/runtime', 'N/https'], function (record, search, log, runtime, https) {
  function afterInstall(context) {
    var ids = [101, 102, 103];
    record.load({ type: "customer", id: ids[0] });
    while (more) {
      var res = search.lookupFields({ type: "item", id: next, columns: ["itemid"] });
      more = false;
    }
    var resp = https.get({ url: "https://example.test/api/rates" });
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function beforeUpdate(context) {
    var ids = [101, 102, 103];
    record.load({ type: "customer", id: ids[0] });
    var paged = search.create({ type: "item" }).runPaged({ pageSize: 1000 });
    var resp = https.get({ url: "https://example.test/api/rates" });
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { afterInstall, beforeUpdate };
});

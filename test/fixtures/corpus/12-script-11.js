/**
 * @NApiVersion 2.x
 * @NScriptType BundleInstallationScript
 * @NModuleScope SameAccount
 */
define(['N/search', 'N/log', 'N/runtime', 'N/email'], function (search, log, runtime, email) {
  function afterInstall(context) {
    var ids = [101, 102, 103];
    search.create({ type: "customer", filters: [], columns: ["entityid"] }).run().each(function (result) {
      count++;
      return true;
    });
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { afterInstall };
});

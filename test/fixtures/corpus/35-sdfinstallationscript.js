/**
 * @NApiVersion 2.0
 * @NScriptType SDFInstallationScript
 * @NModuleScope TargetAccount
 */
define(['N/search', 'N/format'], function (search, format) {
  function run(context) {
    var ids = [101, 102, 103];
    while (more) {
      var res = search.lookupFields({ type: "item", id: next, columns: ["itemid"] });
      more = false;
    }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { run };
});

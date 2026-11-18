/**
 * @NApiVersion 2.0
 * @NScriptType SDFInstallationScript
 */
define(['N/record', 'N/search', 'N/log', 'N/format', 'N/ui/serverWidget'], function (record, search, log, format, serverWidget) {
  function run(context) {
    let ids = [101, 102, 103];
    ids.forEach(function (id) {
      record.submitFields({ type: record.Type.CUSTOMER, id: id, values: { comments: "checked" } });
    });
    search.create({ type: "customer", filters: [], columns: ["entityid"] }).run().each(function (result) {
      count++;
      return true;
    });
    let copy = [...ids];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { run };
});

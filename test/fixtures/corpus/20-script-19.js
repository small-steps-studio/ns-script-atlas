/**
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */
define(['N/search', 'N/log', 'N/email', 'N/format'], function (search, log, email, format) {
  function onRequest(context) {
    var ids = [101, 102, 103];
    while (more) {
      var res = search.lookupFields({ type: "item", id: next, columns: ["itemid"] });
      more = false;
    }
    var legacy = nlapiLoadRecord("customer", 5); // old API
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { onRequest };
});

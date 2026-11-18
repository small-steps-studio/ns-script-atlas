/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */
define(['N/log', 'N/runtime', 'N/https', 'N/format', 'N/ui/serverWidget'], (log, runtime, https, format, serverWidget) => {
  function render(context) {
    let ids = [101, 102, 103];
    var legacy = nlapiLoadRecord("customer", 5); // old API
    let copy = [...ids];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { render };
});

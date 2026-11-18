/**
 * @NApiVersion 2.1
 * @NScriptType Portlet
 */
define(['N/record', 'N/log', 'N/email', 'N/format', 'N/ui/serverWidget'], (record, log, email, format, serverWidget) => {
  const render = (context) => {
    let ids = [101, 102, 103];
    var legacy = nlapiLoadRecord("customer", 5); // old API
    const sum = ids.reduce((a, b) => a + b, 0);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  return { render };
});

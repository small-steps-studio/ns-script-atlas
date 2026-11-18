/**
 * @NApiVersion 2.x
 * @NScriptType Portlet
 */
define(['N/log', 'N/email', 'N/ui/serverWidget'], function (log, email, serverWidget) {
  function render(context) {
    var ids = [101, 102, 103];
    let copy = [...ids];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { render };
});

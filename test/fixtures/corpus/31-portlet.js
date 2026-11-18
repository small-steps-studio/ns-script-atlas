/**
 * @NApiVersion 2.0
 * @NScriptType Portlet
 * @NModuleScope TargetAccount
 */
define(['N/record', 'N/search', 'N/log', 'N/format'], function (record, search, log, format) {
  function render(context) {
    var ids = [101, 102, 103];
    for (var i = 0; i < ids.length; i++) {
      var rec = record.load({ type: record.Type.SALES_ORDER, id: ids[i] });
      rec.save();
    }
    const label = `Order ${ids[0]}`;
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { render };
});

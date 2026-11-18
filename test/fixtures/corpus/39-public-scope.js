/**
 * @NApiVersion 2.0
 * @NScriptType SDFInstallationScript
 * @NModuleScope Public
 */
define(['N/record', 'N/log', 'N/runtime', 'N/format', 'N/ui/serverWidget'], function (record, log, runtime, format, serverWidget) {
  function run(context) {
    var ids = [101, 102, 103];
    for (var i = 0; i < ids.length; i++) {
      var rec = record.load({ type: record.Type.SALES_ORDER, id: ids[i] });
      rec.save();
    }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { run };
});

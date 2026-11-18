/**
 * @NApiVersion 2.1
 * @NScriptType SDFInstallationScript
 * @NModuleScope TargetAccount
 */
define(['N/record', 'N/runtime', 'N/email'], function (record, runtime, email) {
  const run = (context) => {
    const ids = [101, 102, 103];
    for (const i = 0; i < ids.length; i++) {
      const rec = record.load({ type: record.Type.SALES_ORDER, id: ids[i] });
      rec.save();
    }
    var legacy = nlapiLoadRecord("customer", 5); // old API
    const label = `Order ${ids[0]}`;
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  return { run };
});

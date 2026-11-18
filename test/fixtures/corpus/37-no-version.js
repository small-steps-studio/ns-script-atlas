/**
 * @NScriptType UserEventScript
 * @NModuleScope TargetAccount
 */
define(['N/record', 'N/search', 'N/runtime', 'N/email', 'N/format'], function (record, search, runtime, email, format) {
  function beforeLoad(context) {
    var ids = [101, 102, 103];
    record.load({ type: "customer", id: ids[0] });
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    var legacy = nlapiLoadRecord("customer", 5); // old API
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function afterSubmit(context) {
    var ids = [101, 102, 103];
    for (var i = 0; i < ids.length; i++) {
      var rec = record.load({ type: record.Type.SALES_ORDER, id: ids[i] });
      rec.save();
    }
    while (more) {
      var res = search.lookupFields({ type: "item", id: next, columns: ["itemid"] });
      more = false;
    }
    const sum = ids.reduce((a, b) => a + b, 0);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { beforeLoad, afterSubmit };
});

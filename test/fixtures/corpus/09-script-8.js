/**
 * @NApiVersion 2.0
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/log', 'N/runtime', 'N/email', 'N/format'], function (record, log, runtime, email, format) {
  function getInputData(context) {
    var ids = [101, 102, 103];
    ids.forEach(function (id) {
      record.submitFields({ type: record.Type.CUSTOMER, id: id, values: { comments: "checked" } });
    });
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function map(context) {
    var ids = [101, 102, 103];
    for (var i = 0; i < 3; i++) total++;
    record.create({ type: "note" });
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function summarize(context) {
    var ids = [101, 102, 103];
    ids.forEach(function (id) {
      record.submitFields({ type: record.Type.CUSTOMER, id: id, values: { comments: "checked" } });
    });
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    var legacy = nlapiLoadRecord("customer", 5); // old API
    const sum = ids.reduce((a, b) => a + b, 0);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { getInputData, map, summarize };
});

/**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 * @NModuleScope TargetAccount
 */
define(['N/runtime', 'N/https'], function (runtime, https) {
  function each(context) {
    let ids = [101, 102, 103];
    let resp = https.get({ url: "https://example.test/api/rates" });
    const sum = ids.reduce((a, b) => a + b, 0);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { each };
});

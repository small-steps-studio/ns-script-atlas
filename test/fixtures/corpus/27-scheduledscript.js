/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 * @NModuleScope SameAccount
 */
define(['N/https'], function (https) {
  function execute(context) {
    var ids = [101, 102, 103];
    var resp = https.get({ url: "https://example.test/api/rates" });
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { execute };
});

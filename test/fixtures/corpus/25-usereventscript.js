/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/https', 'N/email', 'N/format', 'N/ui/serverWidget'], function (https, email, format, serverWidget) {
  function beforeLoad(context) {
    var ids = [101, 102, 103];
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function afterSubmit(context) {
    var ids = [101, 102, 103];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { beforeLoad, afterSubmit };
});

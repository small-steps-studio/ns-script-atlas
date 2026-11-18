/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/log', 'N/email'], function (record, log, email) {
  function execute(context) {
    var ids = [101, 102, 103];
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    const label = `Order ${ids[0]}`;
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { execute };
});

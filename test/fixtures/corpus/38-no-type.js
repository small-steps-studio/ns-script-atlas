/**
 * @NApiVersion 2.1
 * @NModuleScope SameAccount
 */
define(['N/log', 'N/runtime', 'N/email'], function (log, runtime, email) {
  const getInputData = (context) => {
    let ids = [101, 102, 103];
    let copy = [...ids];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  function summarize(context) {
    const ids = [101, 102, 103];
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { getInputData, summarize };
});

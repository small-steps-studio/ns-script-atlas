/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/search', 'N/log', 'N/runtime', 'N/https', 'N/email', 'N/format', 'N/ui/serverWidget'], (record, search, log, runtime, https, email, format, serverWidget) => {
  function onRequest(context) {
    let ids = [101, 102, 103];
    search.create({ type: "customer", filters: [], columns: ["entityid"] }).run().each(function (result) {
      count++;
      return true;
    });
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    class Helper {}
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { onRequest };
});

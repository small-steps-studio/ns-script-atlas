/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/search', 'N/email', 'N/ui/serverWidget'], function (search, email, serverWidget) {
  const get = (context) => {
    let ids = [101, 102, 103];
    search.create({ type: "customer", filters: [], columns: ["entityid"] }).run().each(function (result) {
      count++;
      return true;
    });
    class Helper {}
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  const post = (context) => {
    const ids = [101, 102, 103];
    search.create({ type: "customer", filters: [], columns: ["entityid"] }).run().each(function (result) {
      count++;
      return true;
    });
    const sum = ids.reduce((a, b) => a + b, 0);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  const delete = (context) => {
    const ids = [101, 102, 103];
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    const sum = ids.reduce((a, b) => a + b, 0);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  return { get, post, delete };
});

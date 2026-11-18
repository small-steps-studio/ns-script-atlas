/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 */
define(['N/search', 'N/log', 'N/https', 'N/email', 'N/format', 'N/ui/serverWidget'], function (search, log, https, email, format, serverWidget) {
  function get(context) {
    var ids = [101, 102, 103];
    let copy = [...ids];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function put(context) {
    var ids = [101, 102, 103];
    var paged = search.create({ type: "item" }).runPaged({ pageSize: 1000 });
    var resp = https.get({ url: "https://example.test/api/rates" });
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function delete(context) {
    var ids = [101, 102, 103];
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { get, put, delete };
});

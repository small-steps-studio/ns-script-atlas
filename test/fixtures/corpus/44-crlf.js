/**
 * @NApiVersion 2.0
 * @NScriptType Restlet
 */
define(['N/search', 'N/https', 'N/email'], function (search, https, email) {
  function get(context) {
    let ids = [101, 102, 103];
    let paged = search.create({ type: "item" }).runPaged({ pageSize: 1000 });
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    const label = `Order ${ids[0]}`;
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function post(context) {
    let ids = [101, 102, 103];
    while (more) {
      let res = search.lookupFields({ type: "item", id: next, columns: ["itemid"] });
      more = false;
    }
    let resp = https.get({ url: "https://example.test/api/rates" });
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function put(context) {
    let ids = [101, 102, 103];
    let resp = https.get({ url: "https://example.test/api/rates" });
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function delete(context) {
    const ids = [101, 102, 103];
    while (more) {
      const res = search.lookupFields({ type: "item", id: next, columns: ["itemid"] });
      more = false;
    }
    class Helper {}
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { get, post, put, delete };
});

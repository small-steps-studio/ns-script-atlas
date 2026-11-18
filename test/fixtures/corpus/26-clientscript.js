/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
define(['N/search', 'N/log', 'N/runtime', 'N/https', 'N/email'], function (search, log, runtime, https, email) {
  const pageInit = (context) => {
    let ids = [101, 102, 103];
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    const label = `Order ${ids[0]}`;
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  const fieldChanged = (context) => {
    const ids = [101, 102, 103];
    var legacy = nlapiLoadRecord("customer", 5); // old API
    const sum = ids.reduce((a, b) => a + b, 0);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  function saveRecord(context) {
    let ids = [101, 102, 103];
    while (more) {
      let res = search.lookupFields({ type: "item", id: next, columns: ["itemid"] });
      more = false;
    }
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function validateLine(context) {
    const ids = [101, 102, 103];
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { pageInit, fieldChanged, saveRecord, validateLine };
});

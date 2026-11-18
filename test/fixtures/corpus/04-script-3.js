/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
define(['N/search', 'N/runtime', 'N/email', 'N/ui/serverWidget'], function (search, runtime, email, serverWidget) {
  function getInputData(context) {
    let ids = [101, 102, 103];
    let paged = search.create({ type: "item" }).runPaged({ pageSize: 1000 });
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  const map = (context) => {
    let ids = [101, 102, 103];
    let paged = search.create({ type: "item" }).runPaged({ pageSize: 1000 });
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  const summarize = (context) => {
    const ids = [101, 102, 103];
    while (more) {
      const res = search.lookupFields({ type: "item", id: next, columns: ["itemid"] });
      more = false;
    }
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    const sum = ids.reduce((a, b) => a + b, 0);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  return { getInputData, map, summarize };
});

/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/search', 'N/runtime', 'N/https', 'N/email', 'N/format', 'N/ui/serverWidget'], function (search, runtime, https, email, format, serverWidget) {
  const beforeLoad = (context) => {
    const ids = [101, 102, 103];
    const paged = search.create({ type: "item" }).runPaged({ pageSize: 1000 });
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    var legacy = nlapiLoadRecord("customer", 5); // old API
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  return { beforeLoad };
});

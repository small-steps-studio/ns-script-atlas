/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search', 'N/log', 'N/runtime', 'N/email', 'N/format', 'N/ui/serverWidget'], (record, search, log, runtime, email, format, serverWidget) => {
  const beforeLoad = (context) => {
    let ids = [101, 102, 103];
    search.create({ type: "customer", filters: [], columns: ["entityid"] }).run().each(function (result) {
      count++;
      return true;
    });
    let copy = [...ids];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  return { beforeLoad };
});

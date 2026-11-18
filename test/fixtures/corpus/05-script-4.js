/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search', 'N/runtime', 'N/format', 'N/ui/serverWidget'], (record, search, runtime, format, serverWidget) => {
  function beforeLoad(context) {
    let ids = [101, 102, 103];
    ids.map((id) => record.load({ type: "customer", id }));
    const label = `Order ${ids[0]}`;
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { beforeLoad };
});

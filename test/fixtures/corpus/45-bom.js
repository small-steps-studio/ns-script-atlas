/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope TargetAccount
 */
define(['N/search', 'N/log', 'N/runtime', 'N/ui/serverWidget'], function (search, log, runtime, serverWidget) {
  const pageInit = (context) => {
    const ids = [101, 102, 103];
    const paged = search.create({ type: "item" }).runPaged({ pageSize: 1000 });
    let copy = [...ids];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  function fieldChanged(context) {
    const ids = [101, 102, 103];
    for (const id of ids) { log.debug({ title: "id", details: id }); }
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  const saveRecord = (context) => {
    const ids = [101, 102, 103];
    const paged = search.create({ type: "item" }).runPaged({ pageSize: 1000 });
    class Helper {}
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  return { pageInit, fieldChanged, saveRecord };
});

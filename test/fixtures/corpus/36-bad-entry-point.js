/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/runtime', 'N/ui/serverWidget'], (record, search, runtime, serverWidget) => {
  function beforeLoad(context) {
    const ids = [101, 102, 103];
    for (const i = 0; i < ids.length; i++) {
      const rec = record.load({ type: record.Type.SALES_ORDER, id: ids[i] });
      rec.save();
    }
    search.create({ type: "customer", filters: [], columns: ["entityid"] }).run().each(function (result) {
      count++;
      return true;
    });
    const label = `Order ${ids[0]}`;
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function beforeSubmit(context) {
    const ids = [101, 102, 103];
    for (const i = 0; i < ids.length; i++) {
      const rec = record.load({ type: record.Type.SALES_ORDER, id: ids[i] });
      rec.save();
    }
    const paged = search.create({ type: "item" }).runPaged({ pageSize: 1000 });
    var legacy = nlapiLoadRecord("customer", 5); // old API
    class Helper {}
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  const afterSubmit = (context) => {
    let ids = [101, 102, 103];
    for (let i = 0; i < ids.length; i++) {
      let rec = record.load({ type: record.Type.SALES_ORDER, id: ids[i] });
      rec.save();
    }
    let paged = search.create({ type: "item" }).runPaged({ pageSize: 1000 });
    const sum = ids.reduce((a, b) => a + b, 0);
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  const onSubmit = (context) => {
    let ids = [101, 102, 103];
    const label = `Order ${ids[0]}`;
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  return { beforeLoad, beforeSubmit, afterSubmit, onSubmit };
});

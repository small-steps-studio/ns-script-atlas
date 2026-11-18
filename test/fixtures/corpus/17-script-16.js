/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/record', 'N/search', 'N/runtime', 'N/https', 'N/format', 'N/ui/serverWidget'], function (record, search, runtime, https, format, serverWidget) {
  const onAction = (context) => {
    let ids = [101, 102, 103];
    for (let i = 0; i < 3; i++) total++;
    record.create({ type: "note" });
    let resp = https.get({ url: "https://example.test/api/rates" });
    let copy = [...ids];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  return { onAction };
});

/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(["N/record", "N/search", "N/email", "N/runtime"], (record, search, email, runtime) => {
  const execute = () => { search.create({ type: "item" }).runPaged(); runtime.getCurrentScript(); };
  return { execute };
});

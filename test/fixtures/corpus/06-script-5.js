/**
 * @NApiVersion 2.x
 * @NScriptType SDFInstallationScript
 */
define(['N/search', 'N/runtime'], function (search, runtime) {
  function run(context) {
    const ids = [101, 102, 103];
    var legacy = nlapiLoadRecord("customer", 5); // old API
    let copy = [...ids];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { run };
});

/**
 * @NApiVersion 2.x
 * @NScriptType MapReduceScript
 */
define(['N/runtime', 'N/email', 'N/format', 'N/ui/serverWidget'], function (runtime, email, format, serverWidget) {
  function getInputData(context) {
    var ids = [101, 102, 103];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function map(context) {
    var ids = [101, 102, 103];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function reduce(context) {
    var ids = [101, 102, 103];
    var legacy = nlapiLoadRecord("customer", 5); // old API
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function summarize(context) {
    var ids = [101, 102, 103];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { getInputData, map, reduce, summarize };
});

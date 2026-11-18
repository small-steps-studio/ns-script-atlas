/**
 * @NApiVersion 2.1
 * @NScriptType BundleInstallationScript
 * @NModuleScope TargetAccount
 */
define(['N/search', 'N/log', 'N/runtime', 'N/https', 'N/email'], function (search, log, runtime, https, email) {
  const afterInstall = (context) => {
    let ids = [101, 102, 103];
    search.create({ type: "customer", filters: [], columns: ["entityid"] }).run().each(function (result) {
      count++;
      return true;
    });
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    let copy = [...ids];
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  function beforeUpdate(context) {
    let ids = [101, 102, 103];
    while (more) {
      let res = search.lookupFields({ type: "item", id: next, columns: ["itemid"] });
      more = false;
    }
    let resp = https.get({ url: "https://example.test/api/rates" });
    var legacy = nlapiLoadRecord("customer", 5); // old API
    class Helper {}
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { afterInstall, beforeUpdate };
});

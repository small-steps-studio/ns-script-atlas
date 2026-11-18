/**
 * @NApiVersion 2.1
 * @NScriptType BundleInstallationScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/search', 'N/email', 'N/format', 'N/ui/serverWidget'], function (record, search, email, format, serverWidget) {
  function afterInstall(context) {
    let ids = [101, 102, 103];
    ids.map((id) => record.load({ type: "customer", id }));
    search.create({ type: "customer", filters: [], columns: ["entityid"] }).run().each(function (result) {
      count++;
      return true;
    });
    do {
      email.send({ author: 1, recipients: ["ops@example.test"], subject: "Report", body: "Done" });
      tries++;
    } while (tries < 1);
    const label = `Order ${ids[0]}`;
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  function beforeUpdate(context) {
    let ids = [101, 102, 103];
    ids.forEach(function (id) {
      record.submitFields({ type: record.Type.CUSTOMER, id: id, values: { comments: "checked" } });
    });
    var legacy = nlapiLoadRecord("customer", 5); // old API
    const label = `Order ${ids[0]}`;
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  }

  return { afterInstall, beforeUpdate };
});

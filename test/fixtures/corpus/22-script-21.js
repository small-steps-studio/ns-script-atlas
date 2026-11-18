/**
 * @NApiVersion 2.1
 * @NScriptType BundleInstallationScript
 * @NModuleScope SameAccount
 */
define(['N/record', 'N/log', 'N/email', 'N/format', 'N/ui/serverWidget'], function (record, log, email, format, serverWidget) {
  const afterInstall = (context) => {
    const ids = [101, 102, 103];
    ids.map((id) => record.load({ type: "customer", id }));
    const label = `Order ${ids[0]}`;
    log.debug({ title: "done", details: "ok" }); // a string with record.load( inside is not a call
  };

  return { afterInstall };
});

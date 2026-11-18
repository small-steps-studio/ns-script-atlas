function afterSubmit(type) {
  var rec = nlapiLoadRecord("salesorder", nlapiGetRecordId());
  var o = new nlobjSearchFilter("internalid", null, "is", 1);
}

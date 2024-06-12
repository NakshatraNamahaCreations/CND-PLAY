let PaymentMongoose = require("mongoose");

let PaymentSchema = new PaymentMongoose.Schema({
  ch_id: String,
  gateway_provider: String,
  gateway_business_account_user_id: String,
  gateway_business_account_password: String,
  gateway_business_account_marchand_id: String,
  gateway_business_account_sandbox_id: String,
  gateway_publishable_key: String,
  gateway_secret_key: String,
});

module.exports = PaymentMongoose.model("paymentgetway", PaymentSchema);

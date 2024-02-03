const mongoose = require("mongoose");

const PlansSchema = new mongoose.Schema({
  planType: String,
  validity: String,
  amount: String,
  videoQuality: String,
});

const Plans = mongoose.model("Plans", PlansSchema);

module.exports = Plans;

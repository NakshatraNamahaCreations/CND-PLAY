const mongoose = require("mongoose");

const PlansSchema = new mongoose.Schema(
  {
    planType: String,
    validity: Number,
    amount: Number,
    videoQuality: String,
    device: String,
  },
  { timestamps: true }
);

const Plans = mongoose.model("Plans", PlansSchema);

module.exports = Plans;

const mongoose = require("mongoose");

const PaymentgetwayShema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  ContentId: { type: mongoose.Schema.Types.ObjectId },
});

const Paymentgetway = mongoose.model("Paymentgetway", PaymentgetwayShema);

module.exports = Paymentgetway;

const mongoose = require("mongoose");

const OrderConfirmSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
    },

    amount: {
      type: String,
    },

    userid: {
      type: String,
    },
    purchseId: {
      type: String,
    },
    pruchaseDate: {
      type: String,
    },

    purchseType: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("confirmed_orders", OrderConfirmSchema);

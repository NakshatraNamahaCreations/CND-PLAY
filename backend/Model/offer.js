const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: "" },
    subtitle: { type: String, required: true, default: "" },
    price: { type: Number, required: true, default: "" },
    validity: { type: Number, required: true, default: "" },
    image: { type: String, required: true, default: "" },
    poster: { type: String, required: true, default: "" },
    Contents: { type: Array, required: true, default: [] },
    active:Boolean
  },
  { timestamps: true }
);

const Offers = mongoose.model("offer", OfferSchema);

module.exports = Offers;

const mongoose = require("mongoose");

const trendingModel = new mongoose.Schema({
  active: Boolean,
  pricing: {
    amount: Number,
    validity: String,
  },
  type: String,
  poster: String,
  banner: String,
  title: String,
  section: String,
  datacount: Number,
  page: Number,titleImg:String
});

const trendingModels = mongoose.model("trending", trendingModel);

module.exports = trendingModels;

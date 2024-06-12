const mongoose = require("mongoose");

const districtShema = new mongoose.Schema({
  name: String,
  // order: Object,
});

const district = mongoose.model("distric", districtShema);

module.exports = district;

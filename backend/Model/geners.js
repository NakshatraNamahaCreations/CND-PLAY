const mongoose = require("mongoose");

const GenersModels = new mongoose.Schema({
  active: Boolean,
  name: String,
  // popularity: String,
  // facebook: String,
  // instagram: String,
  // youtube: String,
});

const GenersModel = mongoose.model("geners", GenersModels);

module.exports = GenersModel;


const mongoose = require("mongoose");

const upcomingMovie = new mongoose.Schema({
  active: Boolean,
  poster: String,
  banner: String,
  datacount: Number,
  page: Number,
});

const upcomingSchemas = mongoose.model("upcoming", upcomingMovie);

module.exports = upcomingSchemas;

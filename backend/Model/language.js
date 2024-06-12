const mongoose = require("mongoose");

const LangaugesShema = new mongoose.Schema({
  // order: Object,
  lang: String,
},{timestamps:true});

const Langauges = mongoose.model("langauges", LangaugesShema);

module.exports = Langauges;

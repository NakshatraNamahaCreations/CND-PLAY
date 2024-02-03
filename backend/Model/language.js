const mongoose = require("mongoose");

const LangaugesShema = new mongoose.Schema({
  order: Object,
  lang: String,
});

const Langauges = mongoose.model("langauges", LangaugesShema);

module.exports = Langauges;

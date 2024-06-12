const seriesMongoose = require("mongoose");

const seriesShema = new seriesMongoose.Schema({
  ch_id: String,
  series_name: String,
  description: String,
  thumbnail: String,
});

module.exports = seriesMongoose.model("series", seriesShema);

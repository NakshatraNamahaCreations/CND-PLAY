const EpisodesMongoose = require("mongoose");

const EpisodesShema = new EpisodesMongoose.Schema({
  ch_id: String,
  episodes_name: String,
  description: String,
  thumbnail: String,
  project_id: String,
  series_id: String,
});

module.exports = EpisodesMongoose.model("Episodes", EpisodesShema);

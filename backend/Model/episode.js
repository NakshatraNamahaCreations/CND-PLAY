const EpisodesMongoose = require("mongoose");

const EpisodesShema = new EpisodesMongoose.Schema(
  {
    episodes_name: String,
    storyline: String,
    thumbnail: String,
    series_id: String,
    video: String,
    title: String,
    banner: String,
    episodeNo: String,
    duration: String,
    releaseDate: String,
    releaseTime: String,
    // added 6/25/2024
    active: Boolean,
  },
  { timestamps: true }
);

module.exports = EpisodesMongoose.model("Episodes", EpisodesShema);

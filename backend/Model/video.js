const VideosMongoose = require("mongoose");

const VideosShema = new VideosMongoose.Schema({
  project_id: String,
  series_id: String,
  episodes_id: String,
  ch_id: String,
  videos_name: String,
  description: String,
  thumbnail: String,
  videofile: String,
  duration: String,
  origin: String,
});

module.exports = VideosMongoose.model("Videos", VideosShema);

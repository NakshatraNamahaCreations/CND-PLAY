const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  fromYoutube: Boolean,
  carouselOrder: Number,
  rating: Number,
  active: Boolean,
  section: String,
  video: String,
  type: String,
  title: String,
  isCarousel: Boolean,
  duration: Number,
  searched: String,
  trailer: String,
  genres: [String],
  subtitle: String,
  storyline: String,
  publish: Date,
  contentRating: String,
  pricing: {
    amount: Number,
    validity: String,
  },
  views: Number,
  likes: Number,
  background_color: String,
  poster: String,
  banner: String,
  datacount: Number,
  page: Number,
  user_id: Object,
},{timestamps:true});

const MovieSchemas = mongoose.model("indiemovie", MovieSchema);

module.exports = MovieSchemas;

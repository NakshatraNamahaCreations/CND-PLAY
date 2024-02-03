const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
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
  views: { type: Number, default: 0 },
  likes: Number,
  datacount: Number,
  page: Number,
  background_color: String,
  poster: String,
  banner: String,
  mobilebanner: String,
  tvhomescreenbnr: String,
  user_id: Object,
  typeOfMovie: String,
  mobilevideolink: String,
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;

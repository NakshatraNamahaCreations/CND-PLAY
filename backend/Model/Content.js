const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    isrecommended: Boolean,
    rating: String,
    active: Boolean,
    section: String,
    video: String,
    type: String,
    title: String,
    isCarousel: Boolean,
    duration: String,
    searched: String,
    trailer: String,
    genres: [String],
    subtitle: String,
    storyline: String,
    publish: Date,
    contentRating: String,
    amount: Number,
    validity: Number,
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
    titleImg: String,
    cast: Array,
    creaw: Array,
    ContentRating: Array,
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;

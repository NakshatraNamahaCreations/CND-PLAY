const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    user_type: { type: String, default: "" },
    username: { type: String, default: "" },
    country_code: { type: String, default: "" },
    phone: { type: Number, default: "" },
    email: { type: String, default: "" },
    date_of_birth: { type: String, default: "" },
    gender: { type: String, default: "" },
    district: { type: String, default: "" },
    notification_token: { type: String, default: "" },
    plan: { type: Array, default: [] },
    profile_picture: { type: String, default: "" },
    wishlist: { type: Array },
    Likes: { type: Array },
    purchasedcontent: {
      type: Array,
      default: [],
    },
    continueWatching: Array,
    firebase_id: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", authSchema);

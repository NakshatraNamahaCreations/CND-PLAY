const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  ch_id: { type: String },
  user_type: { type: String },
  username: { type: String },
  full_name: { type: String },
  country_code: { type: String },
  phone: { type: String },
  email: { type: String },
  date_of_birth: { type: String },
  gender: { type: String },
  notification_token: { type: String },
  plan: { type: String },
  profile_picture: { type: String },
  password: { type: String },
  agree_terms: { type: String },
  affectedRows: { type: String },
  changedRows: { type: String },
  fieldCount: { type: String },
  insertId: { type: String },
  message: { type: String },
  protocol41: { type: String },
  serverStatus: { type: String },
  warningCount: { type: String },
  watchingNow: { type: String },
  wishlist: { type: Array },
  Likes: [
    {
      content_id: String,
      userid: String,
    },
  ],
  Myrating: { type: Number },
  purchasedcontent: {
    Active: [{ purchaseddate: String, expiryddate: String }],
    Booked: [],
    Expired: [{ content_id: String }],
  },
  continueWatching: { type: [] },
  firebase_id: { type: String },
});

module.exports = mongoose.model("auth", authSchema);

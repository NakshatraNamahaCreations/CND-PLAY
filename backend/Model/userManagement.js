const mongoose = require("mongoose");

const usermanagement = new mongoose.Schema({
  organization_id: String,
  website: String,
  contact: Number,
  email: String,
  organization_type: String,
});

const usersmang = mongoose.model("usersmang", usermanagement);

module.exports = usersmang;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  organization_id: { type: String },
  liability_waiver: { type: String },
  coi: { type: String },
  contact: { type: String },
  contact_title: { type: String },
  email: { type: String },
  phone: { type: String },
  country: { type: String },
  state: { type: String },
  zip: { type: String },
  address: { type: String },
  username: { type: String },
  password: { type: String },
  
  is_admin: { type: String },
  accountCompleted: { type: String },
  authProvider: { type: String },
  avatar: { type: String },
  createdOn: { type: String },
  district: { type: String },
  email: { type: String },
  lastLogin: { type: String },
  messageToken: { type: String },
  packageInfo: { type: String },
});

module.exports = mongoose.model("user", userSchema);

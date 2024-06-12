const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  organization_name: String,
  website: String,
  tax_id: String,
  organization_type: String,
  sl_m_organization_profile: String,
},{timestamps:true});

const Organization = mongoose.model("organization", OrganizationSchema);

module.exports = Organization;



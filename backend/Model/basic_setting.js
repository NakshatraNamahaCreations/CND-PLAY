const BasicSettingsMongoose = require("mongoose");

const BasicSettingsShema = new BasicSettingsMongoose.Schema({
  ch_id: String,
  basic_settings_type: String,
  content_type: String,
  channel_name: String,
  website: String,
  chennel_logo: String,
  discription:String
});

module.exports = BasicSettingsMongoose.model(
  "basicSettings",
  BasicSettingsShema
);

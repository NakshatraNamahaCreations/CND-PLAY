const projectMongoose = require("mongoose");

const ProjectShema = new projectMongoose.Schema({
  ch_id: String,
  project_type: String,
  content_type: String,
  project_name: String,
  description: String,
  thumbnail: String,
});

module.exports = projectMongoose.model("project", ProjectShema);

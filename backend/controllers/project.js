// exports.getProjectStrictFilter = (req, res) => {
//   const data = req.body.data;
//   let params = [];
//   let where = '';
//   let counter = 0;
//   for(var k in data) {
//     if(counter == 0) {
//       where += ' WHERE ';
//     } else {
//       where += ' AND ';
//     }
//     where += k+' = ? ';
//     params.push(""+data[k]+"");
//     counter++;
//   }
//   const q = "select * from project "+where;
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }
// exports.getProjectStrictFilter = (req, res) => {
//   //   const data = req.body.data;
//   //   let params = [];
//   //   let where = '';
//   //   let counter = 0;
//   //   for(var k in data) {
//   //     if(counter == 0) {
//   //       where += ' WHERE ';
//   //     } else {
//   //       where += ' AND ';
//   //     }
//   //     where += k+' = ? ';
//   //     params.push(""+data[k]+"");
//   //     counter++;
//   //   }
//   //   const q = "select * from project "+where;
//   //   db.query(q, params, (err, data) => {
//   //   //   console.log(err, data);
//   //     if (err) return res.json({ error: err.sqlMessage });
//   //     else return res.json({ data });
//   //   });
//   }
const projectmodel = require("../Model/Project");

exports.createProject = async (req, res) => {
  const { ch_id, project_type, content_type, project_name, description } =
    req.body;

  let file = req.file?.filename;
  try {
    if (!file) {
      throw new Error("Please upload a image");
    }
    const projects = new projectmodel({
      ch_id,
      project_type,
      content_type,
      project_name,
      description,
      thumbnail: file,
    });

    const projectsssave = await projects.save();
    if (projectsssave) {
      return res
        .status(200)
        .json({ data: projectsssave, message: "Create Project Successfully" });
    }
  } catch (err) {
    return res.status(500).json({ err: "internal error" });
  }

  // }
};

exports.list = async (req, res) => {
  const { datacount, page } = req.query;
  const limit = parseInt(datacount) || 5;
  const skip = (parseInt(page) - 1) * limit || 0;

  try {
    const projectDocs = await projectmodel.find().skip(skip).limit(limit);
    return res.status(200).json({ data: projectDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.getProject = async (req, res) => {
  try {
    const projectDocs = await projectmodel.find({});
    return res.status(200).json({ data: projectDocs });
  } catch (error) {
    console.error("Error retrieving data:", error);
    return res.status(500).json({ error: "Failed to retrieve data" });
  }
};
exports.updateProject = async (req, res) => {
  try {
    const projectidd = req.params.projectid;

    const { ch_id, project_type, content_type, project_name, description } =
      req.body;

    let file = req.file?.filename;
    const findemovie = await projectmodel.findOne({
      _id: projectidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.ch_id = ch_id || findemovie.ch_id;
    findemovie.project_type = project_type || findemovie.project_type;
    findemovie.content_type = content_type || findemovie.content_type;
    findemovie.project_name = project_name || findemovie.project_name;
    findemovie.description = description || findemovie.description;
    findemovie.thumbnail = file || findemovie.thumbnail;
    const updateMovie = await projectmodel.findOneAndUpdate(
      { _id: projectidd },
      findemovie,
      { new: true }
    );

    return res.json({
      message: "Updated successfully",
      date: updateMovie,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Unable to update the movie" });
  }
};
exports.deleteProject = async (req, res) => {
  let idd = req.params.iid;
  try {
    const project = await projectmodel.findOneAndDelete({ _id: idd });
    if (project) {
      return res.status(200).json({ data: project });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};
exports.changeStatusProject = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;

  if (id === undefined || status === undefined) {
    return res.json({
      link: `https://api.cndplay.com/api/project/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await projectmodel.updateOne(
        { _id: id },
        { $set: { active: status === 1 ? true : false } }
      );

      if (result.nModified > 0) {
        data.push({ id: id });
        return res.json({ data: data });
      } else {
        return res.json({ error: "Document not found" });
      }
    } catch (error) {
      console.error("Error updating document:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

const videosmodel = require("../Model/video");

exports.createVideos = async (req, res) => {
  const {
    ch_id,
    project_id,
    series_id,
    episodes_id,
    videos_name,
    description,
    duration,
    origin,
  } = req.body;

  const thumbnailFile = req.files["thumbnail"][0];
  const videoFile = req.files["videofile"][0];
  // console.log('Thumbnail Filename:', thumbnailFile);
  // console.log('Video Filename:', videoFile);
  
  try {
    if (!thumbnailFile || !videoFile) {
      throw new Error("Please upload both a thumbnail and a video");
    }
    
    const videoss = new videosmodel({
      ch_id,
      project_id,
      series_id,
      episodes_id,
      videos_name,
      description,
      thumbnail: thumbnailFile.filename,
      videofile: videoFile.filename,
      duration,
      origin,
    });

    const videosave = await videoss.save();
    if (videosave) {
      return res
        .status(200)
        .json({ data: videosave, message: "Create videos Successfully" });
    }
  } catch (err) {
     // console.log(err);
    return res.status(500).json({ err: "internal error" });
  }

  // }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await videosmodel.find({});
    if (videos) {
      return res.status(200).json({ data: videos });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};

exports.updateVideos = async (req, res) => {
  try {
    const videosidd = req.params.videosid;

    const {
      ch_id,
      project_id,
      series_id,
      episodes_id,
      videos_name,
      description,
      duration,
      origin,
    } = req.body;

    const thumbnailFile = req.files?.["thumbnail"];
    const videoFile = req.files?.["videofile"];

    const findemovie = await videosmodel.findOne({
      _id: videosidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.thumbnail = thumbnailFile?.filename || findemovie.thumbnail;
    findemovie.videofile = videoFile?.filename || findemovie.videofile;
    findemovie.ch_id = ch_id || findemovie.ch_id;
    findemovie.videos_name = videos_name || findemovie.videos_name;
    findemovie.description = description || findemovie.description;
    findemovie.project_id = project_id || findemovie.project_id;
    findemovie.series_id = series_id || findemovie.series_id;
    findemovie.episodes_id = episodes_id || findemovie.episodes_id;
    findemovie.duration = duration || findemovie.duration;
    findemovie.origin = origin || findemovie.origin;

    const updateMovie = await videosmodel.findOneAndUpdate(
      { _id: videosidd },
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
exports.deleteVideos = async (req, res) => {
  let idd = req.params.idd;
  try {
    const videos = await videosmodel.findOneAndDelete({ _id: idd });
    if (videos) {
      return res.status(200).json({ data: videos });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};
exports.changeStatusvideos = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;

  if (id === undefined || status === undefined) {
    return res.json({
      link: `https://api.cndplay.com/api/videos/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await videosmodel.updateOne(
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




// exports.updateVideos = (req, res) => {
//   const data = req.body.data.data;
//   const filter = req.body.data.filter;
//   let params = [];
//   let set_data = '';
//   let where = '';
//   let counter = 0;
//   for(var k in data) {
//     if(counter > 0) {
//       set_data += ', ';
//     } else {
//       set_data += ' SET ';
//     }
//     set_data += k + ' = ? ';
//     params.push(data[k]);
//     counter++;
//   }
//   counter = 0;
//   for(var k in filter) {
//     if(counter > 0) {
//       where += ' AND ';
//     } else {
//       where += ' WHERE ';
//     }
//     where += k + ' = ? ';
//     params.push(filter[k]);
//     counter++;
//   }
//   const q = "UPDATE `videos` " + set_data + ' ' + where;
//   console.log(q, params)
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }


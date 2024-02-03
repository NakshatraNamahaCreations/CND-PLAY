// // const express = require('express')
// const multer = require("multer");
// // const upload = multer({ dest: '../upload/' });
// // var bodyParser = require('body-parser')
// // const fileUpload = require('express-fileupload');
// // const app = express()

// // const fs = require('fs')
// // const path = require('path')
// const {db} = require(process.env.PWD+'/lib/db');

// // app.use(fileUpload())
// // // parse application/x-www-form-urlencoded
// // app.use(bodyParser.urlencoded({ extended: true }))

// // // parse application/json
// // app.use(bodyParser.json())

// exports.fileUploader = (req, res) => {
//   const data = req.query;
//   console.log(req.file);
//   req.file.path = `${process.env.DB_PROTOCOL}${process.env.DB_HOST}:${process.env.DB_PORT}/${req.file.path}`;
//   return res.json({ data:[req.file] });
// }

// exports.createEpisodes = (req, res) => {
//     const data = req.body.data;
//     let params = [];
//     let columns = '';
//     let values = '';
//     let counter = 0;
//     for(var k in data) {
//       if(counter > 0) {
//         columns += ', ';
//         values += ', ';
//       }
//       columns += k;
//       values += '?';
//       params.push(data[k]);
//       counter++;
//     }
//     const q = "INSERT INTO `episodes` ("+columns+") VALUES ("+values+")";
//     db.query(q, params, (err, data) => {
//     //   console.log(err, data);
//       if (err) return res.json({ error: err.sqlMessage });
//       else return res.json({ data });
//     });
// }

// exports.getEpisodes = (req, res) => {
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
//     where += k+' LIKE ? ';
//     params.push("%"+data[k]+"%");
//     counter++;
//   }
//   const q = "select * from episodes "+where;
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }

// exports.updateEpisodes = (req, res) => {
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
//   const q = "UPDATE `episodes` " + set_data + ' ' + where;
//   console.log(q, params)
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }

// // exports.changeStatusEpisodes = (req, res) => {
// //   const data = req.body.data.data;
// //   const filter = req.body.data.filter;
// //   let params = [];
// //   let set_data = '';
// //   let where = '';
// //   let counter = 0;
// //   for(var k in data) {
// //     if(counter > 0) {
// //       set_data += ', ';
// //     } else {
// //       set_data += ' SET ';
// //     }
// //     set_data += k + ' = ? ';
// //     params.push(data[k]);
// //     counter++;
// //   }
// //   counter = 0;
// //   for(var k in filter) {
// //     if(counter > 0) {
// //       where += ' AND ';
// //     } else {
// //       where += ' WHERE ';
// //     }
// //     where += k + ' = ? ';
// //     params.push(filter[k]);
// //     counter++;
// //   }
// //   const q = "UPDATE `episodes` " + set_data + ' ' + where;
// //   console.log(q, params)
// //   db.query(q, params, (err, data) => {
// //   //   console.log(err, data);
// //     if (err) return res.json({ error: err.sqlMessage });
// //     else return res.json({ data });
// //   });
// // }

// // exports.trashEpisodes = (req, res) => {
// //   const data = req.body.data.data;
// //   const filter = req.body.data.filter;
// //   let params = [];
// //   let set_data = '';
// //   let where = '';
// //   let counter = 0;
// //   for(var k in data) {
// //     if(counter > 0) {
// //       set_data += ', ';
// //     } else {
// //       set_data += ' SET ';
// //     }
// //     set_data += k + ' = ? ';
// //     params.push(data[k]);
// //     counter++;
// //   }
// //   counter = 0;
// //   for(var k in filter) {
// //     if(counter > 0) {
// //       where += ' AND ';
// //     } else {
// //       where += ' WHERE ';
// //     }
// //     where += k + ' = ? ';
// //     params.push(filter[k]);
// //     counter++;
// //   }
// //   const q = "UPDATE `episodes` " + set_data + ' ' + where;
// //   console.log(q, params)
// //   db.query(q, params, (err, data) => {
// //   //   console.log(err, data);
// //     if (err) return res.json({ error: err.sqlMessage });
// //     else return res.json({ data });
// //   });
// // }

const Episodemodel = require("../Model/episode");

exports.createEpisode = async (req, res) => {
  const { ch_id, episodes_name, description, project_id, series_id } = req.body;

  let file = req.file?.filename;
  try {
    if (!file) {
      throw new Error("Please upload a image");
    }
    const Episodes = new Episodemodel({
      ch_id,
      episodes_name,
      description,
      project_id,
      series_id,
      thumbnail: file,
    });

    const Episodesssave = await Episodes.save();
    if (Episodesssave) {
      return res
        .status(200)
        .json({ data: Episodesssave, message: "Create Episode Successfully" });
    }
  } catch (err) {
    return res.status(500).json({ err: "internal error" });
  }

  // }
};

exports.getEpisode = async (req, res) => {
  try {
    const Episode = await Episodemodel.find({});
    if (Episode) {
      return res.status(200).json({ data: Episode });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};

exports.updateEpisode = async (req, res) => {
  try {
    const Episodeidd = req.params.Episodeidd;

    const { ch_id, episodes_name, description, project_id, series_id } =
      req.body;
    let file = req.file ? req.file.filename : null;
    const findemovie = await Episodemodel.findOne({
      _id: Episodeidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.ch_id = ch_id || findemovie.ch_id;
    findemovie.episodes_name = episodes_name || findemovie.episodes_name;
    findemovie.description = description || findemovie.description;
    findemovie.project_id = project_id || findemovie.project_id;
    findemovie.series_id = series_id || findemovie.series_id;
    findemovie.thumbnail = file || findemovie.thumbnail;
    const updateMovie = await Episodemodel.findOneAndUpdate(
      { _id: Episodeidd },
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
exports.deleteEpisode = async (req, res) => {
  let idd = req.params.iid;
  try {
    const Episode = await Episodemodel.findOneAndDelete({ _id: idd });
    if (Episode) {
      return res.status(200).json({ data: Episode });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};

exports.changeStatusEpisodes = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data.filter;

  if (id === undefined || status === undefined) {
    return res.json({
      link: `http://localhost:8081/api/episodes/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await Episodemodel.updateOne(
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

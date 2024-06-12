const BasicSettingsmodel = require("../Model/basic_setting");

exports.createBasicSettings = async (req, res) => {
  const {
    ch_id,
    basic_settings_type,
    content_type,
    channel_name,
    website,
    discription,
  } = req.body;

  let file = req.file?.filename;
  try {
    if (!file) {
      throw new Error("Please upload a image");
    }
    const BasicSettingss = new BasicSettingsmodel({
      ch_id,
      basic_settings_type,
      content_type,
      channel_name,
      website,
      chennel_logo: file,
      discription,
    });

    const BasicSettingssssave = await BasicSettingss.save();
    if (BasicSettingssssave) {
      return res.status(200).json({
        data: BasicSettingssssave,
        message: "Create BasicSettings Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({ err: "internal error" });
  }

  // }
};

exports.getBasicSettings = async (req, res) => {
  try {
    const BasicSettings = await BasicSettingsmodel.find({});
    if (BasicSettings) {
      return res.status(200).json({ data: BasicSettings });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};
exports.getBasicStrictFilter = async (req, res) => {
  const { basic_settings_name } = req.body;

  try {
    const basicSettings = await BasicSettingsmodel.findOne({
      basic_settings_name: basic_settings_name,
    }).exec();

    if (!basicSettings) {
      return res.status(404).json({ message: "Basic setting not found" });
    }

    const projects = await BasicSettingsmodel.find({
      basic_settings: basicSettings._id,
    }).exec();

    return res.status(200).json({ data: projects });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.updateBasicSettings = async (req, res) => {
  try {
    const BasicSettingsidd = req.params.BasicSettingsid;

    const {
      ch_id,
      basic_settings_type,
      content_type,
      channel_name,
      website,
      discription,
    } = req.body;

    let file = req.file?.filename;
    const findemovie = await BasicSettingsmodel.findOne({
      _id: BasicSettingsidd,
    });

    if (!findemovie) {
      return res.json({ error: "No such record found" });
    }

    findemovie.ch_id = ch_id || findemovie.ch_id;
    findemovie.basic_settings_type =
      basic_settings_type || findemovie.basic_settings_type;
    findemovie.content_type = content_type || findemovie.content_type;
    findemovie.content_type = content_type || findemovie.content_type;
    findemovie.channel_name = channel_name || findemovie.channel_name;
    findemovie.website = website || findemovie.website;
    findemovie.discription = discription || findemovie.discription;
    findemovie.chennel_logo = file || findemovie.chennel_logo;
    const updateMovie = await BasicSettingsmodel.findOneAndUpdate(
      { _id: BasicSettingsidd },
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
exports.deleteBasicSettings = async (req, res) => {
  let idd = req.params.iid;
  try {
    const BasicSettings = await BasicSettingsmodel.findOneAndDelete({
      _id: idd,
    });
    if (BasicSettings) {
      return res.status(200).json({ data: BasicSettings });
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to create content" });
  }
};
exports.changeStatusBasicSettings = async (req, res) => {
  const data = [];
  const { status } = req.body.data.data;
  const { id } = req.body.data?.filter;

  if (id === undefined || status === undefined) {
    return res.json({
      link: `https://api.cndplay.com/api/basic_settings/update?id=${id}&active=${status}`,
    });
  } else {
    try {
      const result = await BasicSettingsmodel.updateOne(
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
// const express = require('express')
// const multer = require("multer");
// const upload = multer({ dest: '../upload/' });
// var bodyParser = require('body-parser')
// const fileUpload = require('express-fileupload');
// const app = express()

// const fs = require('fs')
// const path = require('path')
// const {db} = require(process.env.PWD+'/lib/db');

// app.use(fileUpload())
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// // parse application/json
// app.use(bodyParser.json())

// exports.fileUploader = (req, res) => {
//   const data = req.query;
//   console.log(req.file);
//   req.file.path = `${process.env.DB_PROTOCOL}${process.env.DB_HOST}:${process.env.DB_PORT}/${req.file.path}`;
//   return res.json({ data:[req.file] });
// }

// exports.createBasicSettings = (req, res) => {
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
//     const q = "INSERT INTO `basic_settings` ("+columns+") VALUES ("+values+")";
//     db.query(q, params, (err, data) => {
//     //   console.log(err, data);
//       if (err) return res.json({ error: err.sqlMessage });
//       else return res.json({ data });
//     });
// }

// exports.getBasicSettings = (req, res) => {
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
//   const q = "select * from basic_settings "+where;
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }

// exports.updateBasicSettings = (req, res) => {
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
//   const q = "UPDATE `basic_settings` " + set_data + ' ' + where;
//   console.log(q, params)
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }

// exports.changeStatusBasicSettings = (req, res) => {
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
//   const q = "UPDATE `basic_settings` " + set_data + ' ' + where;
//   console.log(q, params)
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }

// exports.trashBasicSettings = (req, res) => {
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
//   const q = "UPDATE `basic_settings` " + set_data + ' ' + where;
//   console.log(q, params)
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }

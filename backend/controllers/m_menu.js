// const express = require('express')
const multer = require("multer");
// const upload = multer({ dest: '../upload/' });
// var bodyParser = require('body-parser')
// const fileUpload = require('express-fileupload');
// const app = express()

// const fs = require('fs')
// const path = require('path')
const {db} = require(process.env.PWD+'/lib/db');

// app.use(fileUpload())
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

// // parse application/json
// app.use(bodyParser.json())

exports.fileUploader = (req, res) => {
  const data = req.query; 
  console.log(req.file); 
  req.file.path = `${process.env.DB_PROTOCOL}${process.env.DB_HOST}:${process.env.DB_PORT}/${req.file.path}`;
  return res.json({ data:[req.file] });
}

exports.createMenu = (req, res) => {
    const data = req.body.data;
    let params = [];
    let columns = '';
    let values = '';
    let counter = 0;
    for(var k in data) {
      if(counter > 0) {
        columns += ', ';
        values += ', ';
      }
      columns += k;
      values += '?';
      params.push(data[k]);
      counter++;
    }
    const q = "INSERT INTO `m_menu` ("+columns+") VALUES ("+values+")";
    db.query(q, params, (err, data) => {
    //   console.log(err, data);
      if (err) return res.json({ error: err.sqlMessage });
      else return res.json({ data });
    });
}

exports.getMenu = (req, res) => {
  const data = req.body.data;
  let params = [];
  let where = '';
  let counter = 0;
  for(var k in data) {
    if(counter == 0) {
      where += ' WHERE ';
    } else {
      where += ' AND ';
    }
    where += k+' LIKE ? ';
    params.push("%"+data[k]+"%");
    counter++;
  }
  const q = "select * from m_menu "+where;
  db.query(q, params, (err, data) => {
  //   console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
}


exports.updateMenu = (req, res) => {
  const data = req.body.data.data;
  const filter = req.body.data.filter;
  let params = [];
  let set_data = '';
  let where = '';
  let counter = 0;
  for(var k in data) {
    if(counter > 0) {
      set_data += ', ';
    } else {
      set_data += ' SET ';
    }
    set_data += k + ' = ? ';
    params.push(data[k]);
    counter++;
  }
  counter = 0;
  for(var k in filter) {
    if(counter > 0) {
      where += ' AND ';
    } else {
      where += ' WHERE ';
    }
    where += k + ' = ? ';
    params.push(filter[k]);
    counter++;
  }
  const q = "UPDATE `m_menu` " + set_data + ' ' + where;
  console.log(q, params)
  db.query(q, params, (err, data) => {
  //   console.log(err, data);
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  });
}


// exports.changeStatusMenu = (req, res) => {
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
//   const q = "UPDATE `m_menu` " + set_data + ' ' + where;
//   console.log(q, params)
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }


// exports.trashMenu = (req, res) => {
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
//   const q = "UPDATE `m_menu` " + set_data + ' ' + where;
//   console.log(q, params)
//   db.query(q, params, (err, data) => {
//   //   console.log(err, data);
//     if (err) return res.json({ error: err.sqlMessage });
//     else return res.json({ data });
//   });
// }
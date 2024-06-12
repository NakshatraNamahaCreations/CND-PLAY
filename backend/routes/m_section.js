const express = require('express');
const router = express.Router();
const section = require(process.env.PWD+"/controllers/m_section")
const multer  = require('multer');

var storage = multer.diskStorage({
  destination: function(req,file,callback) {
    callback(null, process.env.PWD+'/upload');
  },
  filename: function(req,file,callback) {
    callback(null,Date.now() + file.originalname,callback);
  }
})
var upload = multer({ storage: storage });





// console.log(1)
router
.route("/upload")
.post(upload.single('file'), section.fileUploader);
router
.route("/create")
.post(section.createSection);
router
.route("/list")
.post(section.getSection);
router
.route("/update")
.post(section.updateSection);
router
.route("/changestatus")
.post(section.updateSection);
router
.route("/trash")
.post(section.updateSection);


// router
// .route("/changestatus")
// .post(section.changeStatusSection);
// router
// .route("/trash")
// .post(section.trashSection);

    
module.exports = router; 

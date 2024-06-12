const express = require('express');
const router = express.Router();
const content = require("../controllers/section_content_map")
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
.post(upload.single('file'), content.fileUploader);
router
.route("/create")
.post(content.createContent);
// router
// .route("/list")
// .post(content.getContent);
// router
// .route("/update")
// .post(content.updateContent);
// router
// .route("/changestatus")
// .post(content.updateContent);
// router
// .route("/trash")
// .post(content.deleteContent);


// router
// .route("/changestatus")
// .post(content.changeStatusContent);
// router
// .route("/trash")
// .post(content.trashContent);

    
module.exports = router; 

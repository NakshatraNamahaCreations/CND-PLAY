const express = require('express');
const router = express.Router();
const contentData = require("../../controllers/firebase/contentdata")
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
// router
// .route("/upload")
// .post(upload.single('file'), contentData.fileUploader);
router
.route("/create")
.get(contentData.create);
router
.route("/list")
.get(contentData.list);
// router
// .route("/listStrictFilter")
// .post(contentData.listStrictFilter);
router
.route("/update")
.get(contentData.update);
// router
// .route("/changestatus")
// .post(contentData.changestatus);
// router
// .route("/trash")
// .post(contentData.trash);

    
module.exports = router; 

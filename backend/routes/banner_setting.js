const express = require('express');
const router = express.Router();
const banner = require(process.env.PWD+"/controllers/banner_setting")
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
.post(upload.single('file'), banner.fileUploader);
router
.route("/create")
.post(banner.createBanner);
router
.route("/list")
.post(banner.getBanner);
router
.route("/update")
.post(banner.updateBanner);
router
.route("/changestatus")
.post(banner.updateBanner);
router
.route("/trash")
.post(banner.updateBanner);


// router
// .route("/changestatus")
// .post(banner.changeStatusBanner);
// router
// .route("/trash")
// .post(banner.trashBanner);

    
module.exports = router; 

const express = require('express');
const router = express.Router();
const general = require(process.env.PWD+"/controllers/firebase/general")
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
// .post(upload.single('file'), general.fileUploader);
router
.route("/create")
.get(general.create);
router
.route("/list")
.get(general.list);
// router
// .route("/listStrictFilter")
// .post(general.listStrictFilter);
router
.route("/update")
.get(general.update);
router.post("/trash/:idd", districts.deleteDistrict);
// router
// .route("/changestatus")
// .post(general.changestatus);
// router
// .route("/trash")
// .post(general.trash);

    
module.exports = router; 

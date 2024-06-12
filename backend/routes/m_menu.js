const express = require('express');
const router = express.Router();
const menu = require(process.env.PWD+"/controllers/m_menu")
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
.post(upload.single('file'), menu.fileUploader);
router
.route("/create")
.post(menu.createMenu);
router
.route("/list")
.post(menu.getMenu);
router
.route("/update")
.post(menu.updateMenu);
router
.route("/changestatus")
.post(menu.updateMenu);
router
.route("/trash")
.post(menu.updateMenu);


// router
// .route("/changestatus")
// .post(menu.changeStatusMenu);
// router
// .route("/trash")
// .post(menu.trashMenu);

    
module.exports = router; 

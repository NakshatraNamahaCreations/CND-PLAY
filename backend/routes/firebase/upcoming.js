const express = require("express");
const router = express.Router();
const upcoming = require("../../controllers/firebase/upcoming");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, process.env.PWD + "/upload");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname, callback);
  },
});
var upload = multer({ storage: storage });

// console.log(1)
// router
// .route("/upload")
// .post(upload.single('file'), upcoming.fileUploader);
router.post("/create", upcoming.create);
router.get("/list", upcoming.list);
router.get("/getdata", upcoming.getdata);
router.put("/update/:idd", upcoming.update);
router.post("/trash/:iid", upcoming.deleteUpcoming);
router.post("/changestatus", upcoming.changestatus);

module.exports = router;

const express = require("express");
const router = express.Router();
const trending = require("../../controllers/firebase/trending");
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
// .post(upload.single('file'), trending.fileUploader);
router.post("/create", trending.create);
router.get("/list", trending.list);
router.get("/getdata", trending.getdata);
router.put("/update/:idd", trending.update);
router.post("/trash/:iid", trending.deleteTrending);
router.post("/changestatus", trending.changestatus);
// router
// .route("/listStrictFilter")
// .post(trending.listStrictFilter);

// router
// .route("/changestatus")
// .post(trending.changestatus);
// router
// .route("/trash")
// .post(trending.trash);

module.exports = router;

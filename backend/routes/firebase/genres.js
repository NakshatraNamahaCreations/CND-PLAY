const express = require("express");
const router = express.Router();
const genres = require("../../controllers/firebase/genres");
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

router.post("/create", genres.create);
router.get("/list", genres.list);
router.get("/getdata", genres.getdata);
router.put("/update/:idd", genres.update);
router.post("/trash/:iid", genres.deleteGeners);
router.post("/changestatus", genres.changestatus);
// router
// .route("/listStrictFilter")
// .post(genres.listStrictFilter);

module.exports = router;


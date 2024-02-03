const express = require("express");
const router = express.Router();
const indiemovie = require("../../controllers/firebase/indiemovie");
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

router.post("/create", indiemovie.create);
router.get("/list", indiemovie.list);
router.get("/getdata", indiemovie.getdata);
router.put("/update/:idd", indiemovie.update);
router.post("/trash/:iid", indiemovie.deleteIndiaMovie);
router.post("/changestatus", indiemovie.changestatus);

module.exports = router;

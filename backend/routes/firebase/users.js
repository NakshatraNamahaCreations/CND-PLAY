const express = require("express");
const router = express.Router();
const users = require("../../controllers/firebase/users");
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
// .post(upload.single('file'), users.fileUploader);

router.post("/createUser", users.create);
router.get("/getdata", users.getdata);
router.put("/update/:useridd", users.update);
router.post("/trash/:deleid", users.deleteuser);

// router
// .route("/list")
// .post(users.list);
// router
// .route("/listStrictFilter")
// .post(users.listStrictFilter);
// router
// .route("/update")
// .post(users.update);
// router
// .route("/changestatus")
// .post(users.changestatus);
// router
// .route("/trash")
// .post(users.trash);

module.exports = router;

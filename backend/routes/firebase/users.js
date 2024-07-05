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

router.post("/createUser", users.create);
router.get("/getdata", users.getdata);
router.put("/update/:useridd", users.update);
router.post("/trash/:deleid", users.deleteuser);


router.post("/login", users.Login);
module.exports = router;

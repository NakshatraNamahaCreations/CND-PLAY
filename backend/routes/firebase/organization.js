const express = require('express');
const router = express.Router();
const organization = require("../../controllers/firebase/organization")
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

router.post("/createOrganization",organization.create)
router.post("/usmanagement",organization.createuserManagement)
router.get("/getdata",organization.getdata)
router.put("/update/:useridd", organization.update);
router.delete("/trashUser/:deleid", organization.deleteuser);
router.post("/trash/:iid",organization.deleteorganization)

router.post("/changestatus",organization.changestatus)
module.exports =
router
const express = require("express");
const router = express.Router();
const districts = require("../../controllers/firebase/districts");

router.post("/create", districts.create);
router.get("/list", districts.getdata);
router.get("/getdata", districts.getAlldata);
router.put("/update/:idd", districts.update);
router.post("/trash/:iid", districts.deleteDistrict);

module.exports = router;

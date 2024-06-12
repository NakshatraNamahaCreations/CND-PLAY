const express = require("express");
const router = express.Router();
const langaugeController = require("../../controllers/firebase/Languages");

router.post("/create", langaugeController.create);
router.get("/list", langaugeController.list);
router.get("/getdata", langaugeController.getdata);
router.put("/update/:idd", langaugeController.update);
router.post("/trash/:iid", langaugeController.deleteLanguages);

module.exports = router;

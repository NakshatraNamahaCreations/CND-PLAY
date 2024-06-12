const express = require("express");
const router = express.Router();
const OfferController = require("../controllers/firebase/offer");

router.post("/create", OfferController.createOffer);

router.put("/update/:id", OfferController.updateOffer);
router.get("/getdata", OfferController.getOffer);
router.get("/getalldata", OfferController.getAllData);
router.post("/trash/:iid", OfferController.deleteOffer);
router.post("/changestatus", OfferController.changestatus);
// router.get("/getbyid/:id", OfferController.get);
module.exports = router;

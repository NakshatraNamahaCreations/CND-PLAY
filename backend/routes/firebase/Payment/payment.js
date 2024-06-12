const express = require("express");
const router = express.Router();
const PaymentController = require("../../../controllers/firebase/Payment");

router.post("/hash", PaymentController.initiatePayment);
router.post(
  "/success/:txnid/:userid/:itemid/:validity/:amount",
  PaymentController.verifyPurchasePayment
);
router.post(
  "/successp/:txnid/:userId/:planid/:validity/:plantype/:amount",
  PaymentController.verifyPlanPayment
);
router.post(
  "/club/success/:txnid/:userid/:itemid/:validity/:amount",
  PaymentController.verifyClubPayment
);
router.get("/getorder", PaymentController.getAllOrder);
router.post("/addorder", PaymentController.AddOrder);
module.exports = router;

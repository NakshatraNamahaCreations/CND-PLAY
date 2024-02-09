const express = require("express");
const router = express.Router();
const pay = require("../controllers/pay");

router.route("/json").post(pay.getPayJSON);
router.route("/phonepay").post(pay.getPhonePay);
router.route("/success").get(pay.paymentSuccess);
router.route("/success").post(pay.paymentSuccess);
router.route("/failure").get(pay.paymentFailure);
router.route("/failure").post(pay.paymentFailure);
router.route("/cancel").get(pay.paymentCancel);
router.route("/cancel").post(pay.paymentCancel);

module.exports = router;

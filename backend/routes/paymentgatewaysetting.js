const express = require("express");
const router = express.Router();
const paymentgatewaysetting = require("../controllers/paymentgatewaysetting");
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
// .post(upload.single('file'), paymentgatewaysetting.fileUploader);
router.post("/create", paymentgatewaysetting.createPaymentGatewaySetting);
router.get("/list", paymentgatewaysetting.getPaymentGatewaySetting);
router.put("/update/:PIid", paymentgatewaysetting.updatePaymentGatewaySetting);
router.post("/trash/:iid", paymentgatewaysetting.deletePayementCredential);
router.post("/changestatus", paymentgatewaysetting.changeStatusPaymentGatewaySetting);
// router.post("/changestatus", paymentgatewaysetting.changeStatusPaymentGatewaySetting);
// router
// .route("/changestatus")
// .post(paymentgatewaysetting.updatePaymentGatewaySetting);
// router
// .route("/trash")
// .post(paymentgatewaysetting.updatePaymentGatewaySetting);

// router
// .route("/changestatus")
// .post(paymentgatewaysetting.changeStatusPaymentGatewaySetting);
// router
// .route("/trash")
// .post(paymentgatewaysetting.trashPaymentGatewaySetting);

// router
// .route("/generate")
// .get(paymentgatewaysetting.generate);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const paymentgatewaysetting = require("../controllers/paymentgatewaysetting")
// // const loginStatus = require("../../middleware/LoginStatus")

// router
//     .route("/")
//     .get(paymentgatewaysetting.getPaymentgatewaysetting)
//     .post(paymentgatewaysetting.postPaymentgatewaysetting)

// router
//     .route("/create")
//     .post(paymentgatewaysetting.createPaymentGatewaySettings)

// router
//     .route("/getDefaultPayUSettings")
//     .get(paymentgatewaysetting.getDefaultPayUsetting)

// router
//     .route("/edit/:id")
//     .get(paymentgatewaysetting.getPaymentgatewaysettingEdit)
//     .post(paymentgatewaysetting.postPaymentgatewaysettingEdit)

// router
//     .route("/new")
//     .get(paymentgatewaysetting.getPaymentgatewaysettingNew)
//     .post(paymentgatewaysetting.postPaymentgatewaysettingNew)

// router
//     .route("/section")
//     .get(paymentgatewaysetting.getPaymentgatewaysettingSection)

module.exports = router;

var jsSHA = require("jssha");
const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const { default: axios } = require("axios");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const OrderConfirmed = require("../../../Model/paymentgatway/OrderConfirmed");

router.post("/", urlencodedParser, async (req, res) => {
  var pd = req.body;
  console.log(pd,"pd=====================")
  const formData = new URLSearchParams();
  formData.append("key", pd.key);
  formData.append("txnid", pd.txnid);
  formData.append("amount", pd.amount);
  formData.append("productinfo", pd.productinfo);
  formData.append("firstname", pd.firstname);
  formData.append("email", pd.email);
  formData.append("phone", pd.phone);
  formData.append("surl", pd.surl);
  formData.append("furl", pd.furl);
  formData.append("hash", pd.hash);
  formData.append("service_provider", pd.service_provider);

  //url for test environment is : https://test.payu.in/_payment, change it below
  try {
    const result = await axios.post(
      "https://secure.payu.in/_payment",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.json(result.request.res.responseUrl);
  } catch (err) {
    console.log("error", err);
  }
});

//To verify the payment and save in your database
router.post("/test", async (req, res) => {
  if (req.body.status == "success") {
    const {
      country,
      mode,
      error_Message,
      state,
      bankcode,
      txnid,
      net_amount_debit,
      lastname,
      zipcode,
      phone,
      productinfo,
      hash,
      status,
      firstname,
      city,
      isConsentPayment,
      error,
      addedon,
      encryptedPaymentId,
      bank_ref_num,
      key,
      email,
      amount,
      unmappedstatus,
      address2,
      payuMoneyId,
      address1,
      mihpayid,
      giftCardIssued,
      field1,
      cardnum,
      field7,
      field6,
      field9,
      field8,
      amount_split,
      field3,
      field2,
      field5,
      PG_TYPE,
      field4,
      name_on_card,
    } = req.body;
    try {
      const newOrder = new OrderConfirmed({
        country: country,
        mode: mode,
        error_Message: error_Message,
        state: state,
        bankcode: bankcode,
        txnid: txnid,
        net_amount_debit: net_amount_debit,
        lastname: lastname,
        zipcode: zipcode,
        phone: phone,
        productinfo: productinfo,
        hash: hash,
        status: status,
        firstname: firstname,
        city: city,
        isConsentPayment: isConsentPayment,
        error: error,
        addedon: addedon,
        encryptedPaymentId: encryptedPaymentId,
        bank_ref_num: bank_ref_num,
        key: key,
        email: email,
        amount: amount,
        unmappedstatus: unmappedstatus,
        address2: address2,
        payuMoneyId: payuMoneyId,
        address1: address1,
        mihpayid: mihpayid,
        giftCardIssued: giftCardIssued,
        field1: field1,
        cardnum: cardnum,
        field7: field7,
        field6: field6,
        field9: field9,
        field8: field8,
        amount_split: amount_split,
        field3: field3,
        field2: field2,
        field5: field5,
        PG_TYPE: PG_TYPE,
        field4: field4,
        name_on_card: name_on_card,
      });

      await newOrder.save();
      console.log(newOrder,"newOrder")
      return res.json({
        status: req.body.status,
        transaction_id: `Your transaction id is: ${req.body.mihpayid}. Kindly save it for any further query related to your placed order.`,
        message:
          "Congratulations! You'll shortly receive an acknowledgment email from us regarding your placed order. Thank your for buying, We are glad to serve you! ",
      });
    } catch (err) {
      return res.status(500).json("MongoDB could not save the data");
    }
  } else {
    return res.json({ status: "Payment is not Successful" });
  }
});
module.exports = router;

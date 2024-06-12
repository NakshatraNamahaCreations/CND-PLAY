const axios = require("axios");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const saltkey = "485c1368-9241-4e41-aacf-0a67ec5a812f";
const MerchantId = "M1PNSB831LY3";

let SALT_KEY = "ILhRpQC7cqRlrb162OBqjqC1TzphaqlR";
class PaymentController {
  async PayUPayment(req, res) {
    try {
      const { name, email, amount, transactionId } = req.body;

      if (!name || !email || !amount || !transactionId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      function calculateHash(data) {
        const stringToHash =
          data.key +
          "|" +
          data.txnid +
          "|" +
          data.amount +
          "|" +
          data.productinfo +
          "|" +
          data.firstname +
          "|" +
          data.email +
          "|" +
          data.udf1 +
          "|" +
          data.udf2 +
          "|" +
          data.udf3 +
          "||||||" +
          data.salt;

        // Calculate the hash using SHA-512 algorithm
        return crypto.createHash("sha512").update(stringToHash).digest("hex");
      }
      const data = {
        key: "h0U963",
        salt: SALT_KEY,
        txnid: "T171560196870191092",
        amount: 10,
        productinfo: "TEST PRODUCT",
        firstname: "hema",
        email: "hemamane5376@gmail.com",
        udf1: "details",
        udf2: "details",
        udf3: "details",
      };

      // Calculate the hash
      const hash = calculateHash(data);
      // console.log("Generated Hash:", hash);

      return res.status(200).json({
        hash: hash,
        transactionId: transactionId,
      });
    } catch (error) {
      console.error("Error:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // async initiatePayment(req, res) {
  //   try {
  //     let merchantTransactionId = req.body.transactionId;
  //     const redirectUrl = `https://api.cndplay.com/api/payment/status?id=${merchantTransactionId}`;

  //     const data = {
  //       merchantId: MerchantId,
  //       merchantTransactionId: merchantTransactionId,
  //       merchantUserId: "asfnjk212",
  //       amount: 100,
  //       redirectUrl: redirectUrl,
  //       redirectMode: "POST",
  //       callbackUrl: redirectUrl,
  //       mobileNumber: "8951592630",
  //       paymentInstrument: {
  //         type: "PAY_PAGE",
  //       },
  //     };

  //     const payload = JSON.stringify(data);
  //     const payloadMain = Buffer.from(payload).toString("base64");
  //     const keyIndex = 1;
  //     const string = payloadMain + "/pg/v1/pay" + saltkey;

  //     const sha256hash = crypto
  //       .createHash("sha256")
  //       .update(string)
  //       .digest("hex");
  //     const checksum = sha256hash + "###" + keyIndex;

  //     const prodUrl = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
  //     const options = {
  //       method: "POST",
  //       url: prodUrl,
  //       headers: {
  //         accept: "application/json",
  //         "Content-Type": "application/json",
  //         "X-VERIFY": checksum,
  //       },
  //       data: {
  //         request: payloadMain,
  //       },
  //     };

  //     const response = await axios(options);
  //     res.json(response.data);
  //   } catch (error) {
  //     console.error("Error:", error.message);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }

  // async checkTransactionStatus(req, res) {
  //   const merchantTransactionId = req.query.id;
  //   const merchantId = MerchantId;
  //   const keyIndex = 1;
  //   const string =
  //     `/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltkey;

  //   const sha256hash = crypto.createHash("sha256").update(string).digest("hex");
  //   const checksum = sha256hash + "###" + keyIndex;

  //   const options = {
  //     method: "GET",
  //     url: `https://api.phonepe.com/apis/hermes/pg/v1/api/payment/status/${MerchantId}/${merchantTransactionId}`,
  //     headers: {
  //       accept: "application/json",
  //       "Content-Type": "application/json",
  //       "X-VERIFY": checksum,
  //       "X-MERCHANT-ID": `${MerchantId}`,
  //     },
  //   };

  //   axios
  //     .request(options)
  //     .then(function (response) {
  //       if (response.data.success === true) {
  //         let url = "http://localhost:3000/success";
  //         return res.redirect(url);
  //       } else {
  //         let url = "http://localhost:3000/fail";
  //         return res.redirect(url);
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
}

module.exports = new PaymentController();

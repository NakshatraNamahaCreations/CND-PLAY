const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const crypto = require("crypto");

const { db } = require(process.env.PWD + "/lib/firestoreconnect.js");
require("dotenv").config();

exports.paymentSuccess = async (req, res) => {
  const { body, query } = req;

  const now = Date.now();

  const content_temp_data = {
    vid: query.content_id,
    validity: new Date(
      new Date().setDate(parseInt(new Date().getDate()) + parseInt(query.days))
    ),
    paymentID: body.mihpayid,
    purchasedOn: new Date(),
    section: query.content_type,
  };

  await db
    .collection("users")
    .doc(query.uid)
    .collection("purchases")
    .doc(query.content_id)
    .set(content_temp_data);

  res.end(
    `<script>window.location.href = "${process.env.SITE_PROTOCOL}${process.env.SITE_HOST}:${process.env.SITE_PORT}/play/${query.type}/${query.vid}";</script>`
  );
};

exports.paymentFailure = (req, res) => {
  const { body, query } = req;
  // console.log(query);

  res.end(
    `<script>window.location.href = "${process.env.SITE_PROTOCOL}${process.env.SITE_HOST}:${process.env.SITE_PORT}/play/${query.content_type}/${query.content_id}";</script>`
  );
};

exports.paymentCancel = async (req, res) => {
  const { body, query } = req;

  res.end(
    `<script>window.location.href = "${process.env.SITE_PROTOCOL}${process.env.SITE_HOST}:${process.env.SITE_PORT}/play/${query.content_type}/${query.content_id}";</script>`
  );
};

exports.getPayJSON = (req, res) => {
  let { body } = req;

  let data = {
    key: "h0U963",
    txnid: body.data.txnid,
    productinfo: body.data.productinfo,
    amount: body.data.amount,
    email: body.data.email,
    firstname: body.data.firstname,
    lastname: body.data.lastname,

    surl:
      body.data.surl +
      "?content_id=" +
      body.data.content_id +
      "&content_type=" +
      body.data.content_type +
      "&days=" +
      body.data.days +
      "&uid=" +
      body.data.user_id,
    furl:
      body.data.furl +
      "?content_id=" +
      body.data.content_id +
      "&content_type=" +
      body.data.content_type +
      "&days=" +
      body.data.days +
      "&uid=" +
      body.data.user_id,
    curl:
      body.data.curl +
      "?content_id=" +
      body.data.content_id +
      "&content_type=" +
      body.data.content_type +
      "&days=" +
      body.data.days +
      "&uid=" +
      body.data.user_id,
    phone: body.data.phone,
    udf1: "",
    udf2: "",
    udf3: "",
    udf4: "",
    udf5: "PayUBiz_NODE_JS_KIT",
    hash: "",
  };
  var key = "h0U963";
  var salt = "ILhRpQC7cqRlrb162OBqjqC1TzphaqlR";
  var cryp = crypto.createHash("sha512");
  var text =
    key +
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
    "|||||" +
    data.udf5 +
    "||||||" +
    salt;
  cryp.update(text);
  var hash = cryp.digest("hex");
  data.hash = hash;
  res.end(JSON.stringify({ title: "Pay", data }));
};

exports.getPhonePay = async (req, res) => {
  // console.log("getPhonePay");
  const saltKey = process.env.SALT_KEY;
  const body = JSON.stringify(req.body);
  const payload = Buffer.from(body).toString("base64");
  const gateway = "/pg/v1/pay";
  const dataForChecksum = payload + gateway + saltKey;
  let hash = crypto.createHash("sha256");
  hash.update(dataForChecksum);
  const hashValue = hash.digest("hex");
  const xVerify = hashValue + "###" + 1;
  const url = process.env.PHONEPE_URL;
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    "X-VERIFY": xVerify,
  };

  var options = {
    url: url,
    data: JSON.stringify({ request: payload }),
    headers: headers,
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      res.end(JSON.stringify(json));
    })
    .catch((err) => console.error("error:" + err));
};

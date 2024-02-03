const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const crypto = require("crypto");

const { db } = require(process.env.PWD + "/lib/firestoreconnect.js");
require("dotenv").config();

// exports.getPay = (req, res) => {
//     let url = "http://localhost:5001/v1/paymentgatewaysetting/getDefaultPayUSettings";
//     const options = {method: 'GET'};
//     fetch(url, options).then(res => res.json()).then(json => {
//         console.log(json.rows[0]['gateway_provider'])
//         let data = {
//             key: json.rows[0]['gateway_publishable_key'],
//             txnid: 't6svtqtjRdl4ws',
//             productinfo: 'iPhone',
//             amount: '10',
//             email: 'test@gmail.com',
//             firstname: 'Ashish',
//             lastname: 'Kumar',
//             surl: 'http://localhost:5001/success',
//             furl: 'http://localhost:5001/failure',
//             curl: 'http://localhost:5001/response',
//             phone: '9988776655',
//             udf1: '',
//             udf2: '',
//             udf3: '',
//             udf4: '',
//             udf5: 'PayUBiz_NODE_JS_KIT',
//             hash: '',
//         };
//         var key = json.rows[0]['gateway_publishable_key'];
//         var salt = json.rows[0]['gateway_secret_key'];
//         // const hash = payu.hasher.generateHash({
//         //     key: 'bDuevdeR',
//         //     salt: '3sf0jURk',
//         //     txnid: 't6svtqtjRdl4ws',
//         //     amount: '1000',
//         //     productinfo: 'iPhone',
//         //     firstname: 'Ashish',
//         //     email: 'test@gmail.com',
//         //   });
//         // console.log("Test 1", sha512('C0Dr8m')+sha512('12345')+sha512('1000')+sha512('Shopping')+sha512('Vinay')+sha512('vinay@test.com')+sha512('3sf0jURk'))
//         // console.log("Test 2", sha512('C0Dr8m|12345|1000|Shopping|Vinay|vinay@test.com|3sf0jURk'))
//         // console.log("Test 3", sha512('C0Dr8m123451000ShoppingVinayvinay@test.com3sf0jURk'))
//         // console.log("Test 4", sha512(C0Dr8m|12345|1000|Shopping|Vinay|vinay@test.com|3sf0jURk))
//         var cryp = crypto.createHash('sha512');
//         var text = key + '|' + data.txnid + '|' + data.amount + '|' + data.productinfo + '|' + data.firstname + '|' + data.email + '|||||' + data.udf5 + '||||||' + salt;
//         cryp.update(text);
//         var hash = cryp.digest('hex');
//         // const cryp = crypto.createHash('sha512');
//         // const text = data.key+'|'+data.txnid+'|'+(data.amount*100)+'|'+data.productinfo+'|'+data.firstname+'|'+data.email+'|'+'hUpDCpEjcY';
//         // // const text = data.key+'|'+data.txnid+'|'+data.amount+'|'+data.productinfo+'|'+data.firstname+'|'+data.email+'|'+ data.udf1+'|'+data.udf2+'|'+data.udf3+'|'+data.udf4+'|'+data.udf5+'||||||'+'3sf0jURk';
//         // // const text = 'C0Dr8m'+'|'+'12345'+'|'+'1000'+'|'+'Shopping'+'|'+'Vinay'+'|'+'vinay@test.com'+'|'+'3sf0jURk';
//         // // const text = 'C0Dr8m'+'|'+'12345'+'|'+'1000'+'|'+'Shopping'+'|'+'Vinay'+'|'+'vinay@test.com'+'|'+ data.udf1+'|'+data.udf2+'|'+data.udf3+'|'+data.udf4+'|'+data.udf5+'||||||'+'3sf0jURk';
//         // cryp.update(text);
//         // const hash = cryp.digest('hex');
//         data.hash = hash;
//         // data.hash = JSON.stringify(hash);
//         // res.setHeader("Content-Type", "text/html");
//         // res.setHeader("Access-Control-Allow-Origin", "*");
//         // res.end(JSON.stringify(hash));
//         res.render('pay.html', { title: "Pay", data });
//     }).catch(err => console.error('error:' + err));

// };

exports.paymentSuccess = async (req, res) => {
  const { body, query } = req;
  // console.log(query.days)
  const now = Date.now();
  // const now_temp = new Date()
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

  // console.log(query.uid, query.content_id, content_temp_data);
  // try {
  //   const user_id = db.doc(uid).collection("advanceBooking").doc(vid).delete();
  // } catch (e) {
  //   print(e);
  // }
  res.end(
    `<script>window.location.href = "${process.env.SITE_PROTOCOL}${process.env.SITE_HOST}:${process.env.SITE_PORT}/play/${query.type}/${query.vid}";</script>`
  );
};

exports.paymentFailure = (req, res) => {
  const { body, query } = req;
  console.log(query);
  // const now = Date.now();
  // const now_temp = new Date()
  // const content_temp_data = {
  //     vid: query.content_id,
  //     validity: new Date(now_temp.setDate(now_temp.getDate() + query.days)),
  //     paymentID: body.mihpayid,
  //     purchasedOn: now,
  //     section: query.content_type,
  // };
  // console.log(content_temp_data);
  // // res.end(JSON.stringify({status: body, param: query, res: 0}));
  // // res.end(`${process.env.SITE_PROTOCOL}${process.env.SITE_HOST}:${process.env.SITE_PORT}/play/${query.type}/${query.vid}`);
  // // const DateTime = Date;
  // // const uid =

  // const user_id = db.collection("users").doc(query.uid).collection("purchases").doc(query.content_id).set(content_temp_data);
  // // try {
  // //   const user_id = db.doc(uid).collection("advanceBooking").doc(vid).delete();
  // // } catch (e) {
  // //   print(e);
  // // }
  // res.end(JSON.stringify({status: body, param: query, res: user_id}));
  // console.log(`<script>window.location.href = "${process.env.SITE_PROTOCOL}${process.env.SITE_HOST}:${process.env.SITE_PORT}/play/${query.type}/${query.vid}";</script>`)
  // res.end(`<script>window.location.href = "${process.env.SITE_PROTOCOL}${process.env.SITE_HOST}:${process.env.SITE_PORT}/play/${query.type}/${query.vid}";</script>`);
  res.end(
    `<script>window.location.href = "${process.env.SITE_PROTOCOL}${process.env.SITE_HOST}:${process.env.SITE_PORT}/play/${query.content_type}/${query.content_id}";</script>`
  );
};

exports.paymentCancel = async (req, res) => {
  const { body, query } = req;
  // // console.log(query.days)
  // const now = Date.now();
  // // const now_temp = new Date()
  // const content_temp_data = {
  //     vid: query.content_id,
  //     validity: new Date(new Date().setDate(parseInt(new Date().getDate()) + parseInt(query.days))),
  //     paymentID: body.mihpayid,
  //     purchasedOn: new Date(),
  //     section: query.content_type,
  // };

  // await db.collection("users").doc(query.uid).collection("purchases").doc(query.content_id).set(content_temp_data);

  // // console.log(query.uid, query.content_id, content_temp_data);
  // // try {
  // //   const user_id = db.doc(uid).collection("advanceBooking").doc(vid).delete();
  // // } catch (e) {
  // //   print(e);
  // // }
  // // res.end(JSON.stringify({status: body, param: query, res: 0}));
  res.end(
    `<script>window.location.href = "${process.env.SITE_PROTOCOL}${process.env.SITE_HOST}:${process.env.SITE_PORT}/play/${query.content_type}/${query.content_id}";</script>`
  );
};

exports.getPayJSON = (req, res) => {
  // let url = `${process.env.APP_PROTOCOL}${process.env.APP_HOST}:${process.env.APP_PORT}/paymentcredentialsetup/generate`;
  let { body } = req;
  // console.log(body);
  // const options = {method: 'GET'};
  // fetch(url, options).then(res => res.json()).then(json => {
  // console.log(json);
  // console.log(json.data[0]['gateway_provider']);
  let data = {
    key: "h0U963",
    txnid: body.data.txnid,
    productinfo: body.data.productinfo,
    amount: body.data.amount,
    email: body.data.email,
    firstname: body.data.firstname,
    lastname: body.data.lastname,
    // surl: `${process.env.APP_PROTOCOL}${process.env.APP_HOST}:${process.env.APP_PORT}/pay/success`,
    // furl: `${process.env.APP_PROTOCOL}${process.env.APP_HOST}:${process.env.APP_PORT}/pay/failure`,
    // curl: `${process.env.APP_PROTOCOL}${process.env.APP_HOST}:${process.env.APP_PORT}/pay/cancel`,
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
  // }).catch(err => console.error('error:' + err));
};

exports.getPhonePay = async (req, res) => {
  console.log("getPhonePay");
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
  // const response = await axios.post(
  //     url!,
  //     JSON.stringify({ request: payload }),
  //     { headers: headers }
  // );
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
  // var req = http.request(options, function(res){
  //     var body = "";
  //     res.on('data', function(data) {
  //         console.log('data came');
  //         body += data;
  //     });
  //     res.on('end', function() {
  //         console.log('ended too');
  //         maybe = JSON.parse(body);
  //         console.log(maybe.city);
  //         response.send(maybe);
  //     });
  // });
  //  return response.data;
  // res.end(JSON.stringify({ title: "getPhonePay" }));
};

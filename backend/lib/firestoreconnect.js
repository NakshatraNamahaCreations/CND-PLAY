const admin=require('firebase-admin');

var serviceAccount = require('./cnd-play-firebase-adminsdk-gzy0r-54d61b921d.json');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cnd-play.firebaseio.com",
    authDomain: "cnd-play.firebaseapp.com",
});


// admin.initializeApp({
// credential: admin.credential.cert(serviceAccount),
// databaseURL: "https://cnd-play.firebaseio.com",
// authDomain: "cnd-play.firebaseapp.com",
// });


const db = getFirestore();






module.exports = {db};


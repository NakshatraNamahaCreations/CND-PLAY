// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2Qw92SKVDnlZUq5wUdHA0zIEcAqDM0tI",
  authDomain: "cnd-play.firebaseapp.com",
  projectId: "cnd-play",
  storageBucket: "cnd-play.appspot.com",
  messagingSenderId: "955834134654",
  appId: "1:955834134654:web:59fb6d2a0880cc0c76682f",
  measurementId: "G-YFHNWG2ZBW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

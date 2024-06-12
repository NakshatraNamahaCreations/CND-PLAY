import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2Qw92SKVDnlZUq5wUdHA0zIEcAqDM0tI",
  authDomain: "cnd-play.firebaseapp.com",
  projectId: "cnd-play",
  storageBucket: "cnd-play.appspot.com",
  messagingSenderId: "955834134654",
  appId: "1:955834134654:web:59fb6d2a0880cc0c76682f",
  measurementId: "G-YFHNWG2ZBW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9jONTinilP5gmKiQXgFzp6OFm6m75f6g",
  authDomain: "webcndplay.firebaseapp.com",
  projectId: "webcndplay",
  storageBucket: "webcndplay.appspot.com",
  messagingSenderId: "655209926418",
  appId: "1:655209926418:web:23ae26b2229675196badcb",
  measurementId: "G-RGPKQHV4X6"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5_xFb2HmS7kObdJkVrS2vCUzkDn1Jwbk",
  authDomain: "flixxit-362fd.firebaseapp.com",
  projectId: "flixxit-362fd",
  storageBucket: "flixxit-362fd.appspot.com",
  messagingSenderId: "28865035637",
  appId: "1:28865035637:web:a112323e1ddbfcd3c2e73c",
  measurementId: "G-CWNNLJ77BQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const firebaseAuth = getAuth(app);

export default db;

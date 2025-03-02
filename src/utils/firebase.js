// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP3RacC_51YfQ73tSlHdd-vCxvyZ6ejTE",
  authDomain: "mailbox-d576c.firebaseapp.com",
  projectId: "mailbox-d576c",
  storageBucket: "mailbox-d576c.firebasestorage.app",
  messagingSenderId: "314967587386",
  appId: "1:314967587386:web:f36f4fe76e534ad58e9303",
  measurementId: "G-X3P6TTD85C",
  databaseURL: "https://mailbox-d576c-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
const database = getDatabase(app);
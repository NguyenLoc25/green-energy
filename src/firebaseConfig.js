// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBBDrRw2cqSv8yuiQToX3NR-1B_ci_awZo",
    authDomain: "datn-5b6dc.firebaseapp.com",
    databaseURL: "https://datn-5b6dc-default-rtdb.firebaseio.com",
    projectId: "datn-5b6dc",
    storageBucket: "datn-5b6dc.firebasestorage.app",
    messagingSenderId: "1058163518154",
    appId: "1:1058163518154:web:67af917afb710699d4e233",
    measurementId: "G-EFRN2QNWC9"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app);
  
  export { database, ref, onValue, update, auth, signInWithEmailAndPassword };

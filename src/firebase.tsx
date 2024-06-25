// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKatQeOz55KsSrg_gxMET6q_hAYAjR2E8",
  authDomain: "peque-49c41.firebaseapp.com",
  databaseURL: "https://peque-49c41-default-rtdb.firebaseio.com",
  projectId: "peque-49c41",
  storageBucket: "peque-49c41.appspot.com",
  messagingSenderId: "674853810111",
  appId: "1:674853810111:web:e0c13053e1a20bba0f3b0a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export  {app,db};
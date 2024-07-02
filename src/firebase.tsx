// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCuoWBDTRmpLxRIu_g1QlJQykLJBb84xnk",
  authDomain: "peque-daf69.firebaseapp.com",
  databaseURL: "https://peque-daf69-default-rtdb.firebaseio.com",
  projectId: "peque-daf69",
  storageBucket: "peque-daf69.appspot.com",
  messagingSenderId: "63608063835",
  appId: "1:63608063835:web:b2bee9cfcc5d2610367c7e"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export  {app,db};
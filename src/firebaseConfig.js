 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { firebaseKey } from "./firebaseKey";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// private key
const firebaseConfig = {
    apiKey: "AIzaSyDg26OIuUdaocNY7-_NN12yoMYRiC3ob1U",
    authDomain: "inventory-albert-pytel.firebaseapp.com",
    projectId: "inventory-albert-pytel",
    storageBucket: "inventory-albert-pytel.appspot.com",
    messagingSenderId: "622595985342",
    appId: "1:622595985342:web:a23523d7ceaab2457a33ef",
    measurementId: "G-YJWTSSQQ77"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { firebaseKey } from "./firebaseKey";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// private key

// Initialize Firebase
const app = initializeApp(firebaseKey);

export const db = getFirestore(app);


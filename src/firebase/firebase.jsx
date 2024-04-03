// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ-DICx4Ijoj94iVkrVM7Vsjwh8viW3ts",
  authDomain: "fcarena.firebaseapp.com",
  projectId: "fcarena",
  storageBucket: "fcarena.appspot.com",
  messagingSenderId: "989553752563",
  appId: "1:989553752563:web:6ef51fdd1d9ece51843a86"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const db = getFirestore(app)

export {db}




// firebase email bhesaniaom2022@gmail.com
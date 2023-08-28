// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC930BszKGhVsxq3YFMyBM6UrBYVHCUT0g",
  authDomain: "react-inventaire.firebaseapp.com",
  databaseURL: "https://react-inventaire-default-rtdb.firebaseio.com",
  projectId: "react-inventaire",
  storageBucket: "react-inventaire.appspot.com",
  messagingSenderId: "506850214969",
  appId: "1:506850214969:web:4e578f58dffffc7cce79e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Import the functions you need from the SDKs you need
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
  appId: "1:506850214969:web:4e578f58dffffc7cce79e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWhdmKD-mI3uirFNPE3gcAjEt8Sg99qKM",
  authDomain: "trabajopracticoreact.firebaseapp.com",
  projectId: "trabajopracticoreact",
  storageBucket: "trabajopracticoreact.appspot.com",
  messagingSenderId: "388577255685",
  appId: "1:388577255685:web:d7130979bb3462c9f9d76c",
  measurementId: "G-LJ5Z6SZQ0Y"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
export default appFirebase
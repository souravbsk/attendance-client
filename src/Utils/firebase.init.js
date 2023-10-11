// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXpzsCj08Nq5kPosP4IzDn6u2evfPwYOA",
  authDomain: "employee-attendance-trac-93d17.firebaseapp.com",
  projectId: "employee-attendance-trac-93d17",
  storageBucket: "employee-attendance-trac-93d17.appspot.com",
  messagingSenderId: "915264353067",
  appId: "1:915264353067:web:8441eeb70e62b3c2264b6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
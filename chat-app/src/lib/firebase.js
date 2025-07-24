// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS4-gwnW4b0wvApDFJPsXF8LiAKurQuYU",
  authDomain: "chat-83fc3.firebaseapp.com",
  projectId: "chat-83fc3",
  storageBucket: "chat-83fc3.firebasestorage.app",
  messagingSenderId: "303725266084",
  appId: "1:303725266084:web:c985b3c476b8851ca41231",
  measurementId: "G-YC24L6PDXC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider(); // ✅ အဓိက missing ပါ

export { auth, db, storage, provider }; // ✅ export provider
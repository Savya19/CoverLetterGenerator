// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjKVMI_NhW0yvovR9hk_hVrBH9p5hg63g",
    authDomain: "coverlettergenerator-e0e1d.firebaseapp.com",
    projectId: "coverlettergenerator-e0e1d",
    storageBucket: "coverlettergenerator-e0e1d.firebasestorage.app",
    messagingSenderId: "788399003552",
    appId: "1:788399003552:web:f233b9add21c80751936c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKdBoZueWWGz4IHLz5bYF4BhTJJOerIcc",
    authDomain: "inluminationec.firebaseapp.com",
    projectId: "inluminationec",
    storageBucket: "inluminationec.appspot.com",
    messagingSenderId: "842972859448",
    appId: "1:842972859448:web:ede2ce2cd0dfbed6602acd"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase
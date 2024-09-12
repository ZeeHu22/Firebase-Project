// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd6fweapyGegySvEKigTCqkDOQRPypipg",
  authDomain: "fir-test-40831.firebaseapp.com",
  projectId: "fir-test-40831",
  storageBucket: "fir-test-40831.appspot.com",
  messagingSenderId: "105708522805",
  appId: "1:105708522805:web:9f344c5d061795a836507c",
  measurementId: "G-WVD795QVPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
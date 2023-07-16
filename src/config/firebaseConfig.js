// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBgbimgF8DEqO8mQJbN32s2aZupR0s0OA",
  authDomain: "issue-tracker-56a84.firebaseapp.com",
  projectId: "issue-tracker-56a84",
  storageBucket: "issue-tracker-56a84.appspot.com",
  messagingSenderId: "659790970317",
  appId: "1:659790970317:web:617eb79a4ae087c27f9884",
  measurementId: "G-87GPZ8JN15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;
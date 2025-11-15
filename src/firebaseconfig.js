// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, OAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7jFdZ6JU1e9Nn3I2weCfnySp8NJcvmdw",
  authDomain: "skillsync-11e17.firebaseapp.com",
  projectId: "skillsync-11e17",
  storageBucket: "skillsync-11e17.firebasestorage.app",
  messagingSenderId: "230295884777",
  appId: "1:230295884777:web:02943569582b33d9a13178"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Configure Microsoft OAuth Provider
export const microsoftProvider = new OAuthProvider('microsoft.com');

// Optional: Configure Microsoft provider settings
microsoftProvider.setCustomParameters({
  tenant: 'common', // or your tenant ID
});

export default app;
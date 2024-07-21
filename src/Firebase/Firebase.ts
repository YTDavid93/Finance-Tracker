import { initializeApp } from "firebase/app";
import { firebase } from "./apiKeyConfig";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//signin with email and password
export const firebaseConfig = {
  apiKey: firebase.API_KEY,
  authDomain: firebase.AUTH_DOMAIN,
  projectId: firebase.PROJECTID,
  storageBucket: firebase.STORAGEBUCKET,
  messagingSenderId: firebase.MESSAGINGID,
  appId: firebase.APP_ID,
  measurementId: firebase.MEASUREMENTID,
};


// Initialize Firebase 
// this one is for signwithemail and password
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export default app;

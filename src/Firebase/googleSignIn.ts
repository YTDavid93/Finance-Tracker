import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from './Firebase';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account ",
});

export const auth = getAuth(firebaseApp);
export const signWithGooglePopup = () => signInWithPopup(auth, provider);
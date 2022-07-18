import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line no-unused-vars
  const appCheck = initializeAppCheck(app, {
    provicer: new ReCaptchaV3Provider(process.env.REACT_APP_APPCHECK_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Connect to emulator if app is running in development mode
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
  connectAuthEmulator(auth, "http://localhost:9099"); // This is mandatory format for auth
}

export default db;

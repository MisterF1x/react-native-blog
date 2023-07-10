import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiZ3PFNUVg5yja3VW8ZfrGbFi8CxVJ7DA",
  authDomain: "test-61831.firebaseapp.com",
  databaseURL:
    "https://test-61831-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-61831",
  storageBucket: "test-61831.appspot.com",
  messagingSenderId: "758753518895",
  appId: "1:758753518895:web:aa62a438817f7c815a2dda",
  measurementId: "G-1WHR44HL2V",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

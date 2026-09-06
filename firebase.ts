import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";


const firebaseConfig = {
    apiKey: "AIzaSyCteESwYdw4-TPv8ERztVqfTf10LoBFvm8",
    authDomain: "sass-translator-app-2c119.firebaseapp.com",
    projectId: "sass-translator-app-2c119",
    storageBucket: "sass-translator-app-2c119.appspot.com",
    messagingSenderId: "638947832950",
    appId: "1:638947832950:web:27d181e26fdf04b63fdb57"
  };

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions }
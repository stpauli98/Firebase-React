// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Import Firestore

// Firebase konfig
const firebaseConfig = {
  apiKey: "AIzaSyCi8fvHVwRJr7aSi7mZEwb6EYQ3mrIUK-0",
  authDomain: "node-damir.firebaseapp.com",
  projectId: "node-damir",
  storageBucket: "node-damir.appspot.com",
  messagingSenderId: "1077974750274",
  appId: "1:1077974750274:web:8ea9727bae96e3737a49db"
};

// var Firebase app
const app = initializeApp(firebaseConfig);

// var firebase store
const db = getFirestore(app);

// export, to be showen in other files
export { db };

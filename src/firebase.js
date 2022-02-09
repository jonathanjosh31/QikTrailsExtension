import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAj4YEFKOLFuH4RiEmsoDSRpJ8b0hz3jqQ",
  authDomain: "autocredsprovider.firebaseapp.com",
  projectId: "autocredsprovider",
  storageBucket: "autocredsprovider.appspot.com",
  messagingSenderId: "522902727805",
  appId: "1:522902727805:web:8247250cddaf81affa5514",
  measurementId: "G-TYTMRZSQJZ"
};

// Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
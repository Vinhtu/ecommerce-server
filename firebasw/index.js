import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdi9vJjjsZbkTAOVHHF__7M7MhplMmta0",
  authDomain: "storeshop-6967a.firebaseapp.com",
  projectId: "storeshop-6967a",
  storageBucket: "storeshop-6967a.appspot.com",
  messagingSenderId: "497365227626",
  appId: "1:497365227626:web:db60de3849d267d3281213",
  measurementId: "G-TQRHBBL6S2",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };

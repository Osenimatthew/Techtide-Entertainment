import {
  initializeApp,
  getApps,
  getApp,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD59_yC3eBaJ0ek_IF3j-beLZHusq-j_jQ",
  authDomain: "techtide-927ee.firebaseapp.com",
  databaseURL: "https://techtide-927ee-default-rtdb.firebaseio.com",
  projectId: "techtide-927ee",
  storageBucket: "techtide-927ee.appspot.com",
  messagingSenderId: "288121692868",
  appId: "1:288121692868:web:d179539b5304185950df91",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const clientId = "a68b3ddc";

export {
  initializeApp,
  getApps,
  getApp,
  getAuth,
  db,
  auth,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
  clientId,
};


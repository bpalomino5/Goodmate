import firebase from "firebase";
import "@firebase/firestore";

const config = {
  apiKey: "AIzaSyCUuZe4ubuotmEkZOTQDgxKF0c8j49KTuU",
  authDomain: "goodmate-369cc.firebaseapp.com",
  databaseURL: "https://goodmate-369cc.firebaseio.com",
  projectId: "goodmate-369cc",
  storageBucket: "goodmate-369cc.appspot.com",
  messagingSenderId: "336873271864"
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db };

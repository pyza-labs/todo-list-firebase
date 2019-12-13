import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB7Fdhn04EQ9MJ4xaAOrihvWsaeNhYy8aE",
  authDomain: "to-do-list-25708.firebaseapp.com",
  databaseURL: "https://to-do-list-25708.firebaseio.com",
  projectId: "to-do-list-25708",
  storageBucket: "to-do-list-25708.appspot.com",
  messagingSenderId: "575623099299",
  appId: "1:575623099299:web:49429fe0da39350307e016",
  measurementId: "G-533WYTVXWZ"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const cloud = firebase.firestore();

export default firebase;

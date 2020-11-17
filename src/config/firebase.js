import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCPnmgqKYKknyrkfGgOItMqsvVdtDPyeOs",
  authDomain: "minhas-compras-fc0fb.firebaseapp.com",
  databaseURL: "https://minhas-compras-fc0fb.firebaseio.com",
  projectId: "minhas-compras-fc0fb",
  storageBucket: "minhas-compras-fc0fb.appspot.com",
  messagingSenderId: "427112241890",
  appId: "1:427112241890:web:f1648ed62010698afa1cbb",
  measurementId: "G-KQJNJY2NE7"
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}




export const db = firebase.firestore();
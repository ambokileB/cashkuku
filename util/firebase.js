import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDfDWhZLoqeb2CC86NrmeNayUm_TWjaQgM",
  authDomain: "kukucash-app.firebaseapp.com",
  projectId: "kukucash-app",
  storageBucket: "kukucash-app.appspot.com",
  messagingSenderId: "346265973901",
  appId: "1:346265973901:web:0d8cb63d67b5bd27f89ec4",
  measurementId: "G-HK8QTTKGYF"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
 

 export default firebase;

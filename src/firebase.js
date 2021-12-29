import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDXzqy9Was91XT5ZJ5OsO1QZASKY_gY0Ms",
    authDomain: "crud2-f21df.firebaseapp.com",
    projectId: "crud2-f21df",
    storageBucket: "crud2-f21df.appspot.com",
    messagingSenderId: "459390874748",
    appId: "1:459390874748:web:15a5cf507142f0331885f9"
  };

  export const firebaseApp = firebase.initializeApp(firebaseConfig)
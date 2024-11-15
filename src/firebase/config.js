import app from 'firebase/app'
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC9FvcGJzHvKuEQFEkp2H--FJTas7eInmA",
  authDomain: "prueba-42863.firebaseapp.com",
  projectId: "prueba-42863",
  storageBucket: "prueba-42863.firebasestorage.app",
  messagingSenderId: "442268736879",
  appId: "1:442268736879:web:586e8303177206c2cb9c9a"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth() 
export const db = app.firestore()
export const storage = app.storage()
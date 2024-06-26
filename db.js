import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBPVjlZ81aX-ciZDhqXq-o6_B8dRRV7VOE",
  authDomain: "to-do-list-app-pwa.firebaseapp.com",
  databaseURL: "https://to-do-list-app-pwa-default-rtdb.firebaseio.com",
  projectId: "to-do-list-app-pwa",
  storageBucket: "to-do-list-app-pwa.appspot.com",
  messagingSenderId: "344117336912",
  appId: "1:344117336912:web:f2bbd1a5f25c0136baaa55",
  measurementId: "G-DD0DGSYQDF"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// real-time listener
db.collection('tasks').onSnapshot(snapshot => {
    console.log(snapshot.docChanges());
    snapshot.docChanges().forEach(change => {
      //console.log(change.type, change.doc.id, change.doc.data());
      if(change.type === 'added'){
        // add the document data to the web page
      }
      if(change.type === 'removed'){
        // remove the document data from the web page
      }
    });
  });

export { db };
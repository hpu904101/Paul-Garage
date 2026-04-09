import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBMRylaUJ3dI7KeA7vKN0FWPADnElPgIbY",
  authDomain: "paul-garage.firebaseapp.com",
  databaseURL: "https://paul-garage-default-rtdb.firebaseio.com",
  projectId: "paul-garage",
  storageBucket: "paul-garage.appspot.com",
  messagingSenderId: "840060743662",
  appId: "1:840060743662:web:1d2c61b95095d7298928ff"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDtGqhxRqaxn5IZCZVoPE1HeFR1xTllDQc",
  authDomain: "aiquizgenerator-119b8.firebaseapp.com",
  projectId: "aiquizgenerator-119b8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
  if (!user) window.location = "login.html";
});

window.logout = () => signOut(auth);

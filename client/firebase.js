import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSIQ05LXnRDdJfErI-o1R_lfwYtjs-p4Q",
  authDomain: "mobile-game-5d397.firebaseapp.com",
  projectId: "mobile-game-5d397",
  storageBucket: "mobile-game-5d397.appspot.com",
  messagingSenderId: "225924723968",
  appId: "1:225924723968:web:edb67f43e17ed4c71c6fe5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

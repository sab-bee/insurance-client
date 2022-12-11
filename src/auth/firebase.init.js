import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCAeHysQ0creoqNKM7d9GMRaFaqPVwHQjc",
  authDomain: "uni-insurance.firebaseapp.com",
  projectId: "uni-insurance",
  storageBucket: "uni-insurance.appspot.com",
  messagingSenderId: "116504277600",
  appId: "1:116504277600:web:98829a22a4250d474b4905",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
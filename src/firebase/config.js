
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database"; 

const firebaseConfig = {
  apiKey: "AIzaSyDTNhH4yHq58TKJShERep4cjAZTVSXXiMI",
  authDomain: "nuevo-ed3e7.firebaseapp.com",
  databaseURL: "https://nuevo-ed3e7-default-rtdb.firebaseio.com",
  projectId: "nuevo-ed3e7",
  storageBucket: "nuevo-ed3e7.appspot.com",
  messagingSenderId: "585764025886",
  appId: "1:585764025886:web:f75870d17b17dc8927200f",
  measurementId: "G-SKEWYPR911"
};

const db = initializeApp(firebaseConfig);

export default getDatabase (db);
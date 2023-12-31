import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCvli3p7idYgEYX5XWoOjEazI5Gy73B_yI",
    authDomain: "project-dashboard-a3e50.firebaseapp.com",
    projectId: "project-dashboard-a3e50",
    storageBucket: "project-dashboard-a3e50.appspot.com",
    messagingSenderId: "590121968410",
    appId: "1:590121968410:web:1fe7ede64313dba8a882a3",
    measurementId: "G-4MTTEJ71HF"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app)

  const auth= getAuth(app)

  const db = getFirestore(app)
  export {app, storage, auth, db};
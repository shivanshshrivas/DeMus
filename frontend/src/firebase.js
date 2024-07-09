import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDmRorv8ZDLNgOruBH0VVJinFkHpY3rUFA",
    authDomain: "demus-kbf.firebaseapp.com",
    projectId: "demus-kbf",
    storageBucket: "demus-kbf.appspot.com",
    messagingSenderId: "987494874519",
    appId: "1:987494874519:web:76f9a256e89bb2d4ec98d2",
    measurementId: "G-9P23E227KY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
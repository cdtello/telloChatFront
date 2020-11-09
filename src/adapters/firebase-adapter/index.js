import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';



export const app = firebase.initializeApp({
    apiKey: "AIzaSyABH0opwFwXQero4SUnUTVQwUgn9VCoBOk",
    authDomain: "tellochat-7eaa5.firebaseapp.com",
    databaseURL: "https://tellochat-7eaa5.firebaseio.com",
    projectId: "tellochat-7eaa5",
    storageBucket: "tellochat-7eaa5.appspot.com",
    messagingSenderId: "438942755795",
    appId: "1:438942755795:web:e87dc6338210fb2508dd26",
    measurementId: "G-Y1XWXM617R"
  });

const auth = firebase.auth();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
}


export const authListener = (callback) =>
{
    return auth.onAuthStateChanged(callback);
}
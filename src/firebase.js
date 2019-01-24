import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
    apiKey: "AIzaSyCNh_WPK_hhLfVwXTWic1yniqZUU59tdtE",
    authDomain: "devchat-64ac9.firebaseapp.com",
    databaseURL: "https://devchat-64ac9.firebaseio.com",
    projectId: "devchat-64ac9",
    storageBucket: "devchat-64ac9.appspot.com",
    messagingSenderId: "432394570605"
};
firebase.initializeApp(config);

export default firebase;
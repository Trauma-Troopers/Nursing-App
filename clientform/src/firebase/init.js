import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCPym2WqUGrMU6tMY0O2qp7Y3HcBP1Yt0g",
    authDomain: "nursingdb-test.firebaseapp.com",
    databaseURL: "https://nursingdb-test.firebaseio.com",
    projectId: "nursingdb-test",
    storageBucket: "nursingdb-test.appspot.com",
    messagingSenderId: "926234803998",
    appId: "1:926234803998:web:1b9cdcad765c8fed0c530f",
    measurementId: "G-CTKE6YMR9X"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore

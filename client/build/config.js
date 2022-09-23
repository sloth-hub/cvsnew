// const admin = require("firebase-admin");

// const serviceAccount = require("./cvsnew-a3611-firebase-adminsdk-ywcor-81197cda72.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://cvsnew-a3611-default-rtdb.firebaseio.com"
// });

// const database = admin.database();

const firebase = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyDyeSe72Uq0_1F-f70DegtlAPDs7nsWG1s",
    authDomain: "cvsnew-a3611.firebaseapp.com",
    databaseURL: "https://cvsnew-a3611-default-rtdb.firebaseio.com",
    projectId: "cvsnew-a3611",
    storageBucket: "cvsnew-a3611.appspot.com",
    messagingSenderId: "945194253477",
    appId: "1:945194253477:web:8b26ed748415c3479fe14c",
    measurementId: "G-BB827YS40N"
};

firebase.initializeApp(firebaseConfig);

let database = firebase.database();


module.exports = database;
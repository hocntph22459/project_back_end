import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyCRM659LOUhV_b9DxZqKw2AJHOiO_7x8uw",
    authDomain: "sneakercuti.firebaseapp.com",
    projectId: "sneakercuti",
    storageBucket: "sneakercuti.appspot.com",
    messagingSenderId: "572338920858",
    appId: "1:572338920858:web:bf004f284c650b231c2e23",
    measurementId: "G-911ZZ6FZCL"
  };

  firebase.initializeApp(firebaseConfig)
  const db = firebase.firestore()
  const Bill = db.collection("bills")
  module.exports = Bill
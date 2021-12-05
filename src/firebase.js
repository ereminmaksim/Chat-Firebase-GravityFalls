import firebase from "firebase";



const firebaseConfig = {
    apiKey: "AIzaSyCUb4LII8SqAEcMCrumE7pnTbi72ely0FU",
    authDomain: "messages-cdc5f.firebaseapp.com",
    projectId: "messages-cdc5f",
    storageBucket: "messages-cdc5f.appspot.com",
    messagingSenderId: "1093083223915",
    appId: "1:1093083223915:web:241cc94db8bbb85e395e2e",
    measurementId: "G-WMBN4VVP9M"
};

// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const db = firebaseApp.firestore()
// const auth = firebase.auth()
// const provider = new firebase.auth.GoogleAuthProvider()
//
// export {auth, provider}
// export default db

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth, provider, storage};
export default db;
//firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Your web app is firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfxjz0i6E3XYYKeywxrb4-ZNN6RhF-o4E",
    authDomain: "test-auth-edcfd.firebaseapp.com",
    projectId: "test-auth-edcfd",
    storageBucket: "test-auth-edcfd.appspot.com",
    messagingSenderId: "362291598978",
    appId: "1:362291598978:web:400789d7e3dd0e301d869b",
    measurementId: "G-CEYG336WSS"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};
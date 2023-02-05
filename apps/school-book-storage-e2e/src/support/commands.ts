import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  projectId: 'hale-monument-367417',
  appId: '1:1088812955004:web:d7f1f1bc5d984a8c71e0f9',
  storageBucket: 'hale-monument-367417.appspot.com',
  locationId: 'europe-west',
  apiKey: 'AIzaSyDKBNUWrgbjmV9igCUWI3tJp9rW5djhf5s',
  authDomain: 'hale-monument-367417.firebaseapp.com',
  messagingSenderId: '1088812955004',
  measurementId: 'G-8BFGL8TRDN',
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });

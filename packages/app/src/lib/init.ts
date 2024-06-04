import { config } from '../config';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getApp } from 'firebase/app';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/storage';

const app = firebase.initializeApp({
    apiKey: config.firebaseConfig.apiKey,
    authDomain: config.firebaseConfig.authDomain,
    projectId: config.firebaseConfig.projectId,
    storageBucket: config.firebaseConfig.storageBucket,
    messagingSenderId: config.firebaseConfig.messagingSenderId,
    appId: config.firebaseConfig.appId,
});

if (config.firebaseConfig.useEmulator) {
    app.auth().useEmulator('http://127.0.0.1:9099');
    connectAuthEmulator(getAuth(), 'http://127.0.0.1:9099');

    app.firestore().useEmulator('127.0.0.1', 8080);
    connectFirestoreEmulator(getFirestore(), '127.0.0.1', 8080);

    app.functions().useEmulator('127.0.0.1', 5001);
    connectFunctionsEmulator(getFunctions(getApp()), '127.0.0.1', 5001);

    app.storage().useEmulator('127.0.0.1', 9199);
    connectStorageEmulator(getStorage(), '127.0.0.1', 9199);

    app.database().useEmulator('127.0.0.1', 9000);
    connectDatabaseEmulator(getDatabase(), '127.0.0.1', 9000);
}

import { config } from '@performus/common/config';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/storage';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

export const app = firebase.initializeApp({
    apiKey: config.firebaseConfig.apiKey,
    authDomain: config.firebaseConfig.authDomain,
    projectId: config.firebaseConfig.projectId,
    storageBucket: config.firebaseConfig.storageBucket,
    messagingSenderId: config.firebaseConfig.messagingSenderId,
    appId: config.firebaseConfig.appId,
});
const firestore = initializeFirestore(app, { ignoreUndefinedProperties: true });
export const functions = getFunctions(app, 'australia-southeast1');
const emulatorConfig = config.firebaseConfig.emulator;
if (emulatorConfig?.auth) {
    app.auth().useEmulator(`http://${emulatorConfig.auth.host}:${emulatorConfig.auth.port}`);
    connectAuthEmulator(getAuth(), `http://${emulatorConfig.auth.host}:${emulatorConfig.auth.port}`);
}
if (emulatorConfig?.firestore) {
    app.firestore().useEmulator(emulatorConfig.firestore.host, emulatorConfig.firestore.port);
    connectFirestoreEmulator(firestore, emulatorConfig.firestore.host, emulatorConfig.firestore.port);
}
if (emulatorConfig?.functions) {
    app.functions().useEmulator(emulatorConfig.functions.host, emulatorConfig.functions.port);
    connectFunctionsEmulator(functions, emulatorConfig.functions.host, emulatorConfig.functions.port);
}
if (emulatorConfig?.storage) {
    app.storage().useEmulator(emulatorConfig.storage.host, emulatorConfig.storage.port);
    connectStorageEmulator(getStorage(), emulatorConfig.storage.host, emulatorConfig.storage.port);
}
if (emulatorConfig?.auth) {
    app.database().useEmulator(emulatorConfig.auth.host, emulatorConfig.auth.port);
    connectDatabaseEmulator(getDatabase(), emulatorConfig.auth.host, emulatorConfig.auth.port);
}

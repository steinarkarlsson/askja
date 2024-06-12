import { config } from '@jucy-askja/common/config';
import firebase from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

if (!firebase.apps.length) {
    const settings: firebase.AppOptions = {
        databaseURL: `https://${config.firebaseConfig.projectId}.firebaseio.com`,
        projectId: config.firebaseConfig.projectId,
        storageBucket: `${config.firebaseConfig.projectId}.appspot.com`,
    };
    if (config.firebaseConfig.emulator?.firestore) {
        process.env['FIRESTORE_EMULATOR_HOST'] = `${config.firebaseConfig.emulator.firestore.host}:${config.firebaseConfig.emulator.firestore.port}`;
    }
    initializeApp(settings);
    getFirestore().settings({ ignoreUndefinedProperties: true });
}
const firestoreAdmin = getFirestore();
export default firestoreAdmin;

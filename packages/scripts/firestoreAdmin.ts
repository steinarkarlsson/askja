const config = require('@performus/common/config');
const firebase = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

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

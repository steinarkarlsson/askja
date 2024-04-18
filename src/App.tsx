import * as React from 'react';
import {Admin, Resource} from 'react-admin';
import {firebaseConfig} from "./FIREBASE_CONFIG";
import {FirebaseAuthProvider, FirebaseDataProvider} from 'react-admin-firebase';
import {EmployeeCreate, EmployeeEdit, EmployeeList, EmployeeShow} from "./employees";
import {ReviewPeriodCreate, ReviewPeriodEdit, ReviewPeriodList, ReviewPeriodShow} from "./reviewPeriod";

const config = {
    apiKey: firebaseConfig.apiKey,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
};

const options = {};

const dataProvider = FirebaseDataProvider(config, options);

const authProvider = FirebaseAuthProvider(config, options);

export const App = () => (
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
    >
        <Resource name="employee" list={EmployeeList} show={EmployeeShow} create={EmployeeCreate} edit={EmployeeEdit}/>
        <Resource name="reviewPeriod" list={ReviewPeriodList} show={ReviewPeriodShow} create={ReviewPeriodCreate} edit={ReviewPeriodEdit}/>
    </Admin>
);
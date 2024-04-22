import * as React from 'react';
import {Admin, Resource} from 'react-admin';
import {firebaseConfig} from "./FIREBASE_CONFIG";
import {FirebaseAuthProvider, FirebaseDataProvider} from 'react-admin-firebase';
import {EmployeeCreate, EmployeeEdit, EmployeeList, EmployeeShow} from "./resources/employees";
import {TemplateCreate, TemplateEdit, TemplateList, TemplateShow} from "./resources/template";
import {ReviewPeriodCreate, ReviewPeriodEdit, ReviewPeriodList, ReviewPeriodShow} from "./resources/reviewPeriod";

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
        <Resource name="employee" options={{ label: 'Employees' }} list={EmployeeList} show={EmployeeShow} create={EmployeeCreate} edit={EmployeeEdit} recordRepresentation={(record:any) => `${record.name}`}/>
        <Resource name="reviewPeriod" options={{ label: 'Review Periods' }} list={ReviewPeriodList} show={ReviewPeriodShow} create={ReviewPeriodCreate} edit={ReviewPeriodEdit}/>
        <Resource name="template" options={{ label: 'Templates' }} list={TemplateList} show={TemplateShow} create={TemplateCreate} edit={TemplateEdit}/>
    </Admin>
);
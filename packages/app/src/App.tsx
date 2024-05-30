import React from 'react';
import {Admin, Resource} from 'react-admin';
import {FirebaseAuthProvider, FirebaseDataProvider} from './lib/react-admin-firebase';
import {EmployeeCreate, EmployeeEdit, EmployeeList, EmployeeShow} from './resources/employees';
import {TemplateCreate, TemplateEdit, TemplateList, TemplateShow} from './resources/template';
import {ReviewPeriodCreate, ReviewPeriodEdit, ReviewPeriodList, ReviewPeriodShow} from './resources/reviewPeriod';
import PeopleIcon from '@mui/icons-material/People';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ReviewsIcon from '@mui/icons-material/Reviews';
import {ReviewCreate, ReviewEdit, ReviewList, ReviewShow} from './resources/review';
import {customTheme} from './themes/customTheme';
import {config} from './config';
import CustomLoginPage from './components/CustomLoginPage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const useEmulator = true;

const app = firebase.initializeApp(
    {
        apiKey: config.firebaseConfig.apiKey,
        authDomain: config.firebaseConfig.authDomain,
        projectId: config.firebaseConfig.projectId,
        storageBucket: config.firebaseConfig.storageBucket,
        messagingSenderId: config.firebaseConfig.messagingSenderId,
        appId: config.firebaseConfig.appId,
    },
);

if (useEmulator) {
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

const options = {
    app: app,
};

const dataProvider = FirebaseDataProvider(config.firebaseConfig, options);

const authProvider = FirebaseAuthProvider(config.firebaseConfig, options);


export const App = () => {

    return (
        <Admin
            loginPage={CustomLoginPage}
            theme={customTheme}
            //layout={JucyLayout}
            dataProvider={dataProvider}
            authProvider={authProvider}
        >
            <Resource name="employee" options={{label: 'Employees'}} list={EmployeeList} show={EmployeeShow}
                      create={EmployeeCreate} edit={EmployeeEdit} icon={PeopleIcon}
                      recordRepresentation={(record: any) => `${record.name}`}/>
            <Resource name="reviewPeriod" options={{label: 'Review Periods'}} list={ReviewPeriodList}
                      show={ReviewPeriodShow} create={ReviewPeriodCreate} edit={ReviewPeriodEdit}
                      icon={EditCalendarIcon}/>
            <Resource name="template" options={{label: 'Templates'}} list={TemplateList} show={TemplateShow}
                      create={TemplateCreate} edit={TemplateEdit} icon={CalendarViewMonthIcon}/>
            <Resource name="review" options={{label: 'Reviews'}} list={ReviewList} show={ReviewShow}
                      create={ReviewCreate} edit={ReviewEdit} icon={ReviewsIcon}/>
        </Admin>
    );
};
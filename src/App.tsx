import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import {firebaseConfig} from "./FIREBASE_CONFIG";
import { PostList, PostShow, PostCreate, PostEdit } from "./posts";
import {FirebaseAuthProvider, FirebaseDataProvider,} from 'react-admin-firebase';

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
    //authProvider={authProvider}
>
    <Resource name="posts" list={PostList} show={PostShow} create={PostCreate} edit={PostEdit}/>
</Admin>
);

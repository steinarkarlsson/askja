import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoginPage from './CustomLoginPage';
import {customTheme} from '../themes/customTheme';
import {app} from '../lib/init';
import {FirebaseAuthProvider, FirebaseDataProvider} from '../lib/react-admin-firebase';
import {config} from '../config';
import {Admin as RaAdmin} from 'react-admin';
import {ProfileLoader} from './ProfileLoader';
import {Layout,LayoutProps} from 'ra-ui-materialui';


const options = {
    app: app,
    lazyLoading: {
        enabled: false
    },
};

const dataProvider = FirebaseDataProvider(config.firebaseConfig, options);

const authProvider = FirebaseAuthProvider(config.firebaseConfig, options);

const CustomLayout = ({children,...props}:LayoutProps) => {

    return <Layout {...props}>
        <ProfileLoader>
    {children}
        </ProfileLoader>
    </Layout>
}

export const Admin = ({children}:{children:React.ReactNode}) => {
    return (
            <RaAdmin
                    loginPage={CustomLoginPage}
                    theme={customTheme}
                    layout={CustomLayout}
                    dataProvider={dataProvider}
                    authProvider={authProvider}
            >
                {children}
            </RaAdmin>
    );
};

import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import CustomLoginPage from './CustomLoginPage';
import {customTheme} from '../themes/customTheme';
import {app} from '../lib/init';
import {FirebaseAuthProvider, FirebaseDataProvider, RAFirebaseOptions} from '../lib/react-admin-firebase';
import {Admin as RaAdmin} from 'react-admin';
import {ProfileLoader} from './ProfileLoader';
import {Layout, LayoutProps} from 'ra-ui-materialui';
import {CustomMenu} from './customMenu';
import {config} from '@jucy-askja/common/config';


const options: RAFirebaseOptions = {
    app: app,
    lazyLoading: {
        enabled: false
    },
    metaFieldCasing: 'camel',
    renameMetaFields: {
        created_at: 'createdAt',
        created_by: 'createdBy',
        updated_at: 'updatedAt',
        updated_by: 'updatedBy',
    },
};

const dataProvider = FirebaseDataProvider(config.firebaseConfig, options);

const authProvider = FirebaseAuthProvider(config.firebaseConfig, options);

const CustomLayout = ({children, ...props}: LayoutProps) => {
    return <Layout {...props} sx={{
        backgroundColor: 'white',
        '& .RaLayout-content': {
            backgroundColor: 'white',
        }
    }} menu={CustomMenu}>
        <ProfileLoader>
            {children}
        </ProfileLoader>
    </Layout>
}

export const Admin = ({children}: { children: React.ReactNode }) => {
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

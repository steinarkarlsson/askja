import './lib/init';
import CustomLoginPage from './components/CustomLoginPage';
import {config} from './config';
import {FirebaseAuthProvider, FirebaseDataProvider} from './lib/react-admin-firebase';
import {EmployeeCreate, EmployeeEdit, EmployeeList, EmployeeShow,} from './resources/employees';
import {ReviewCreate, ReviewEdit, ReviewList, ReviewShow,} from './resources/review';
import {ReviewPeriodCreate, ReviewPeriodEdit, ReviewPeriodList, ReviewPeriodShow,} from './resources/reviewPeriod';
import {TemplateCreate, TemplateEdit, TemplateList, TemplateShow,} from './resources/template';
import {customTheme} from './themes/customTheme';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PeopleIcon from '@mui/icons-material/People';
import ReviewsIcon from '@mui/icons-material/Reviews';
import {getApp} from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/storage';
import React from 'react';
import {Admin, Resource} from 'react-admin';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useGetUserProfile} from './hooks/useGetUserProfile';

const options = {
    app: getApp(),
};

const dataProvider = FirebaseDataProvider(config.firebaseConfig, options);

const authProvider = FirebaseAuthProvider(config.firebaseConfig, options);
const queryClient = new QueryClient()

const MyAdmin = ({children}: { children: React.ReactNode }) => {
    const {data, isLoading} = useGetUserProfile();
    console.log(data, isLoading)

    // const isAdmin = data?.data?.role === 'admin';
    // const isManager = data?.data?.role === 'manager';
    const isAdmin = true;
    const isManager = true;

    return <Admin
            loginPage={CustomLoginPage}
            theme={customTheme}
            //layout={JucyLayout}
            dataProvider={dataProvider}
            authProvider={authProvider}
    >
        <Resource
                name="review"
                options={{label: 'Reviews'}}
                list={ReviewList}
                show={ReviewShow}
                create={ReviewCreate}
                edit={ReviewEdit}
                icon={ReviewsIcon}
        />
        <Resource
                name="review"
                options={{label: 'Employee Reviews'}}
                list={ReviewList}
                show={ReviewShow}
                create={ReviewCreate}
                edit={ReviewEdit}
                icon={ReviewsIcon}
        />
        {isManager || isAdmin ?
                <Resource
                        name="employee"
                        options={{label: 'Employees'}}
                        list={EmployeeList}
                        show={EmployeeShow}
                        create={EmployeeCreate}
                        edit={EmployeeEdit}
                        icon={PeopleIcon}
                        recordRepresentation={(record: any) => `${record.name}`}
                />
                : null}
        {isAdmin ?
                <>
                    <Resource
                            name="reviewPeriod"
                            options={{label: 'Review Periods'}}
                            list={ReviewPeriodList}
                            show={ReviewPeriodShow}
                            create={ReviewPeriodCreate}
                            edit={ReviewPeriodEdit}
                            icon={EditCalendarIcon}
                    />
                    <Resource
                            name="template"
                            options={{label: 'Templates'}}
                            list={TemplateList}
                            show={TemplateShow}
                            create={TemplateCreate}
                            edit={TemplateEdit}
                            icon={CalendarViewMonthIcon}
                    /> </> : null}
    </Admin>
}

export const App = () => {
    return (
            <QueryClientProvider client={queryClient}>
                <MyAdmin/>
            </QueryClientProvider>
    );
};

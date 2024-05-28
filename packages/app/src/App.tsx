import React from 'react';
import {Admin, Resource} from 'react-admin';
import {FirebaseAuthProvider, FirebaseDataProvider} from 'react-admin-firebase';
import {EmployeeCreate, EmployeeEdit, EmployeeList, EmployeeShow} from "./resources/employees";
import {TemplateCreate, TemplateEdit, TemplateList, TemplateShow} from "./resources/template";
import {ReviewPeriodCreate, ReviewPeriodEdit, ReviewPeriodList, ReviewPeriodShow} from "./resources/reviewPeriod";
import PeopleIcon from '@mui/icons-material/People';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ReviewsIcon from '@mui/icons-material/Reviews';
import {ReviewCreate, ReviewEdit, ReviewList, ReviewShow} from "./resources/review";
import {customTheme} from "./themes/customTheme";
import {config} from "./config";
import CustomLoginPage from "./components/CustomLoginPage";

const options = {};

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
import './lib/init';
import {EmployeeCreate, EmployeeEdit, EmployeeList, EmployeeShow,} from './resources/employees';
import {SelfReviewEdit, SelfReviewList, SelfReviewShow,} from './resources/selfReview';
import {ReviewPeriodCreate, ReviewPeriodEdit, ReviewPeriodList, ReviewPeriodShow,} from './resources/reviewPeriod';
import {TemplateCreate, TemplateEdit, TemplateList, TemplateShow,} from './resources/template';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PeopleIcon from '@mui/icons-material/People';
import ReviewsIcon from '@mui/icons-material/Reviews';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import 'firebase/compat/storage';
import React from 'react';
import {Resource} from 'react-admin';
import {HrReviewEdit, HrReviewList, HrReviewShow} from './resources/hrReview';
import {EmployeeReviewEdit, EmployeeReviewList, EmployeeReviewShow} from './resources/employeeReview';
import 'react-toastify/dist/ReactToastify.css';
import {Providers} from './components/Providers';
import {Admin} from './components/Admin';


export const App = () => {
    // const {data, error, isLoading} = useGetUserProfile();
    //
    // const isAdmin = data?.role === 'admin';
    // // const isAdmin = true;
    //
    // const isManager = data?.role === 'manager';
    // // const isManager = true;

    return (
            <Providers>
                <Admin>
                    <Resource
                            name="selfReview"
                            options={{label: 'Self Review'}}
                            list={SelfReviewList}
                            show={SelfReviewShow}
                            edit={SelfReviewEdit}
                            icon={ReviewsIcon}
                    />
                    {/*{isManager || isAdmin ?*/}
                            <Resource
                                    name="employeeReview"
                                    options={{label: 'Employee Reviews'}}
                                    list={EmployeeReviewList}
                                    show={EmployeeReviewShow}
                                    edit={EmployeeReviewEdit}
                                    icon={ReviewsIcon}
                            />
                            {/*: null}*/}
                    {/*{isAdmin ?*/}
                            <>
                                <Resource
                                        name="hrReview"
                                        options={{label: 'HR Reviews'}}
                                        list={HrReviewList}
                                        show={HrReviewShow}
                                        edit={HrReviewEdit}
                                        icon={ReviewsIcon}
                                />
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
                                /> </>
                    {/*: null}*/}
                    {/*{isManager || isAdmin ?*/}
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
                    {/*: null}*/}
                </Admin>
            </Providers>
    );
};

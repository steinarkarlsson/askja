import './lib/init';
import {EmployeeCreate, EmployeeEdit, EmployeeList, EmployeeShow,} from './resources/employees';
import {SelfReviewEdit, SelfReviewList, SelfReviewShow,} from './resources/selfReview';
import {ReviewPeriodCreate, ReviewPeriodEdit, ReviewPeriodList, ReviewPeriodShow,} from './resources/reviewPeriod';
import {TemplateCreate, TemplateEdit, TemplateList, TemplateShow,} from './resources/template';
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
import {EmployeeLevelCreate, EmployeeLevelEdit, EmployeeLevelList, EmployeeLevelShow} from './resources/employeeLevel';
import {
    CompetencyCategoryCreate,
    CompetencyCategoryEdit,
    CompetencyCategoryList,
    CompetencyCategoryShow
} from './resources/competencyCategory';
import {editReviewCreate, editReviewEdit, editReviewList, editReviewShow} from './resources/editReview';


export const App = () => {

    return (
            <Providers>
                <Admin>
                    <Resource
                            name="selfReview"
                            options={{label: 'KPI Review'}}
                            list={SelfReviewList}
                            show={SelfReviewShow}
                            edit={SelfReviewEdit}
                    />
                            <Resource
                                    name="employeeReview"
                                    options={{label: 'Employee Reviews'}}
                                    list={EmployeeReviewList}
                                    show={EmployeeReviewShow}
                                    edit={EmployeeReviewEdit}
                            />
                            <>
                                <Resource
                                        name="hrReview"
                                        options={{label: 'HR Reviews'}}
                                        list={HrReviewList}
                                        show={HrReviewShow}
                                        edit={HrReviewEdit}
                                />
                                <Resource
                                        name="editReview"
                                        options={{label: 'Edit Reviews'}}
                                        list={editReviewList}
                                        show={editReviewShow}
                                        edit={editReviewEdit}
                                        create={editReviewCreate}
                                />
                                <Resource
                                        name="reviewPeriod"
                                        options={{label: 'Review Periods'}}
                                        list={ReviewPeriodList}
                                        show={ReviewPeriodShow}
                                        create={ReviewPeriodCreate}
                                        edit={ReviewPeriodEdit}
                                />
                                <Resource
                                        name="template"
                                        options={{label: 'Templates'}}
                                        list={TemplateList}
                                        show={TemplateShow}
                                        create={TemplateCreate}
                                        edit={TemplateEdit}
                                /> </>
                            <Resource
                                    name="employee"
                                    options={{label: 'Employees'}}
                                    list={EmployeeList}
                                    show={EmployeeShow}
                                    create={EmployeeCreate}
                                    edit={EmployeeEdit}
                                    recordRepresentation={(record: any) => `${record.name}`}
                            />
                    <Resource
                            name="employeeLevel"
                            options={{label: 'Employee Levels'}}
                            list={EmployeeLevelList}
                            show={EmployeeLevelShow}
                            create={EmployeeLevelCreate}
                            edit={EmployeeLevelEdit}
                            recordRepresentation={(record: any) => `${record.name}`}
                    />
                    <Resource
                            name="competencyCategory"
                            options={{label: 'Competency Categories'}}
                            list={CompetencyCategoryList}
                            show={CompetencyCategoryShow}
                            create={CompetencyCategoryCreate}
                            edit={CompetencyCategoryEdit}
                            recordRepresentation={(record: any) => `${record.name}`}
                    />
                </Admin>
            </Providers>
    );
};

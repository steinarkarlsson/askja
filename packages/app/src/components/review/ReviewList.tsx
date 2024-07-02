import {Datagrid, List, ReferenceField, ShowButton, TextField} from 'react-admin';
import {useGetUserProfile} from '../../hooks/useGetUserProfile';
import {StartReviewButton} from './StartReviewButton';
import React from 'react';

export const ReviewList = ({reviewType, resource}: { reviewType: string, resource: string }, ...props: any) => {
    const {data: profile} = useGetUserProfile();

    const filter = reviewType === 'hrReview' ? {} : reviewType === 'employeeReview' ? {manager: profile?.id} : {employeeId: profile?.id};

    return (
            <List {...props} resource={resource} filter={filter} pagination={false} exporter={false}>
                <Datagrid bulkActionButtons={false}>
                    <TextField source="employeeName"/>
                    <ReferenceField source="manager" reference="employee" link={false}/>
                    <TextField source="jobTitle"/>
                    <StartReviewButton reviewType={reviewType}/>
                    <ShowButton label="View" variant="contained" style={{borderRadius:'12px'}}/>
                </Datagrid>
            </List>
    );
};

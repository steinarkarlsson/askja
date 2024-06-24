import React from 'react';
import {
    ArrayField,
    Datagrid,
    Edit,
    List,
    ReferenceField,
    RichTextField,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    useGetIdentity
} from 'react-admin';
import {Box, CircularProgress} from '@mui/material';
import {ReviewTitlePanel} from '../components/ReviewTitlePanel';
import {ReviewToolbar} from '../components/ReviewToolbar';
import {SMARTGoals} from '../components/SMARTGoals';
import {SelfReviewFormIterator} from '../components/SelfReviewFormIterator';
import {StartReviewButton} from '../components/StartReviewButton';
import {ErrorComponent} from './../components/ErrorComponent';
import {useGetUserProfile} from '../hooks/useGetUserProfile';

export const SelfReviewList = (props: any) => {
    const { isLoading: identityLoading, error: identityError} = useGetIdentity();
    const {data:profile} = useGetUserProfile();

    if (identityLoading) {
        return (
                <Box display="flex" justifyContent="center" padding={2} width="100%">
                    <CircularProgress/>
                </Box>
        );
    }

    if (identityError) {
        return <ErrorComponent error={identityError}/>;
    }
    return (
            <List {...props} filter={{employeeId:profile?.id}}>
                <Datagrid>
                    <TextField source="employeeName"/>
                    <ReferenceField source="manager" reference="employee" link={false}/>
                    <TextField source="jobTitle"/>
                    <StartReviewButton reviewType={'selfReview'}/>
                </Datagrid>
            </List>
    );
};

export const SelfReviewShow = (props: any) => (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="jobTitle"/>
                <ArrayField source="competencies">
                    <Datagrid bulkActionButtons={false}>
                        <TextField source="category"/>
                        <TextField source="title"/>
                        <RichTextField source="description"/>
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
);

export const SelfReviewEdit = () => (
        <Edit>
            <ReviewTitlePanel/>
            <SMARTGoals/>
            <SimpleForm toolbar={<ReviewToolbar reviewType="selfReview"/>}>
                <SelfReviewFormIterator/>
            </SimpleForm>
        </Edit>
);

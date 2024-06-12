import React from 'react';
import { ArrayField, Datagrid, Edit, Filter, List, ReferenceField, RichTextField, Show, SimpleForm, SimpleShowLayout, TextField, TextInput, useGetIdentity } from 'react-admin';
import { Box, CircularProgress } from '@mui/material';
import { ReviewTitlePanel } from '../components/ReviewTitlePanel';
import { ReviewToolbar } from '../components/ReviewToolbar';
import { SMARTGoals } from '../components/SMARTGoals';
import { SelfReviewFormIterator } from '../components/SelfReviewFormIterator';
import { StartReviewButton } from '../components/StartReviewButton';
import { ErrorComponent } from './../components/ErrorComponent';

const SelfReviewFilter = (props: any) => {
    return (
        <Filter {...props}>
            <TextInput label="Search" source="title" alwaysOn name="search" />
        </Filter>
    );
};

export const SelfReviewList = (props: any) => {
    const { data: identity, isLoading: identityLoading, error: identityError } = useGetIdentity();
    if (identityLoading) {
        return (
            <Box display="flex" justifyContent="center" padding={2} width="100%">
                <CircularProgress />
            </Box>
        );
    }
    if (identityError || !identity) {
        return <ErrorComponent error={identityError || new Error('Failed to fetch current user')} />;
    }
    return (
        <List {...props} filters={<SelfReviewFilter />}>
            <Datagrid>
                <TextField source="employeeName" />
                <ReferenceField source="managerId" reference="employee" />
                <TextField source="jobTitle" />
                <StartReviewButton reviewType={'selfReview'} />
            </Datagrid>
        </List>
    );
};

export const SelfReviewShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="jobTitle" />
            <TextField source="level" />
            <TextField source="active" />
            <TextField source="type" />
            <ArrayField source="competencies">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="category" />
                    <TextField source="title" />
                    <RichTextField source="description" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);

export const SelfReviewEdit = () => (
    <Edit>
        <ReviewTitlePanel />
        <SMARTGoals />
        <SimpleForm toolbar={<ReviewToolbar reviewType="selfReview" />}>
            <SelfReviewFormIterator />
        </SimpleForm>
    </Edit>
);

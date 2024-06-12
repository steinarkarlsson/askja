import React from 'react';
import {
    ArrayField,
    Datagrid,
    Edit,
    Filter,
    List,
    ReferenceField,
    RichTextField,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
} from 'react-admin';
import {SMARTGoals} from '../components/SMARTGoals';
import {ReviewToolbar} from '../components/ReviewToolbar';
import {StartReviewButton} from '../components/StartReviewButton';
import {ReviewTitlePanel} from '../components/ReviewTitlePanel';
import {SelfReviewFormIterator} from '../components/SelfReviewFormIterator';

const SelfReviewFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="title" alwaysOn name="search"/>
            </Filter>
    );
};

export const SelfReviewList = (props: any) => {
    return (
            <List {...props} filters={<SelfReviewFilter/>}>
                <Datagrid>
                    <TextField source="employeeName"/>
                    <ReferenceField source="managerId" reference="employee"/>
                    <TextField source="jobTitle"/>
                    <StartReviewButton reviewType={'selfReview'}/>
                </Datagrid>
            </List>
    )
}

export const SelfReviewShow = (props: any) => (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="jobTitle"/>
                <TextField source="level"/>
                <TextField source="active"/>
                <TextField source="type"/>
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

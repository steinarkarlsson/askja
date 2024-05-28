import React from 'react';
import {
    Create,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    Filter,
    List,
    SelectInput,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput
} from 'react-admin';
import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {ReviewType} from '@jucy-askja/common/schemas';

const ReviewPeriodFilter = (props: any) => {
    return (<Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn/>
    </Filter>);
};

export const ReviewPeriodList = (props: any) => (
    <List {...props} filters={<ReviewPeriodFilter/>}>
        <Datagrid>
            <TextField source="title"/>
            <DateField source="start date"/>
            <DateField source="end date"/>
            <TextField source="type"/>
            <EditButton label=""/>
        </Datagrid>
    </List>
);

export const ReviewPeriodShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title"/>
            <DateField source="start date"/>
            <DateField source="end date"/>
            <TextField source="type"/>
        </SimpleShowLayout>
    </Show>
);

export const ReviewPeriodEdit = (props: any) => (
    <Edit {...props}>
        <ReviewPeriodCreateEdit/>
    </Edit>
);

export const ReviewPeriodCreate = (props: any) => (
    <Create {...props}>
        <ReviewPeriodCreateEdit/>
    </Create>
);

const ReviewPeriodCreateEdit = () => (
    <SimpleForm>
        <TextInput source="title"/>
        <DateInput source="start date"/>
        <DateInput source="end date"/>
        <SelectInput source="type" choices={mapArrayToChoices(ReviewType.options)}/>
    </SimpleForm>
)
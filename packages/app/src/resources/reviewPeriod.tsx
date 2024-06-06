import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {reviewTypeSchema} from '@jucy-askja/common/schemas/ReviewType';
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
    TextInput,
} from 'react-admin';

const ReviewPeriodFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="title" alwaysOn name="title"/>
            </Filter>
    );
};

export const ReviewPeriodList = (props: any) => (
        <List {...props} filters={<ReviewPeriodFilter/>}>
            <Datagrid>
                <TextField source="title"/>
                <DateField source="startDate"/>
                <DateField source="endDate"/>
                <TextField source="type"/>
                <EditButton label=""/>
            </Datagrid>
        </List>
);

export const ReviewPeriodShow = (props: any) => (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="title"/>
                <DateField source="startDate"/>
                <DateField source="endDate"/>
                <TextField source="type"/>
            </SimpleShowLayout>
        </Show>
);

export const ReviewPeriodEdit = (props: any) => (
        <Edit {...props}>
            <SimpleForm>
                <TextInput name="title" source="title"/>
                <DateInput name="startDate" source="startDate" parse={(input) => new Date(input)}/>
                <DateInput name="endDate" source="endDate" parse={(input) => new Date(input)}/>
                <SelectInput
                        name="type"
                        source="type"
                        choices={mapArrayToChoices(reviewTypeSchema._def.values)}
                />
            </SimpleForm>
        </Edit>
);

export const ReviewPeriodCreate = (props: any) => (
        <Create {...props}>
            <SimpleForm>
                <TextInput name="title" source="title"/>
                <DateInput name="startDate" source="startDate"/>
                <DateInput name="endDate" source="endDate"/>
                <SelectInput
                        name="type"
                        source="type"
                        choices={mapArrayToChoices(reviewTypeSchema._def.values)}
                />
            </SimpleForm>
        </Create>
);

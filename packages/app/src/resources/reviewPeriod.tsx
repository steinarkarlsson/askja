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
import {Stack} from '@mui/material';

export const ReviewPeriodList = (props: any) => (
        <List {...props} >
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
            <ReviewPeriodEditCreate/>
        </Edit>
);

export const ReviewPeriodCreate = (props: any) => (
        <Create {...props}>
            <ReviewPeriodEditCreate/>
        </Create>
);

export const ReviewPeriodEditCreate = () => (
        <SimpleForm>
            <Stack direction='column' spacing={2}>
                <Stack direction='row' spacing={2}>
                    <TextInput name="title" source="title" sx={{width: '380px'}}/>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <DateInput name="startDate" source="startDate" parse={(input) => new Date(input)}/>
                    <DateInput name="endDate" source="endDate" parse={(input) => new Date(input)}/>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <SelectInput
                            name="type"
                            source="type"
                            choices={mapArrayToChoices(reviewTypeSchema._def.values)}
                    />
                </Stack>
            </Stack>
        </SimpleForm>
);

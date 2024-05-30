import React from 'react';
import {
    ArrayField,
    ArrayInput,
    BooleanField,
    Create,
    Datagrid,
    DeleteButton,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceInput,
    required,
    RichTextField,
    SaveButton,
    SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
    TextInput,
    Title,
    Toolbar
} from 'react-admin';
import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {CustomRichTextInput} from '../components/CustomRichTextInput';
import {CompetencyCategory, CompetencyType} from '@jucy-askja/common/schemas';
import {Stack} from '@mui/material';

export const ReviewSaveButton = () => {
    return <SaveButton label="Submit"/>
}

const ReviewToolbar = () => (
    <Toolbar>
        <ReviewSaveButton/>
        <DeleteButton/>
    </Toolbar>
);

const ReviewFilter = (props: any) => {
    return (<Filter {...props} >
        <TextInput label="Search" source="title" alwaysOn/>
    </Filter>);
};

export const ReviewList = (props: any) => (
    <List {...props} filters={<ReviewFilter/>}>
        <Datagrid>
            <TextField source="employeeName"/>
            <TextField source="jobTitle"/>
            <TextField source="level"/>
            <TextField source="type"/>
            <BooleanField source="active"/>
            <EditButton label="Edit"/>
            <ShowButton label="Show"/>
        </Datagrid>
    </List>
);

export const ReviewShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="jobTitle"/>
            <TextField source="level"/>
            <TextField source="active"/>
            <TextField source="type"/>
            <ArrayField source="competencies">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="Category"/>
                    <TextField source="Title"/>
                    <RichTextField source="description"/>
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);

export const ReviewEdit = (props: any) => (
    <Edit {...props} >
        <SimpleForm toolbar={<ReviewToolbar/>}>
            <Stack>
                <Title title="Employee Name"/>
                <TextField source="employeeName"/>
            </Stack>

            <TextField source="jobTitle"/>
            <TextField source="type" choices={mapArrayToChoices(CompetencyType.options)} validate={required()}/>
            <ArrayInput source="competencies" name="Competencies">
                <SimpleFormIterator inline>
                        {/*EMPLOYEE*/}
                        {/*<SelectInput source="Category" choices={mapArrayToChoices(CompetencyCategory.options)}/>*/}
                        {/*<TextInput source="Title" name="Title"/>*/}
                        {/*<CustomRichTextInput source="description" label="Description"/>*/}

                    MANAGER

                    <TextField source="Category" choices={mapArrayToChoices(CompetencyCategory.options)}/>
                    <TextField source="Title" name="Title"/>
                    <RichTextField source="description" label="Description"/>
                    <CustomRichTextInput  source="managerComment" label="Manager Comment"/>
                    <SelectInput source="managerApproved" label="Manager Review"
                                 choices={mapArrayToChoices(['Approved', 'Request Changes'])}/>

                    {/*HR*/}
                    {/*<TextField source="Category" choices={mapArrayToChoices(CompetencyCategory.options)}/>*/}
                    {/*<TextField source="Title" name="Title"/>*/}
                    {/*<RichTextField source="description" label="Description"/>*/}
                    {/*<RichTextField source="managerComment" label="Manager Comment"/>*/}
                    {/*<SelectInput source="managerApproved" label="Manager Review"*/}
                    {/*             choices={mapArrayToChoices(['Approved', 'Request Changes'])}/>*/}

                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const ReviewCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm toolbar={<ReviewToolbar/>}>
            <ReferenceInput source="employeeName" reference="employeeName" name="Employee Name"/>
            <TextField source="jobTitle"/>
            <TextField source="type" choices={mapArrayToChoices(CompetencyType.options)} validate={required()}/>
            <ArrayInput source="competencies" name="Competencies">
                <SimpleFormIterator inline>
                    <Stack direction="column">
                        <SelectInput source="Category" choices={mapArrayToChoices(CompetencyCategory.options)}/>
                        <TextInput source="Title" name="Title"/>
                    </Stack>
                    <Stack>
                        <CustomRichTextInput source="description" label="Description"/>
                    </Stack>
                    <Stack direction="column">
                        <CustomRichTextInput source="managerComment" label="Manager Comment"/>
                        <SelectInput source="managerApproved" label="Manager Review"
                                     choices={mapArrayToChoices(['Approved', 'Request Changes'])}/>
                    </Stack>
                    <Stack>
                        <CustomRichTextInput source="HrComment" label="HR Comment"/>
                        <SelectInput source="HrApproved" label="HR Review"
                                     choices={mapArrayToChoices(['Approved', 'Request Changes'])}/>
                    </Stack>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);
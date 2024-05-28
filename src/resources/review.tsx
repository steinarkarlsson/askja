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
    Toolbar
} from 'react-admin';
import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {CustomRichTextInput} from '../components/CustomRichTextInput';
import {CompetencyCategory, Levels, CompetencyType} from '../schemas';

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
                    <RichTextField source="Description"/>
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);

export const ReviewEdit = (props: any) => (
    <Edit {...props} >
        <ReviewCreateEdit/>
    </Edit>
);

export const ReviewCreate = (props: any) => (
    <Create {...props}>
        <ReviewCreateEdit/>
    </Create>
);

const ReviewCreateEdit = () => (
    <SimpleForm toolbar={<ReviewToolbar/>}>
        <TextField source="jobTitle"/>
        <TextField source="level" choices={mapArrayToChoices(Levels)} validate={required()}/>
        <BooleanField source="active"/>
        <TextField source="type" choices={mapArrayToChoices(CompetencyType.options)} validate={required()}/>
        <ArrayInput source="competencies">
            <SimpleFormIterator inline>
                <SelectInput source="Category" choices={mapArrayToChoices(CompetencyCategory.options)}/>
                <TextInput source="Title"/>
                <CustomRichTextInput source="description" label="Description"/>
                <CustomRichTextInput source="managerComment" label="Manager Comment"/>
                <SelectInput source="managerApproved" label="Manager Review"
                             choices={mapArrayToChoices(['Approved', 'Request Changes'])}/>
                <CustomRichTextInput source="HrComment" label="HR Comment"/>
                <SelectInput source="HrApproved" label="HR Review"
                             choices={mapArrayToChoices(['Approved', 'Request Changes'])}/>
            </SimpleFormIterator>
        </ArrayInput>
    </SimpleForm>
)
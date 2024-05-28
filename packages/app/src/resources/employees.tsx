import React from 'react';
import {
    AutocompleteInput,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    EditButton,
    List,
    ReferenceField,
    ReferenceInput,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput
} from 'react-admin';
import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {Levels} from '@jucy-askja/common/schemas';

export const EmployeeList = (props: any) => (
    <List {...props}
        // filters={<EmployeeFilter/>}
          sx={{padding: '20px'}}>
        <Datagrid>
            <TextField source="name"/>
            <ReferenceField source="manager" reference="employee"/>
            <TextField source="jobTitle"/>
            <TextField source="level"/>
            <EditButton label=""/>
        </Datagrid>
    </List>
);

export const EmployeeShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
        </SimpleShowLayout>
    </Show>
);
export const EmployeeEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="jobTitle"/>
            <AutocompleteInput source="level" choices={mapArrayToChoices(Levels)}/>
            <BooleanInput source="active"/>
            <ReferenceInput source="manager" reference="employee" allowEmpty/>
        </SimpleForm>
    </Edit>
);

export const EmployeeCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="jobTitle"/>
            <AutocompleteInput source="level" choices={mapArrayToChoices(Levels)}/>
            <BooleanInput source="active"/>
            <ReferenceInput source="manager" reference="employee"/>
        </SimpleForm>
    </Create>
);

import {mapArrayToChoices} from '../lib/mapArrayToChoices';
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
    ReferenceInput, SelectInput,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
} from 'react-admin';
import {levelsSchema} from '@jucy-askja/common/schemas/Levels';
import {employeeSchema} from '@jucy-askja/common/schemas/Employee';

const roles = mapArrayToChoices(employeeSchema.shape.role.options);

export const EmployeeList = (props: any) => {

    return (
            <List
                    {...props}
                    // filters={<EmployeeFilter/>}
                    sx={{padding: '20px'}}
            >
                <Datagrid>
                    <TextField source="name"/>
                    <ReferenceField source="manager" reference="employee"/>
                    <TextField source="jobTitle"/>
                    <TextField source="level"/>
                    <TextField source="role"/>
                    <EditButton label=""/>
                </Datagrid>
            </List>
    )
};

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
                <TextInput source="email"/>
                <AutocompleteInput source="level" choices={mapArrayToChoices(levelsSchema._def.values)}/>
                <BooleanInput source="active"/>
                <ReferenceInput source="manager" reference="employee" allowEmpty/>
                <SelectInput source="role" choices={roles}/>
            </SimpleForm>
        </Edit>
);

export const EmployeeCreate = (props: any) => (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name"/>
                <TextInput source="jobTitle"/>
                <TextInput source="email"/>
                <AutocompleteInput source="level" choices={mapArrayToChoices(levelsSchema._def.values)}/>
                <BooleanInput source="active"/>
                <ReferenceInput source="manager" reference="employee"/>
                <SelectInput source="role" choices={roles}/>
            </SimpleForm>
        </Create>
);

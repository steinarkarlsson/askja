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
    ReferenceInput,
    SelectInput,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
} from 'react-admin';
import {levelsSchema} from '@jucy-askja/common/schemas/Levels';
import {employeeSchema} from '@jucy-askja/common/schemas/Employee';
import {AccountCircle} from '@mui/icons-material';

const roles = mapArrayToChoices(employeeSchema.shape.role.options);

export const EmployeeList = (props: any) => {

    return (
            <List
                    {...props}
                    // filters={<EmployeeFilter/>}
                    sx={{padding: '20px'}}
            >
                <Datagrid>
                    <AccountCircle/>
                    <TextField source="name" reference="employee"/>
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
            <EmployeeEditCreate/>
        </Edit>
);

export const EmployeeCreate = (props: any) => (
        <Create {...props}>
            <EmployeeEditCreate/>
        </Create>
);

export const EmployeeEditCreate = () => (
        <SimpleForm>
            <TextInput name="name" source="name"/>
            <TextInput name="jobTitle" source="jobTitle"/>
            <TextInput name="email" source="email"/>
            <AutocompleteInput name="level" source="level" choices={mapArrayToChoices(levelsSchema._def.values)}/>
            <BooleanInput name="active" source="active"/>
            <ReferenceInput name="manager" source="manager" reference="employee" allowEmpty/>
            <SelectInput name="role" source="role" choices={roles}/>
        </SimpleForm>
)

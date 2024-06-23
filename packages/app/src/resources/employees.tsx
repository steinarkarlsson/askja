import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import React from 'react';
import {
    AutocompleteInput,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    EditButton,
    Filter,
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
import {employeeSchema} from '@jucy-askja/common/schemas/Employee';
import {AccountCircle} from '@mui/icons-material';
import {Stack} from '@mui/material';
import {EmployeeLevelSelectInput} from '../components/EmployeeLevelSelectInput';
import {EmployeeLevelSelectField} from '../EmployeeLevelSelectField';
import {useGetUserProfile} from '../hooks/useGetUserProfile';

const roles = mapArrayToChoices(employeeSchema.shape.role.options);

const EmployeeFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="name" alwaysOn/>
            </Filter>
    );
};

export const EmployeeList = (props: any) => {
    const {data:profile} = useGetUserProfile();
    //const isManager = profile.role === 'manager';
    const isManager = true
    return (
            <List
                    {...props}
                    sx={{padding: '20px'}}
                    filters={<EmployeeFilter/>}
                    filter={isManager ? {manager: profile?.id} : {}}
            >
                <Datagrid>
                    <AccountCircle/>
                    <TextField source="name" reference="employee"/>
                    <ReferenceField source="manager" reference="employee"/>
                    <TextField source="jobTitle"/>
                    <EmployeeLevelSelectField label='Employee Level'/>
                    <TextField source="role"/>
                    <EditButton label="Edit"/>
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
            <Stack direction="row" spacing={10}>
                <Stack direction='column' spacing={2} width={300}>
                    <TextInput name="name" source="name"/>
                    <TextInput name="email" source="email"/>
                    <ReferenceInput name="manager" source="manager" reference="employee">
                        <AutocompleteInput label="Manager"
                                           matchSuggestion={(filter, choice) => choice.name.toLowerCase().includes(filter.toLowerCase())}/>
                    </ReferenceInput>
                    <BooleanInput name="active" source="active" defaultValue={true}/>
                </Stack>
                <Stack direction='column' spacing={2}>
                    <TextInput name="jobTitle" source="jobTitle"/>
                    <SelectInput name="role" source="role" choices={roles}/>
                    <EmployeeLevelSelectInput/>
                </Stack>
            </Stack>
        </SimpleForm>
)

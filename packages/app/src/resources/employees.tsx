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

const allRoles = mapArrayToChoices(employeeSchema.shape.role.options);

const EmployeeFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="name" alwaysOn/>
            </Filter>
    );
};

export const EmployeeList = (props: any) => {
    const {data:profile} = useGetUserProfile();

    const filter = profile?.role === 'admin' ? {} : profile?.role === 'manager' ? {manager: profile?.id} : {id: profile?.id};

    return (
            <List
                    {...props}
                    sx={{padding: '20px'}}
                    filters={<EmployeeFilter/>}
                    filter={filter}
            >
                <Datagrid>
                    <AccountCircle/>
                    <TextField source="name" reference="employee"/>
                    <ReferenceField source="manager" reference="employee" link={false}/>
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

export const EmployeeEditCreate = () => {
    const {data: profile} = useGetUserProfile();
    const isManager = profile?.role === 'manager';
    const defaultValue = isManager ? profile?.id : '';
    const allowedRoles = profile?.role === 'admin' ? allRoles : allRoles.filter((role) => role.name !== 'admin');

    return (
            <SimpleForm>
                <Stack direction="row" spacing={10}>
                    <Stack direction='column' spacing={2} width={300}>
                        <TextInput name="name" source="name"/>
                        <TextInput name="email" source="email" helperText="Email must match employees log in email"/>
                        <ReferenceInput name="manager" source="manager" reference="employee">
                            <AutocompleteInput label="Manager"
                                               matchSuggestion={(filter, choice) => choice.name.toLowerCase().includes(filter.toLowerCase())} defaultValue={defaultValue} disabled={isManager}/>
                        </ReferenceInput>
                        <BooleanInput name="active" source="active" defaultValue={true} helperText="Active employees receive a performance review"/>
                    </Stack>
                    <Stack direction='column' spacing={2}>
                        <TextInput name="jobTitle" source="jobTitle"/>
                        <SelectInput name="role" source="role" label="User Type" choices={allowedRoles}/>
                        <EmployeeLevelSelectInput/>
                    </Stack>
                </Stack>
            </SimpleForm>
    )
}

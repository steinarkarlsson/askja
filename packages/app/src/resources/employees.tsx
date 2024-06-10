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
import {Stack} from '@mui/material';
import {ZodError} from 'zod'
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
        <SimpleForm validate={async(data) => {
            const errors :Record<string, string>={}
            try {
                employeeSchema.parse(data)
            }catch (e){
                if (e instanceof ZodError) {
                    console.log(e.flatten())
                }
                return {
                    'name': 'Is a requi'
                }
            }
            //
            return errors
        }}>
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
                    <AutocompleteInput label='Employee level' name="level" source="level"
                                       choices={mapArrayToChoices(levelsSchema._def.values)}/>
                </Stack>
            </Stack>


        </SimpleForm>
)

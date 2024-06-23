import React from 'react';
import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    FunctionField,
    List,
    ReferenceInput,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
    useGetList,
} from 'react-admin';


export const EmployeeLevelList = (props: any) => {
    const {data} = useGetList('employeeLevel');

    return (
        <List
            {...props}
            sx={{padding: '20px'}}
        >
            <Datagrid>
                <FunctionField label="Name" render={record => {
                    const parent = data?.find((d: any) => d.id === record.parentId);
                    if (parent) {
                        return `${parent.name} - ${record.name}`
                    }
                    return record.name
                }}/>
                <EditButton label="Edit"/>
            </Datagrid>
        </List>
    )
};

export const EmployeeLevelShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
        </SimpleShowLayout>
    </Show>
);
export const EmployeeLevelEdit = (props: any) => (
    <Edit {...props}>
        <EmployeeLevelEditCreate/>
    </Edit>
);

export const EmployeeLevelCreate = (props: any) => (
    <Create {...props}>
        <EmployeeLevelEditCreate/>
    </Create>
);

export const EmployeeLevelEditCreate = () => (
    <SimpleForm>
        <TextInput source='name'/>
        <ReferenceInput source='parentId' reference='employeeLevel' defaultValue=""/>
    </SimpleForm>
)

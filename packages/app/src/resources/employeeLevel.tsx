import React from 'react';
import {
    BooleanField,
    BooleanInput,
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
                    pagination={false}
                    sort={{field: 'parentId', order: 'ASC'}}
            >
                <Datagrid>
                    <FunctionField label="Name" render={(record) => {
                        const parent = data?.find((d: any) => d.id === record.parentId);
                        if (parent) {
                            return `${parent.name} - ${record.name}`
                        }
                        return record.name
                    }}/>
                    <BooleanField source='selfReview' valueLabelTrue='Enabled'/>
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
            <BooleanInput source='selfReview'/>
        </SimpleForm>
)

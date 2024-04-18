import {ReferenceField,Datagrid, EmailField, List, TextField} from 'react-admin';

export const EmployeeList = () => {

    <List>
        <Datagrid rowClick={'edit'}>
            <TextField source="id"/>
            <TextField source="name"/>
            <ReferenceField source="jobTitle"/>
            <EmailField source="email"/>
        </Datagrid>
    </List>
}
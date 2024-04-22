import {
    AutocompleteInput,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceInput,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
    ReferenceField
} from 'react-admin';
import {useChoices} from "../lib/useChoices";
import {levels} from "../schemas/levels";

const EmployeeFilter = (props: any) => {
    return (<Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn/>
    </Filter>);
};


export const EmployeeList = (props: any) => (
    <List {...props} filters={<EmployeeFilter/>}>
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
            <AutocompleteInput source="level" choices={useChoices(levels)}/>
            <BooleanInput source="active"/>
            <ReferenceInput source="manager" reference="employee"/>
        </SimpleForm>
    </Edit>
);

export const EmployeeCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="jobTitle"/>
            <AutocompleteInput source="level" choices={useChoices(levels)}/>
            <BooleanInput source="active"/>
            <ReferenceInput source="manager" reference="employee"/>
        </SimpleForm>
    </Create>
);

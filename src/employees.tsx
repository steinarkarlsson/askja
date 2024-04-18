import {
    AutocompleteInput,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    FileField,
    FileInput,
    Filter,
    List,
    SelectInput,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput, ReferenceField
} from 'react-admin';
import {RichTextInput} from "ra-input-rich-text";

const EmployeeFilter = (props: any) => {
    return (<Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn/>
    </Filter>);
};


export const EmployeeList = (props: any) => (
    <List {...props} filters={<EmployeeFilter/>}>
        <Datagrid>
            <TextField source="name"/>
            <TextField source="manager"/>
            <TextField source="jobTitle"/>
            <TextField source="level"/>
        </Datagrid>
    </List>
);

export const EmployeeShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="name"/>
            <TextField source="managerId"/>
            <ReferenceField source="jobTitle"/>
        </SimpleShowLayout>
    </Show>
);
export const EmployeeEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title"/>
            <RichTextInput source="body"/>
            <SelectInput
                source="rating"
                choices={[
                    {id: 1, name: "Good"},
                    {id: 2, name: "Okay"},
                    {id: 3, name: "Bad"}
                ]}
            />
            <FileInput source="file" label="File" accept="application/pdf">
                <FileField source="src" title="title"/>
            </FileInput>
        </SimpleForm>
    </Edit>
);

export const EmployeeCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="Job Title"/>
            <AutocompleteInput source="Level" choices={[
                {id: 5, name: "Executive Leader"},
                {id: 4, name: "Head of Department"},
                {id: 3, name: "Senior Professional"},
                {id: 2, name: "Professional"},
                {id: 1, name: "Support"},
            ]}/>
            <BooleanInput source="Active" options={{color: "warning"}}/>
            <AutocompleteInput source="direct manager" choices={[
                {id: 1, name: "Test manager 1"},
                {id: 2, name: "Test manager 2"},
                {id: 3, name: "Test manager 3"},
                {id: 4, name: "Test manager 4"},
            ]}/>
        </SimpleForm>
    </Create>
);

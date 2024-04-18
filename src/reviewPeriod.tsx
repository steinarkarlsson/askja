import {
    AutocompleteInput,
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
    TextInput, ReferenceField, DateInput
} from 'react-admin';
import {RichTextInput} from "ra-input-rich-text";

const ReviewPeriodFilter = (props: any) => {
    return (<Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn/>
    </Filter>);
};


export const ReviewPeriodList = (props: any) => (
    <List {...props} filters={<ReviewPeriodFilter/>}>
        <Datagrid>
            <TextField source="title"/>
            <TextField source="start date"/>
            <TextField source="end date"/>
            <TextField source="type"/>
        </Datagrid>
    </List>
);

export const ReviewPeriodShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id"/>
            <TextField source="managerId"/>
            <ReferenceField source="jobTitle"/>
        </SimpleShowLayout>
    </Show>
);
export const ReviewPeriodEdit = (props: any) => (
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

export const ReviewPeriodCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title"/>
            <DateInput source="start date"/>
            <DateInput source="end date"/>
            <AutocompleteInput source="type" choices={[
                {id: "endOfYear", name: "End of Year"},
                {id: "midYear", name: "Mid Year"},
            ]}/>
        </SimpleForm>
    </Create>
);

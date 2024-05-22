import {
    ArrayField,
    ArrayInput,
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DeleteButton,
    Edit,
    EditButton,
    Filter,
    List,
    required,
    RichTextField,
    SaveButton,
    SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
    TextInput,
    Toolbar
} from 'react-admin';
import {RichTextInput} from "ra-input-rich-text";
import {levels} from "../schemas/levels";
import {categories} from "../schemas/categories";
import {types} from "../schemas/types";
import {mapArrayToChoices} from "../lib/mapArrayToChoices";

export const ReviewSaveButton = () => {
    const record = useRecordContext();
    const [update] = useUpdate();
    const handleClick = () => {
        update(
            'status',
            {id: record.id, data: {status: 'submitted'}, previousData: record}
        )
    }
    return <SaveButton label="Submit"
                       handleSubmit={handleClick}
    />
}

const ReviewToolbar = () => (
    <Toolbar>
        <ReviewSaveButton/>
        <DeleteButton/>
    </Toolbar>
);

const TemplateFilter = (props: any) => {
    return (<Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn/>
    </Filter>);
};

export const TemplateList = (props: any) => (
    <List {...props} filters={<TemplateFilter/>}>
        <Datagrid>
            <TextField source="jobTitle"/>
            <TextField source="level"/>
            <TextField source="type"/>
            <BooleanField source="active"/>
            <EditButton label="Edit"/>
            <ShowButton label="Show"/>
        </Datagrid>
    </List>
);

export const TemplateShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="jobTitle"/>
            <TextField source="level"/>
            <TextField source="active"/>
            <TextField source="type"/>
            <ArrayField source="competencies">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="Category"/>
                    <TextField source="Title"/>
                    <RichTextField source="Description"/>
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);

export const TemplateEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm toolbar={<ReviewToolbar/>}>
            <TextInput source="jobTitle"/>
            <SelectInput source="level" choices={mapArrayToChoices(levels)} validate={required()}/>
            <BooleanInput source="active"/>
            <SelectInput source="type" choices={mapArrayToChoices(types)} validate={required()}/>
            <ArrayInput source="competencies">
                <SimpleFormIterator inline>
                    <SelectInput source="Category" choices={mapArrayToChoices(categories)}/>
                    <TextInput source="Title"/>
                    <RichTextInput source="Description"/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const TemplateCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="jobTitle"/>
            <SelectInput source="level" choices={mapArrayToChoices(levels)} validate={required()}/>
            <BooleanInput source="active"/>
            <SelectInput source="type" choices={mapArrayToChoices(types)} validate={required()}/>
            <ArrayInput source="competencies">
                <SimpleFormIterator inline>
                    <SelectInput source="Category" choices={mapArrayToChoices(categories)}/>
                    <TextInput source="Title"/>
                    <RichTextInput source="Description"/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

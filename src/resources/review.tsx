import {
    ArrayField,
    ArrayInput,
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    EditButton,
    Filter,
    List,
    required,
    RichTextField,
    SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
    TextInput,
    Toolbar,
    SaveButton,
    DeleteButton
} from 'react-admin';
import {RichTextInput, RichTextInputToolbar} from "ra-input-rich-text";
import {levels} from "../schemas/levels";
import {categories} from "../schemas/categories";
import {types} from "../schemas/types";
import {mapArrayToChoices} from "../lib/mapArrayToChoices";
import {CustomRichTextInput} from "../components/CustomRichTextInput";

export const ReviewSaveButton = () => {
    // const record = useRecordContext();
    // const [update] = useUpdate();
    // const handleClick = () => {
    //     update(
    //         'status',
    //         { id: record.id, data: {status: 'submitted'}, previousData: record }
    //     )
    // }
    return <SaveButton label="Submit"
                       //handleSubmit={handleClick}
    />
}

const ReviewToolbar = () => (
    <Toolbar>
        <ReviewSaveButton/>
        <DeleteButton/>
    </Toolbar>
);

const ReviewFilter = (props: any) => {
    return (<Filter {...props} >
        <TextInput label="Search" source="title" alwaysOn/>
    </Filter>);
};

export const ReviewList = (props: any) => (
    <List {...props} filters={<ReviewFilter/>}>
        <Datagrid>
            <TextField source="employeeName"/>
            <TextField source="jobTitle"/>
            <TextField source="level"/>
            <TextField source="type"/>
            <BooleanField source="active"/>
            <EditButton label="Edit"/>
            <ShowButton label="Show"/>
        </Datagrid>
    </List>
);

export const ReviewShow = (props: any) => (
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

export const ReviewEdit = (props: any) => (
    <Edit {...props} >
        <SimpleForm toolbar={<ReviewToolbar/>}>
            <TextField source="jobTitle" />
            <TextField source="level" choices={mapArrayToChoices(levels)} validate={required()}/>
            <BooleanField source="active"/>
            <TextField source="type" choices={mapArrayToChoices(types)} validate={required()}/>
            <ArrayInput source="competencies">
                <SimpleFormIterator inline>
                    <SelectInput source="Category" choices={mapArrayToChoices(categories)}/>
                    <TextInput source="Title"/>
                    <CustomRichTextInput source="description" label="Description"/>
                    <CustomRichTextInput source="managerComment" label="Manager Comment"/>
                    <SelectInput source="managerApproved" label="Manager Review" choices={mapArrayToChoices(['Approved', 'Request Changes'])} />
                    <CustomRichTextInput source="HrComment" label="HR Comment"/>
                    <SelectInput source="HrApproved" label="HR Review"choices={mapArrayToChoices(['Approved', 'Request Changes'])}/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const ReviewCreate = (props: any) => (
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

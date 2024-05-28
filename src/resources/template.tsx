import React from 'react';
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
    SaveButton,
    SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
    TextInput,
    useRecordContext,
    useUpdate
} from 'react-admin';
import {RichTextInput} from 'ra-input-rich-text';
import {CompetencyCategory, CompetencyType, Levels} from '../schemas';
import {mapArrayToChoices} from '../lib/mapArrayToChoices';

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

// const ReviewToolbar = () => (
//     <Toolbar>
//         <ReviewSaveButton/>
//         <DeleteButton/>
//     </Toolbar>
// );

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
        <TemplateEditCreate/>
    </Edit>
);

export const TemplateCreate = (props: any) => (
    <Create {...props}>
        <TemplateEditCreate/>
    </Create>
);

const TemplateEditCreate = () => (
    <SimpleForm>
        <TextInput source="jobTitle"/>
        <SelectInput source="level" choices={mapArrayToChoices(Levels)} validate={required()}/>
        <BooleanInput source="active"/>
        <SelectInput source="type" choices={mapArrayToChoices(CompetencyType.options)} validate={required()}/>
        <ArrayInput source="competencies">
            <SimpleFormIterator inline>
                <SelectInput source="Category" choices={mapArrayToChoices(CompetencyCategory.options)}/>
                <TextInput source="Title"/>
                <RichTextInput source="Description"/>
            </SimpleFormIterator>
        </ArrayInput>
    </SimpleForm>
);
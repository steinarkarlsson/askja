import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {competencyCategorySchema} from '@jucy-askja/common/schemas/CompetencyCategory';
import {competencyTypeSchema} from '@jucy-askja/common/schemas/CompetencyType';
import {levelsSchema} from '@jucy-askja/common/schemas/Levels';
import {RichTextInput} from 'ra-input-rich-text';
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
    SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
    TextInput,
} from 'react-admin';
const TemplateFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput name="search" label="Search" source="title" alwaysOn/>
            </Filter>
    );
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
                        <TextField source="category"/>
                        <TextField source="title"/>
                        <RichTextField source="description"/>
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
            <TextInput name="jobTitle" source="jobTitle" defaultValue=""/>
            <SelectInput
                    name="level"
                    source="level"
                    choices={mapArrayToChoices(levelsSchema._def.values)}
                    validate={required()}
            />
            <BooleanInput name="active" source="active"/>
            <SelectInput
                    name="type"
                    source="type"
                    choices={mapArrayToChoices(competencyTypeSchema._def.values)}
                    validate={required()}
            />
            <ArrayInput source="competencies">
                <SimpleFormIterator inline>
                    <SelectInput
                            source="category"
                            choices={mapArrayToChoices(competencyCategorySchema._def.values)}
                    />
                    <TextInput source="title"/>
                    <RichTextInput source="description"/>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
);

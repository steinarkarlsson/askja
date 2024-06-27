import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {competencyTypeSchema} from '@jucy-askja/common/schemas/CompetencyType';
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
    List,
    ReferenceField,
    ReferenceInput,
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
import {Stack} from '@mui/material';
import {EmployeeLevelSelectInput} from '../components/EmployeeLevelSelectInput';
import {EmployeeLevelSelectField} from '../EmployeeLevelSelectField';

export const TemplateList = (props: any) => (
        <List {...props} pagination={false}>
            <Datagrid>
                <EmployeeLevelSelectField label='Template Level'/>
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
                <ReferenceField source='employeeLevel' reference='employeeLevel' label=''/>
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

const TemplateEditCreate = () => {
    return (
            <SimpleForm>
                <Stack width={300}>
                    <EmployeeLevelSelectInput/>
                    <SelectInput
                            name="type"
                            source="type"
                            choices={mapArrayToChoices(competencyTypeSchema._def.values)}
                            validate={required()}
                    />
                    <BooleanInput name="active" source="active"/>
                </Stack>
                <ArrayInput source="competencies" label="KPIs">
                    <SimpleFormIterator inline>
                        <ReferenceInput
                                source="competencyCategory"
                                reference="competencyCategory"
                                label="KPI Category"
                        />
                        <TextInput source="title" sx={{marginTop: 1}}/>
                        <RichTextInput source="description"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
    )
}

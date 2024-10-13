import React from 'react';
import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    List,
    SelectInput,
    Show,
    SimpleForm,
    SimpleShowLayout,
    TextField,
    TextInput,
} from 'react-admin';
import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {competencyTypeSchema} from '@performus/common/schemas/CompetencyType';
import {Stack} from '@mui/material';

export const CompetencyCategoryList = (props: any) => {
    return (
            <List
                    {...props}
                    pagination={false}
            >
                <Datagrid>
                    <TextField source="name"/>
                    <TextField source='type'/>
                    <EditButton label="Edit"/>
                </Datagrid>
            </List>
    )
};

export const CompetencyCategoryShow = (props: any) => (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="id"/>
            </SimpleShowLayout>
        </Show>
);
export const CompetencyCategoryEdit = (props: any) => (
        <Edit {...props}>
            <CompetencyCategoryEditCreate/>
        </Edit>
);

export const CompetencyCategoryCreate = (props: any) => (
        <Create {...props}>
            <CompetencyCategoryEditCreate/>
        </Create>
);

export const CompetencyCategoryEditCreate = () => (
        <SimpleForm>
            <Stack sx={{width: 300}}>
                <TextInput source='name'/>
                <SelectInput source='type' choices={mapArrayToChoices(competencyTypeSchema._def.values)}/>
            </Stack>
        </SimpleForm>
)

import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {competencyCategorySchema} from '@jucy-askja/common/schemas/CompetencyCategory';
import {competencyTypeSchema} from '@jucy-askja/common/schemas/CompetencyType';
import {Grid} from '@mui/material';
import React from 'react';
import {
    ArrayField,
    ArrayInput,
    Datagrid,
    Edit,
    Filter,
    List,
    ReferenceField,
    RichTextField,
    SelectInput,
    Show,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
    TextInput,
    Title,
} from 'react-admin';
import {CustomRichTextInput} from '../components/CustomRichTextInput';
import {SMARTGoals} from '../components/SMARTGoals';
import {ReviewToolbar} from '../components/ReviewToolbar';
import {StartReviewButton} from '../components/StartReviewButton';

const SelfReviewFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="title" alwaysOn name="search"/>
            </Filter>
    );
};

const competencyCategories = mapArrayToChoices(competencyCategorySchema._def.values);

export const SelfReviewList = (props: any) => {
    return (
            <List {...props} filters={<SelfReviewFilter/>}>
                <Datagrid>
                    <TextField source="employeeName"/>
                    <ReferenceField source="managerId" reference="employee"/>
                    <TextField source="jobTitle"/>
                    <StartReviewButton reviewType={'selfReview'}/>
                </Datagrid>
            </List>
    )
}

export const SelfReviewShow = (props: any) => (
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
                        <RichTextField source="description"/>
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
);

export const SelfReviewEdit = () => (
        <Edit>
            <SMARTGoals/>
            <SimpleForm toolbar={<ReviewToolbar reviewType="selfReview"/>}>
                <Grid>
                    <Title title="Employee Name"/>
                    <TextField source="employeeName"/>
                </Grid>

                <TextField source="jobTitle"/>
                <TextField
                        source="type"
                        choices={mapArrayToChoices(competencyTypeSchema._def.values)}
                />
                <ArrayInput source="competencies" name="Competencies">
                    <SimpleFormIterator
                            disableClear
                            disableReordering
                            sx={{
                                '& .RaSimpleFormIterator-form': {
                                    display: 'grid',
                                    gap: 2,
                                    marginTop: '20px'
                                },
                                '& .category': {
                                    gridColumn: '1 / 1',
                                    gridRow: '1 / 1',
                                    width: '150px',
                                },
                                '& .title': {
                                    gridColumn: '2 / 2',
                                    gridRow: '1 / 2',
                                    width: '400px',
                                    marginTop: '8px'
                                },

                                '& .description': {
                                    gridColumn: '2 / 3',
                                    gridRow: '2 / 2',
                                    width: '400px',
                                },
                            }}>
                        <SelectInput className="category" source="Category" name="Category"
                                     choices={competencyCategories}/>
                        <CustomRichTextInput className="description" source="description" label="Description"/>
                        <TextInput className="title" source="Title" name="Title"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
);

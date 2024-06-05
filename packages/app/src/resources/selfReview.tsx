import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {competencyCategorySchema} from '@jucy-askja/common/schemas/CompetencyCategory';
import {competencyTypeSchema} from '@jucy-askja/common/schemas/CompetencyType';
import {Box, Grid} from '@mui/material';
import React from 'react';
import {
    ArrayField,
    ArrayInput,
    BooleanField,
    Datagrid,
    DeleteButton,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceField,
    RichTextField,
    SaveButton,
    SelectInput,
    Show,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
    TextInput,
    Title,
    Toolbar,
} from 'react-admin';
import {CustomRichTextInput} from '../components/CustomRichTextInput';

export const SelfReviewSaveButton = () => {
    return <SaveButton label="Submit"/>;
};

const SelfReviewToolbar = () => (
        <Toolbar>
            <SelfReviewSaveButton/>
            <DeleteButton/>
        </Toolbar>
);

const SelfReviewFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="title" alwaysOn name="search"/>
            </Filter>
    );
};

const competencyCategories = mapArrayToChoices(competencyCategorySchema._def.values);

export const SelfReviewList = (props: any) => (
        <List {...props} filters={<SelfReviewFilter/>}>
            <Datagrid>
                <TextField source="employeeName"/>
                <ReferenceField source="manager" reference="employee"/>
                <TextField source="jobTitle"/>
                <BooleanField source="active"/>
                <EditButton label="Edit"/>
            </Datagrid>
        </List>
);

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
            <Box sx={{border:1, borderRadius:'15px', borderColor:'lightgray', display:'flex', flexDirection:'column', justifyContent:'center', margin:'20px', padding:'20px', alignItems:"center"}}>
                <h3>Make sure your goals are SMART:</h3>
                <ul>
                    <li><b>S</b>pecific (simple, sensible, significant).</li>
                    <li><b>M</b>easurable (meaningful, motivating).</li>
                    <li><b>A</b>chievable (agreed, attainable).</li>
                    <li><b>R</b>elevant (reasonable, realistic and resourced, results-based).</li>
                    <li><b>T</b>ime bound (time-based, time limited, time/cost limited, timely, time-sensitive).</li>
                </ul>
            </Box>
            <SimpleForm toolbar={<SelfReviewToolbar/>}>
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

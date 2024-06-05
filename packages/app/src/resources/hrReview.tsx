import {CustomRichTextInput} from '../components/CustomRichTextInput';
import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {competencyCategorySchema} from '@jucy-askja/common/schemas/CompetencyCategory';
import {competencyTypeSchema} from '@jucy-askja/common/schemas/CompetencyType';
import {competencyReviewStatusSchema} from '@jucy-askja/common/schemas/CompetencyReviewStatus';
import {Grid, Stack} from '@mui/material';
import React from 'react';
import {
    ArrayField,
    ArrayInput,
    BooleanField,
    Create,
    Datagrid,
    DeleteButton,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceInput,
    required,
    RichTextField,
    SaveButton,
    SelectField,
    SelectInput,
    Show,
    ShowButton,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
    TextInput,
    Title,
    Toolbar,
} from 'react-admin';
import {ClearButtons, FormatButtons, ListButtons, RichTextInput, RichTextInputToolbar} from "ra-input-rich-text";
import {repeat} from "lodash";

export const HrReviewSaveButton = () => {
    return <SaveButton label="Submit"/>;
};

const HrReviewToolbar = () => (
        <Toolbar>
            <HrReviewSaveButton/>
            <DeleteButton/>
        </Toolbar>
);

const HrReviewFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="title" alwaysOn/>
            </Filter>
    );
};

const competencyReviewStatuses = mapArrayToChoices(competencyReviewStatusSchema._def.values);
const competencyCategories = mapArrayToChoices(competencyCategorySchema._def.values);
export const HrReviewList = (props: any) => (
        <List {...props} filters={<HrReviewFilter/>}>
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

export const HrReviewShow = (props: any) => (
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

export const HrReviewEdit = () => (
        <Edit>
            <SimpleForm toolbar={<HrReviewToolbar/>}>
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
                            disableAdd
                            disableClear
                            disableReordering
                            disableRemove
                            sx={{
                                '& .RaSimpleFormIterator-form': {
                                    display: 'grid',
                                    gap: 2,
                                    marginTop: '20px'
                                },
                                '& .category': {
                                    'grid-column': '1 / 1',
                                    'grid-row': '1 / 1',
                                    width: '150px',
                                },
                                '& .title': {
                                    'grid-column': '2 / 2',
                                    'grid-row': '1 / 2',
                                    width: '400px',
                                },

                                '& .description': {
                                    'grid-column': '2 / 3',
                                    'grid-row': '2 / 2',
                                    width: '400px',
                                    marginTop:'42px'
                                },
                                '& .managerApproved': {
                                    'grid-column': '4 / 5',
                                    'grid-row': '1 / 2',
                                    width: '300px',

                                },
                                '& .managerComment': {
                                    'grid-column': '4 / 5',
                                    'grid-row': '2 / 2',
                                    width: '300px',
                                    marginTop:'42px'
                                },
                                '& .hrApproved': {
                                    'grid-column': '7 / 8',
                                    'grid-row': '1 / 2',
                                    width: '400px',
                                    marginTop: '0px'
                                },
                                '& .hrComment': {
                                    'grid-column': '7 / 8',
                                    'grid-row': '2 / 2',
                                    width: '400px',
                                },
                            }}>
                        <TextInput disabled={true} className="category" source="Category" name="Category"/>
                        <RichTextInput disabled={true} toolbar={<></>} className="description" source="description"
                                       label="Description"/>
                        <TextInput disabled={true} className="title" source="Title" name="Title"/>
                        <RichTextInput disabled={true} fullWidth={true} toolbar={<></>} className="managerComment"
                                       source="managerComment" label="Manager Comment"/>
                        <TextInput disabled={true} className="managerApproved" source="managerApproved"
                                   label="Manager Review" name="Manager Review"/>
                        <RichTextInput  toolbar={
                            <RichTextInputToolbar size="small">
                                <FormatButtons />
                                <ListButtons/>
                                <ClearButtons/>
                            </RichTextInputToolbar>
                        }
                                        fullWidth
                                        className="hrComment" source="HrComment" label="HR Comment"/>
                        <SelectInput className="hrApproved" source="HrApproved" label="HR Review"
                                     choices={competencyReviewStatuses}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
);

export const HrReviewCreate = (props: any) => (
        <Create {...props}>
            <SimpleForm toolbar={<HrReviewToolbar/>}>
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
                    <SimpleFormIterator>
                        <TextField source="Category" name="Category" choices={competencyCategories}/>
                        <TextField source="Title" name="Title"/>
                        <RichTextField source="description" label="Description"/>
                        <RichTextField source="managerComment" label="Manager Comment"/>
                        <SelectField source="managerApproved" label="Manager Review"
                                     choices={competencyReviewStatuses}/>
                        <RichTextInput source="HrComment" label="HR Comment" name='HR Comment'/>
                        <SelectInput source="HrApproved" label="HR Review" choices={competencyReviewStatuses}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
);

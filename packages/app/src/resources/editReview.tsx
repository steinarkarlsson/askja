import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {reviewStatusSchema} from '@jucy-askja/common/schemas/ReviewStatus';
import {competencyReviewStatusSchema} from '@jucy-askja/common/schemas/CompetencyReviewStatus';
import React from 'react';
import {
    ArrayField,
    ArrayInput,
    Create,
    Datagrid,
    Edit,
    EditButton,
    Filter,
    List,
    ReferenceField,
    ReferenceInput,
    RichTextField,
    SelectInput,
    Show,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    TextField,
    TextInput,
} from 'react-admin';
import {CustomRichTextInput} from '../components/CustomRichTextInput';
import {Divider, Grid, Stack} from '@mui/material';

const competencyReviewStatuses = mapArrayToChoices(competencyReviewStatusSchema._def.values);

const ReviewFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="employeeName" alwaysOn/>
            </Filter>
    );
};

export const editReviewList = (props: any) => (
        <List {...props} filters={<ReviewFilter/>} sort={{field: 'status', order:'DESC'}}>
            <Datagrid>
                <TextField source="employeeName"/>
                <TextField source="reviewPeriodName"/>
                <ReferenceField source="manager" reference="employee" link={false}/>
                <TextField source="jobTitle"/>
                <EditButton label="Edit"/>
            </Datagrid>
        </List>
);

export const editReviewShow = (props: any) => (
        <Show {...props}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <SimpleShowLayout>
                        <TextField source="employeeName"/>
                        <TextField source="jobTitle"/>
                        <ReferenceField source="manager" reference="employee"/>
                    </SimpleShowLayout>
                </Grid>
                <Grid item xs={6}>
                    <SimpleShowLayout>
                        <TextField source="reviewPeriodName"/>
                        <ReferenceInput source='reviewPeriod' reference='reviewPeriod'/>
                        <TextField source="status"/>
                    </SimpleShowLayout>
                </Grid>
            </Grid>
            <SimpleShowLayout>

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

export const editReviewEdit = () => {
    return (
            <Edit>
                <SimpleForm>
                    <Stack direction="row" spacing={10}>
                        <Stack direction='column' spacing={2} width={300}>
                            <ReferenceInput source='employeeId' reference='employee'/>
                        </Stack>
                        <Stack direction='column' spacing={2} width={300}>
                            <ReferenceInput source='manager' reference='employee'/>
                        </Stack>
                        <Stack direction='column' spacing={2} width={300}>
                            <SelectInput source='status' choices={mapArrayToChoices(reviewStatusSchema._def.values)}/>
                        </Stack>
                    </Stack>
                    <ArrayInput source="competencies" >
                        <SimpleFormIterator
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
                                    },

                                    '& .description': {
                                        gridColumn: '2 / 3',
                                        gridRow: '2 / 2',
                                        width: '400px',
                                    },
                                    '& .managerApproved': {
                                        gridColumn: '4 / 5',
                                        gridRow: '1 / 2',
                                        width: '300px',

                                    },
                                    '& .managerComment': {
                                        gridColumn: '4 / 5',
                                        gridRow: '2 / 2',
                                        width: '300px',
                                    },
                                    '& .hrApproved': {
                                        gridColumn: '7 / 8',
                                        gridRow: '1 / 2',
                                        width: '400px',
                                        marginTop: '0px'
                                    },
                                    '& .hrComment': {
                                        gridColumn: '7 / 8',
                                        gridRow: '2 / 2',
                                        width: '400px',
                                    },
                                }}>
                            <ReferenceInput  className="competencyCategory" reference='competencyCategory' source="competencyCategory"/>
                            <CustomRichTextInput className="description" source="description" label="Description"/>
                            <TextInput  className="title" source="title"/>
                            <CustomRichTextInput className="managerComment" source="managerComment" label="Manager Comment"/>
                            <SelectInput choices={competencyReviewStatuses}  className="managerApproved" source="managerApproved" label="Manager Review"/>
                            <CustomRichTextInput className="hrComment" source="hrComment" label="HR Comment"/>
                            <SelectInput className="hrApproved" source="hrApproved" label="HR Review" choices={competencyReviewStatuses}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleForm>
            </Edit>
    )
};

export const editReviewCreate = () => {
    return (
            <Create>
                <SimpleForm>
                    <Stack direction="row" spacing={10}>
                        <Stack direction='column' spacing={2} width={300}>
                            <ReferenceInput source='employeeId' reference='employee'/>
                            <ReferenceInput source='manager' reference='employee'/>
                        </Stack>
                        <Stack direction='column' spacing={2} width={300}>
                            <ReferenceInput source='reviewPeriodId' reference='reviewPeriod'/>
                            <SelectInput source='status' choices={mapArrayToChoices(reviewStatusSchema._def.values)}/>
                        </Stack>
                    </Stack>
                    <ArrayInput source="competencies" name="Competencies">
                        <SimpleFormIterator
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
                                        gridColumn: '2 / 3',
                                        gridRow: '1 / 2',
                                        width: '400px',
                                    },

                                    '& .description': {
                                        gridColumn: '2 / 3',
                                        gridRow: '2 / 2',
                                        width: '400px',
                                    },
                                    '& .managerApproved': {
                                        gridColumn: '4 / 5',
                                        gridRow: '1 / 2',
                                        width: '300px',

                                    },
                                    '& .managerComment': {
                                        gridColumn: '4 / 5',
                                        gridRow: '2 / 2',
                                        width: '300px',
                                    },
                                    '& .hrApproved': {
                                        gridColumn: '6 / 7',
                                        gridRow: '1 / 2',
                                        width: '300px',
                                        marginTop: '0px'
                                    },
                                    '& .hrComment': {
                                        gridColumn: '6 / 7',
                                        gridRow: '2 / 2',
                                        width: '300px',
                                    },
                                }}>
                            <ReferenceInput  className="competencyCategory" reference='competencyCategory' source="competencyCategory" name="category"/>
                            <CustomRichTextInput className="description" source="description" label="Description"/>
                            <TextInput  className="title" source="title"/>
                            <CustomRichTextInput className="managerComment" source="managerComment" label="Manager Comment"/>
                            <SelectInput choices={competencyReviewStatuses}  className="managerApproved" source="managerApproved" label="Manager Review"/>
                            <CustomRichTextInput className="hrComment" source="hrComment" label="HR Comment"/>
                            <SelectInput className="hrApproved" source="hrApproved" label="HR Review" choices={competencyReviewStatuses}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleForm>
            </Create>
    )
};
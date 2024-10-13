import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {reviewStatusSchema} from '@performus/common/schemas/ReviewStatus';
import {competencyReviewStatusSchema} from '@performus/common/schemas/CompetencyReviewStatus';
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
import {Grid, Stack} from '@mui/material';
import {styles} from '../components/review/styles';

const competencyReviewStatuses = mapArrayToChoices(competencyReviewStatusSchema._def.values);

const ReviewFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="employeeName" alwaysOn/>
            </Filter>
    );
};

export const editReviewList = (props: any) => (
        <List {...props} filters={<ReviewFilter/>} sort={{field: 'status', order: 'DESC'}}>
            <Datagrid>
                <TextField source="employeeName"/>
                <TextField source="reviewPeriodName"/>
                <ReferenceField source="manager" reference="employee" link={false}/>
                <TextField source="jobTitle"/>
                <EditButton label="Edit" />
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
                    <ArrayInput source="competencies">
                        <SimpleFormIterator sx={styles}>
                            <ReferenceInput className="competencyCategory" reference='competencyCategory'
                                            source="competencyCategory"/>
                            <CustomRichTextInput className="description" source="description" label="Description"/>
                            <TextInput className="title" source="title"/>
                            <CustomRichTextInput className="managerComment" source="managerComment"
                                                 label="Manager Comment"/>
                            <SelectInput choices={competencyReviewStatuses} className="managerApproved"
                                         source="managerApproved" label="Manager Review"/>
                            <CustomRichTextInput className="hrComment" source="hrComment" label="HR Comment"/>
                            <SelectInput className="hrApproved" source="hrApproved" label="HR Review"
                                         choices={competencyReviewStatuses}/>
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
                        <SimpleFormIterator sx={styles}>
                            <ReferenceInput className="competencyCategory" reference='competencyCategory'
                                            source="competencyCategory" name="category"/>
                            <CustomRichTextInput className="description" source="description" label="Description"/>
                            <TextInput className="title" source="title"/>
                            <CustomRichTextInput className="managerComment" source="managerComment"
                                                 label="Manager Comment"/>
                            <SelectInput choices={competencyReviewStatuses} className="managerApproved"
                                         source="managerApproved" label="Manager Review"/>
                            <CustomRichTextInput className="hrComment" source="hrComment" label="HR Comment"/>
                            <SelectInput className="hrApproved" source="hrApproved" label="HR Review"
                                         choices={competencyReviewStatuses}/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleForm>
            </Create>
    )
};

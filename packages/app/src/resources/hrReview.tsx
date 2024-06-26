import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {competencyTypeSchema} from '@jucy-askja/common/schemas/CompetencyType';
import {competencyReviewStatusSchema} from '@jucy-askja/common/schemas/CompetencyReviewStatus';
import React from 'react';
import {
    ArrayField,
    ArrayInput,
    Datagrid,
    Edit, Filter,
    List,
    ReferenceField,
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
import {RichTextInput} from 'ra-input-rich-text';
import {CustomRichTextInput} from '../components/CustomRichTextInput';
import {ReviewToolbar} from '../components/review/ReviewToolbar';
import {StartReviewButton} from '../components/review/StartReviewButton';
import {ReviewTitlePanel} from '../components/review/ReviewTitlePanel';
import {Grid} from '@mui/material';
import {styles} from '../components/review/styles';

const competencyReviewStatuses = mapArrayToChoices(competencyReviewStatusSchema._def.values);

const ReviewFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="employeeName" alwaysOn/>
            </Filter>
    );
};

export const HrReviewList = (props: any) => (
        <List {...props} filters={<ReviewFilter/>} sort={{field: 'status', order:'DESC'}}>
            <Datagrid>
                <TextField source="employeeName"/>
                <ReferenceField source="manager" reference="employee" link={false}/>
                <TextField source="jobTitle"/>
                <StartReviewButton reviewType={'hrReview'}/>
                <ShowButton label="View"/>
            </Datagrid>
        </List>
);

export const HrReviewShow = (props: any) => (
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

export const HrReviewEdit = () => {

    return (
            <Edit>
                <SimpleForm toolbar={<ReviewToolbar reviewType={'hrReview'}/>}>
                    <ReviewTitlePanel/>
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
                                sx={styles}>
                            <ReferenceField link={false} className="category" source="competencyCategory" reference="competencyCategory" sx={{marginTop: 2}}/>
                            <RichTextInput disabled={true} toolbar={<></>} className="description" source="description"
                                           label="Description" name="description"/>
                            <TextInput disabled={true} className="title" source="title" name="title"/>
                            <RichTextInput disabled={true} toolbar={<></>} className="managerComment"
                                           source="managerComment" label="Manager Comment" name="Manager Comment"/>
                            <TextInput disabled={true} className="managerApproved" source="managerApproved"
                                       label="Manager Review" name="Manager Review"/>
                            <CustomRichTextInput className="hrComment" source="hrComment" label="HR Comment"/>
                            <SelectInput className="hrApproved" source="hrApproved" label="HR Review"
                                         choices={competencyReviewStatuses} required/>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleForm>
            </Edit>
    )
};

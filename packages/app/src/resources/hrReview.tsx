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
import {FormDataConsumer} from 'ra-core';
import {ReviewShow} from '../components/review/ReviewShow';

const competencyReviewStatuses = mapArrayToChoices(competencyReviewStatusSchema._def.values);

const ReviewFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="employeeName" alwaysOn/>
            </Filter>
    );
};

export const HrReviewList = (props: any) => (
        <List {...props} filters={<ReviewFilter/>} sort={{field: 'status', order: 'DESC'}}>
            <Datagrid>
                <TextField source="employeeName"/>
                <ReferenceField source="manager" reference="employee" link={false}/>
                <TextField source="jobTitle"/>
                <StartReviewButton reviewType={'hrReview'}/>
                <ShowButton label="View" variant="contained"/>
            </Datagrid>
        </List>
);

export const HrReviewShow = () => (
        <ReviewShow/>
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
                            <ReferenceField link={false} className="category" source="competencyCategory"
                                            reference="competencyCategory" sx={{marginTop: 2}}/>
                            <RichTextInput disabled={true} toolbar={<></>} className="description" source="description"
                                           label="Description" name="description"/>
                            <TextInput disabled={true} className="title" source="title" name="title"/>
                            <FormDataConsumer>
                                {({scopedFormData, getSource, ...rest}) => {
                                    const core = ['Hvzl6W0sL3unlUvEKznC', 'JwFz8xNx2KSVYen4zL6f', 'XtmdMXYGBSUwT0YfcrtM', 'pLzxA5qPpDHW001NRVbg']
                                    if (core.includes(scopedFormData?.competencyCategory)) {
                                        return null
                                    } else {
                                        return(<>
                                            <RichTextInput disabled={true} toolbar={<></>} className="managerComment"
                                                           source={getSource('managerComment')} label="Manager Comment"
                                                           name="Manager Comment"/>
                                            <TextInput disabled={true} className="managerApproved"
                                                       source={getSource('managerApproved')}
                                                       label="Manager Review" name="Manager Review"/>
                                            <CustomRichTextInput className="hrComment" source={getSource('hrComment')}
                                                                 label="HR Comment"/>
                                            <SelectInput className="hrApproved" source={getSource('hrApproved')} label="HR Review"
                                                         choices={competencyReviewStatuses} required/>
                                                </>
                                    )
                                    }
                                }}

                            </FormDataConsumer>

                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleForm>
            </Edit>
    )
};

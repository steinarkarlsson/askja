import React from 'react';
import {
    ArrayInput,
    Edit,
    ReferenceField,
    RichTextField,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
    useGetIdentity
} from 'react-admin';
import {competencyReviewStatusSchema} from '@jucy-askja/common/schemas/CompetencyReviewStatus';
import {reviewSchema} from '@jucy-askja/common/schemas/Review';
import {Alert, Box, CircularProgress, Typography} from '@mui/material';
import {ErrorComponent} from '../components/ErrorComponent';
import {RichTextInput} from 'ra-input-rich-text';
import {ZodError} from 'zod';
import {CustomRichTextInput} from '../components/CustomRichTextInput';
import {ReviewTitlePanel} from '../components/review/ReviewTitlePanel';
import {ReviewToolbar} from '../components/review/ReviewToolbar';
import {SMARTGoals} from '../components/review/SMARTGoals';
import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {useGetUserProfile} from '../hooks/useGetUserProfile';
import {FormDataConsumer} from 'ra-core';
import {styles} from '../components/review/styles';
import {ReviewShow} from '../components/review/ReviewShow';
import {ReviewList} from '../components/review/ReviewList';

const competencyReviewStatuses = mapArrayToChoices(competencyReviewStatusSchema._def.values);

export const EmployeeReviewList = (props: any) => {
    const {data: identity, isLoading: identityLoading, error: identityError} = useGetIdentity();
    const {data: profile} = useGetUserProfile();
    if (identityLoading) {
        return (
                <Box display="flex" justifyContent="center" padding={2} width="100%">
                    <CircularProgress/>
                </Box>
        );
    }
    if (identityError || !identity) {
        return <ErrorComponent error={identityError || new Error('Failed to fetch current user')}/>;
    }
    return (
            <Box sx={{marginTop: 10, marginX: 10}}>
                <Typography variant="h4">Your Employee KPIs</Typography>
                <ReviewList resource='employeeReview' reviewType='employeeReview' {...props}/>
            </Box>
    );
};

export const EmployeeReviewShow = (props: any) => (
        <ReviewShow/>
);

export const EmployeeReviewEdit = () => {
    return (
            <Edit>
                <SMARTGoals/>
                <SimpleForm toolbar={<ReviewToolbar reviewType={'employeeReview'}/>} validate={async (data) => {
                    const errors: Record<string, string> = {}
                    try {
                        reviewSchema.parse(data)
                    } catch (e) {
                        if (e instanceof ZodError) {
                            console.log(e.flatten())
                        }
                        return {
                            'name': 'Is a required field'
                        }
                    }
                    //
                    return errors
                }}>
                    <ReviewTitlePanel/>
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
                                {({scopedFormData, getSource}) => {
                                    const core = ['Hvzl6W0sL3unlUvEKznC', 'JwFz8xNx2KSVYen4zL6f', 'XtmdMXYGBSUwT0YfcrtM', 'pLzxA5qPpDHW001NRVbg']
                                    if (core.includes(scopedFormData?.competencyCategory)) {
                                        return null
                                    } else {
                                        return (
                                                <>
                                                    <CustomRichTextInput className="managerComment"
                                                                         source={getSource('managerComment')}
                                                                         label="Manager Comment"/>
                                                    <SelectInput className="managerApproved"
                                                                 source={getSource('managerApproved')}
                                                                 label="manager Review"
                                                                 choices={competencyReviewStatuses}
                                                                 required/>
                                                </>
                                        )
                                    }
                                }}
                            </FormDataConsumer>
                            <FormDataConsumer>
                                {({scopedFormData, getSource, ...rest}) => {
                                    const core = ['Hvzl6W0sL3unlUvEKznC', 'JwFz8xNx2KSVYen4zL6f', 'XtmdMXYGBSUwT0YfcrtM', 'pLzxA5qPpDHW001NRVbg']
                                    if (core.includes(scopedFormData?.competencyCategory)) {
                                        return null
                                    } else {
                                        if (scopedFormData?.hrApproved) {
                                            return (
                                                    <Alert severity={scopedFormData?.hrApproved === 'Approved' ? 'success' : 'info'}
                                                           className="hrFeedback">
                                                        <Typography variant='h6'>HR:</Typography>
                                                        <RichTextField
                                                                source={getSource('hrApproved')} {...rest}
                                                                stripTags className='hrApproved'/>
                                                        <br/>
                                                        <RichTextField source={getSource('hrComment')} {...rest}
                                                                       stripTags className='hrComment'/>
                                                    </Alert>
                                            )
                                        } else {
                                            return null
                                        }
                                        ;
                                    }
                                }}
                            </FormDataConsumer>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleForm>
            </Edit>
    );
}

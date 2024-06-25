import React from 'react';
import {
    ArrayField,
    ArrayInput,
    Datagrid,
    Edit,
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
    useGetIdentity
} from 'react-admin';
import {competencyReviewStatusSchema} from '@jucy-askja/common/schemas/CompetencyReviewStatus';
import {reviewSchema} from '@jucy-askja/common/schemas/Review';
import {Alert, Box, CircularProgress} from '@mui/material';
import {ErrorComponent} from '../components/ErrorComponent';
import {RichTextInput} from 'ra-input-rich-text';
import {ZodError} from 'zod';
import {CustomRichTextInput} from '../components/CustomRichTextInput';
import {ReviewTitlePanel} from '../components/ReviewTitlePanel';
import {ReviewToolbar} from '../components/ReviewToolbar';
import {SMARTGoals} from '../components/SMARTGoals';
import {StartReviewButton} from '../components/StartReviewButton';
import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {useGetUserProfile} from '../hooks/useGetUserProfile';
import {CustomAlert} from '../components/CustomAlert';
import {FormDataConsumer} from 'ra-core';

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
            <List {...props} filter={{manager: profile?.id}}>
                <Datagrid>
                    <TextField source="employeeName"/>
                    <ReferenceField source="manager" reference="employee" link={false}/>
                    <TextField source="jobTitle"/>
                    <StartReviewButton reviewType={'managerReview'}/>
                    <ShowButton label="View"/>
                </Datagrid>
            </List>
    );
};

export const EmployeeReviewShow = (props: any) => (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="jobTitle"/>
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
                                sx={{
                                    '& .RaSimpleFormIterator-form': {
                                        display: 'grid',
                                        gap: 2,
                                        marginTop: '20px'
                                    },
                                    '& .competencyCategory': {
                                        gridColumn: '1 / 1',
                                        gridRow: '1 / 1',
                                        width: '150px',
                                    },
                                    '& .title': {
                                        gridColumn: '2 / 2',
                                        gridRow: '1 / 2',
                                        width: '400px',
                                        marginTop: '8px',
                                    },
                                    '& .description': {
                                        gridColumn: '2 / 3',
                                        gridRow: '2 / 2',
                                        width: '400px',
                                        marginTop: '42px'
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
                                        marginTop: '42px'
                                    },
                                    '& .hrFeedback': {
                                        gridColumn: '7 / 8',
                                        gridRow: '1 / 2',
                                        width: '400px',
                                        marginTop: '0px'
                                    }
                                }}>
                            <TextInput disabled={true} className="category" source="category" name="category"/>
                            <RichTextInput disabled={true} toolbar={<></>} className="description" source="description"
                                           label="Description" name="description"/>
                            <TextInput disabled={true} className="title" source="title" name="title"/>
                            <CustomRichTextInput className="managerComment" source="managerComment"
                                                 label="Manager Comment"/>
                            <SelectInput className="managerApproved" source="managerApproved" label="manager Review"
                                         choices={competencyReviewStatuses} required/>
                            <FormDataConsumer>
                                {({scopedFormData, getSource, ...rest}) => {
                                    if (scopedFormData?.hrApproved) {
                                        return (
                                                <Alert severity={scopedFormData?.hrApproved === 'Approved' ? 'success' : 'info'}
                                                       className="hrFeedback">
                                                    HR:
                                                    <br/>
                                                    <RichTextField source={getSource('hrApproved')} {...rest} stripTags/>
                                                    <br/>
                                                    <RichTextField source={getSource('hrComment')} {...rest} stripTags/>
                                                </Alert>
                                        )
                                    } else {
                                        return null
                                    }
                                    ;
                                }}
                            </FormDataConsumer>
                        </SimpleFormIterator>
                    </ArrayInput>
                </SimpleForm>
            </Edit>
    );
}

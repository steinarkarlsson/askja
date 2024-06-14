import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {competencyTypeSchema} from '@jucy-askja/common/schemas/CompetencyType';
import {competencyReviewStatusSchema} from '@jucy-askja/common/schemas/CompetencyReviewStatus';
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
} from 'react-admin';
import {RichTextInput} from 'ra-input-rich-text';
import {CustomRichTextInput} from '../components/CustomRichTextInput';
import {ReviewToolbar} from '../components/ReviewToolbar';
import {StartReviewButton} from '../components/StartReviewButton';
import {ReviewTitlePanel} from '../components/ReviewTitlePanel';

const competencyReviewStatuses = mapArrayToChoices(competencyReviewStatusSchema._def.values);

export const HrReviewList = (props: any) => (
        <List {...props}>
            <Datagrid>
                <TextField source="employeeName"/>
                <ReferenceField source="manager" reference="employee"/>
                <TextField source="jobTitle"/>
                <StartReviewButton reviewType={'hrReview'}/>
            </Datagrid>
        </List>
);

export const HrReviewShow = (props: any) => (
        <Show {...props}>
            <SimpleShowLayout>
                <TextField source="jobTitle"/>
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
                            <TextInput disabled={true} className="category" source="category" name="category"/>
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

import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {competencyReviewStatusSchema} from '@jucy-askja/common/schemas/CompetencyReviewStatus';
import React from 'react';
import {reviewSchema} from '@jucy-askja/common/schemas/Review';
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
import {SMARTGoals} from '../components/SMARTGoals';
import {ReviewToolbar} from '../components/ReviewToolbar';
import {StartReviewButton} from '../components/StartReviewButton';
import {ReviewTitlePanel} from '../components/ReviewTitlePanel';
import {ZodError} from 'zod';

const EmployeeReviewFilter = (props: any) => {
    return (
            <Filter {...props}>
                <TextInput label="Search" source="title" alwaysOn name="search"/>
            </Filter>
    );
};

const competencyReviewStatuses = mapArrayToChoices(competencyReviewStatusSchema._def.values);

export const EmployeeReviewList = (props: any) => (
        <List {...props} filters={<EmployeeReviewFilter/>}>
            <Datagrid>
                <TextField source="employeeName"/>
                <ReferenceField source="manager" reference="employee"/>
                <TextField source="jobTitle"/>
                <StartReviewButton reviewType={'managerReview'}/>
            </Datagrid>
        </List>
);

export const EmployeeReviewShow = (props: any) => (
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

export const EmployeeReviewEdit = () => (
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
                        'name': 'Is a requi'
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
                                    marginTop: '0px'

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
                        <TextInput disabled={true} className="category" source="Category" name="Category"/>
                        <RichTextInput disabled={true} toolbar={<></>} className="description" source="description"
                                       label="Description" name="Description"/>
                        <TextInput disabled={true} className="title" source="Title" name="Title"/>
                        <CustomRichTextInput className="managerComment" source="managerComment"
                                             label="Manager Comment"/>
                        <SelectInput className="managerApproved" source="managerApproved" label="manager Review"
                                     choices={competencyReviewStatuses} required/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
);

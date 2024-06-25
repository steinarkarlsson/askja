import React from 'react';
import {ArrayInput, ReferenceField, ReferenceInput, RichTextField, SimpleFormIterator, TextInput} from 'react-admin';
import {FormDataConsumer} from 'ra-core';
import {CustomRichTextInput} from './CustomRichTextInput';
import {Typography} from '@mui/material';


export const SelfReviewFormIterator = () => {
    return (
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
                            '& .competencyCategory': {
                                gridColumn: '1 / 1',
                                gridRow: '1 / 1',
                                width: '300px',
                            },
                            '& .title': {
                                gridColumn: '2 / 3',
                                gridRow: '1 / 2',
                                width: '600px',
                                marginTop: '8px',
                            },
                            '& .description': {
                                gridColumn: '2 / 3',
                                gridRow: '2 / 2',
                                width: '600px',
                                marginTop: '42px'
                            },
                            '& .managerApproved': {
                                gridColumn: '10 / 10',
                                gridRow: '1 / 2',
                                width: '300px',

                            },
                            '& .managerComment': {
                                gridColumn: '10 / 10',
                                gridRow: '2 / 2',
                                width: '300px',
                                marginTop: '42px'
                            },
                        }}
                >
                    <FormDataConsumer>
                        {({scopedFormData, getSource, ...rest}) => {

                            return !(scopedFormData?.source === 'template' && scopedFormData?.competencyCategory) ?
                                    <ReferenceInput
                                            source={getSource('competencyCategory')}
                                            className="competencyCategory"
                                            reference="competencyCategory"
                                            sx={{width: 'fit-content', minWidth: 200}}
                                            filter={{type: 'Functional'}}
                                            {...rest}
                                    /> :
                                    <Typography variant="h4" color="textPrimary" sx={{paddingLeft: 2}}><ReferenceField
                                            source={getSource('competencyCategory')}
                                            className="category"
                                            reference="competencyCategory"
                                            link={false}
                                            {...rest}
                                    /></Typography>;
                        }}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({scopedFormData, getSource, ...rest}) => {
                            return <TextInput source={getSource('title')} className="title" {...rest}
                                              readOnly={Boolean(scopedFormData?.source === 'template' && scopedFormData?.title)}
                                              sx={{width: 'fit-content', minWidth: 300}}
                            />;
                        }}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({scopedFormData, getSource, ...rest}) => {
                            return <CustomRichTextInput source={getSource('description')}
                                                        className="description" {...rest}
                                                        readOnly={Boolean(scopedFormData?.source === 'template' && scopedFormData?.description)}/>;
                        }}
                    </FormDataConsumer>
                    <RichTextField className="managerComment" source="managerComment" label="Manager Comment"
                                   stripTags/>
                    <RichTextField className="managerApproved" source="managerApproved" label="Manager Approval"
                                   stripTags/>
                </SimpleFormIterator>
            </ArrayInput>
    );
};

import React from 'react';
import {ArrayInput, ReferenceInput, SimpleFormIterator, TextInput} from 'react-admin';
import {FormDataConsumer} from 'ra-core';
import {CustomRichTextInput} from './CustomRichTextInput';


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
                                marginTop: '20px',
                            },
                            '& .category': {
                                gridColumn: '1 / 1',
                                gridRow: '1 / 1',
                                width: 'fit-content',
                            },
                            '& .title': {
                                gridColumn: '2 / 2',
                                gridRow: '1 / 2',
                                width: '900px',
                                marginTop: '8px',
                            },

                            '& .description': {
                                gridColumn: '2 / 3',
                                gridRow: '2 / 2',
                                width: '900px',
                            },
                        }}
                >
                    <FormDataConsumer>
                        {({scopedFormData, getSource, ...rest}) => {
                            return <ReferenceInput source={getSource('competencyCategory')} className="category"
                                                reference="competencyCategory" {...rest}
                                                readOnly={Boolean(scopedFormData?.source === 'template')}
                                                   sx={{width: 'fit-content', minWidth:300}}
                            />;
                            // return <SelectInput source={getSource('category')} className="category"
                            //                     choices={competencyCategories} {...rest}
                            //                     readOnly={Boolean(scopedFormData?.source === 'template')}/>;
                        }}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({scopedFormData, getSource, ...rest}) => {
                            return <TextInput source={getSource('title')} className="title" {...rest}
                                              readOnly={Boolean(scopedFormData?.source === 'template')}
                                              sx={{width: 'fit-content', minWidth:300}}
                            />;
                        }}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({scopedFormData, getSource, ...rest}) => {
                            return <CustomRichTextInput source={getSource('description')}
                                                        className="description" {...rest}
                                                        readOnly={Boolean(scopedFormData?.source === 'template')}/>;
                        }}
                    </FormDataConsumer>
                </SimpleFormIterator>
            </ArrayInput>
    );
};

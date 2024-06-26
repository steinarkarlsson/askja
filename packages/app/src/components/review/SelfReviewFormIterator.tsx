import React from 'react';
import {
    ArrayInput,
    ReferenceField,
    ReferenceInput,
    RichTextField,
    SimpleFormIterator,
    TextInput,
    useRecordContext
} from 'react-admin';
import {FormDataConsumer} from 'ra-core';
import {CustomRichTextInput} from '../CustomRichTextInput';
import {Alert, Typography} from '@mui/material';
import {styles} from './styles';


export const SelfReviewFormIterator = () => {
    const record = useRecordContext();
    console.log(record.competencies)
    return (
            <ArrayInput source="competencies" name="Competencies">
                <SimpleFormIterator
                        disableClear
                        disableReordering
                        sx={styles}>
                    <FormDataConsumer>
                        {({scopedFormData, getSource, ...rest}) => {
                            return !(scopedFormData?.source === 'template' && scopedFormData?.competencyCategory) ?
                                    <ReferenceInput
                                            source={getSource('competencyCategory')}
                                            className="category"
                                            reference="competencyCategory"
                                            sx={{width: 'fit-content', minWidth: 200}}
                                            filter={{type: 'Functional'}}
                                            {...rest}
                                    /> :
                                    <Typography variant="h4" color="textPrimary" sx={{paddingLeft: 2}}>
                                        <ReferenceField
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
                                              readOnly={Boolean(scopedFormData?.source === 'template' && record?.title)}
                                              sx={{width: 'fit-content', minWidth: 300}}
                            />;
                        }}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({scopedFormData, getSource, ...rest}) => {
                            return <CustomRichTextInput source={getSource('description')}
                                                        className="description" {...rest}
                                                        readOnly={Boolean(scopedFormData?.source === 'template' && record?.title)}/>;
                        }}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({scopedFormData, getSource, ...rest}) => {
                            if (scopedFormData?.managerApproved) {
                                return (
                                        <Alert severity={scopedFormData?.managerApproved === 'Approved' ? 'success' : 'info'}
                                               className="managerFeedback">
                                            <ReferenceField reference={'employee'} source={'manager'} link={false}
                                                            sx={{fontWeight: 'bold', fontSize: 'large'}}/>:
                                            <br/>
                                            <RichTextField source={getSource('managerApproved')} {...rest} stripTags/>
                                            <br/>
                                            <RichTextField source={getSource('managerComment')} {...rest} stripTags/>
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
    );
};

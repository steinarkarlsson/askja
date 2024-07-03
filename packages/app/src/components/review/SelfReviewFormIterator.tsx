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
    return (
            <ArrayInput source="competencies" name="Competencies">
                <SimpleFormIterator
                        disableClear
                        disableReordering
                        disableRemove
                        sx={styles}>
                    <FormDataConsumer>
                        {({scopedFormData, getSource, formData,...rest}) => {
                            const core = ['Hvzl6W0sL3unlUvEKznC', 'JwFz8xNx2KSVYen4zL6f', 'XtmdMXYGBSUwT0YfcrtM', 'pLzxA5qPpDHW001NRVbg']
                            return (core.includes(scopedFormData?.competencyCategory)) ?
                                    <ReferenceField
                                            source={getSource('competencyCategory')}
                                            className="category"
                                            reference="competencyCategory"
                                            link={false}
                                            {...rest}
                                    />:
                                    <ReferenceInput
                                            source={getSource('competencyCategory')}
                                            className="category"
                                            reference="competencyCategory"
                                            sx={{width: 'fit-content', minWidth: 200}}
                                            filter={{type: 'Functional'}}
                                            {...rest}
                                    />
                        }}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({scopedFormData, getSource, formData,...rest}) => {
                            const core = ['Hvzl6W0sL3unlUvEKznC', 'JwFz8xNx2KSVYen4zL6f', 'XtmdMXYGBSUwT0YfcrtM', 'pLzxA5qPpDHW001NRVbg']
                            return <TextInput source={getSource('title')} className="title" {...rest}
                                              readOnly={Boolean(scopedFormData?.source === 'template' && record?.title) || core.includes(scopedFormData?.competencyCategory)}
                            />;
                        }}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({scopedFormData, getSource, formData, ...rest}) => {
                            const core = ['Hvzl6W0sL3unlUvEKznC', 'JwFz8xNx2KSVYen4zL6f', 'XtmdMXYGBSUwT0YfcrtM', 'pLzxA5qPpDHW001NRVbg']
                            return <CustomRichTextInput source={getSource('description')}
                                                        className="description" {...rest}
                                                        readOnly={Boolean(scopedFormData?.source === 'template' && record?.title) || core.includes(scopedFormData?.competencyCategory)}/>;
                        }}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({scopedFormData, getSource, formData,...rest}) => {
                            const core = ['Hvzl6W0sL3unlUvEKznC', 'JwFz8xNx2KSVYen4zL6f', 'XtmdMXYGBSUwT0YfcrtM', 'pLzxA5qPpDHW001NRVbg']
                            if (core.includes(scopedFormData?.competencyCategory)) {
                                return null
                            } else {
                                if (scopedFormData?.managerApproved) {
                                    return (
                                            <Alert severity={scopedFormData?.managerApproved === 'Approved' ? 'success' : 'info'}
                                                   className="managerFeedback">
                                                <Typography variant='h6'>
                                                    <ReferenceField reference={'employee'} source={'manager'}
                                                                    link={false}/>:
                                                </Typography>
                                                <RichTextField source={getSource('managerApproved')} {...rest}
                                                               stripTags/>
                                                <br/>
                                                <RichTextField source={getSource('managerComment')} {...rest}
                                                               stripTags/>
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
    );
};

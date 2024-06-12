import React, { cloneElement } from 'react';
import { ArrayInput, SelectInput, SimpleFormIterator, TextInput, useRecordContext } from 'react-admin';
import { competencyCategorySchema } from '@jucy-askja/common/schemas/CompetencyCategory';
import { FormDataConsumer } from 'ra-core';
import { mapArrayToChoices } from '../lib/mapArrayToChoices';
import { CustomRichTextInput } from './CustomRichTextInput';


export const SelfReviewFormIterator = () => {
    const competencyCategories = mapArrayToChoices(competencyCategorySchema._def.values);
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
                    },
                }}
            >
                <FormDataConsumer>
                    {({ scopedFormData, getSource, ...rest }) => {
                        return <SelectInput source={getSource('category')} className="category" choices={competencyCategories} {...rest} readOnly={Boolean(scopedFormData?.source==='template')} />;
                    }}
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ scopedFormData, getSource, ...rest }) => {
                        return <TextInput source={getSource('title')} className="title" {...rest} readOnly={Boolean(scopedFormData?.source==='template')} />;
                    }}
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ scopedFormData, getSource, ...rest }) => {
                        return <CustomRichTextInput source={getSource('description')} className="description" {...rest} readOnly={Boolean(scopedFormData?.source==='template')} />;
                    }}
                </FormDataConsumer>
            </SimpleFormIterator>
        </ArrayInput>
    );
};

import {ArrayInput, SelectInput, SimpleFormIterator, TextInput, useRecordContext} from 'react-admin';
import {CustomRichTextInput} from './CustomRichTextInput';
import React, {cloneElement} from 'react';
import {mapArrayToChoices} from '../lib/mapArrayToChoices';
import {competencyCategorySchema} from '@jucy-askja/common/schemas/CompetencyCategory';

export const SelfReviewFormIterator = () => {
    const record = useRecordContext();
    const competencyCategories = mapArrayToChoices(competencyCategorySchema._def.values);

    return (<ArrayInput source="competencies" name="Competencies">
        <SimpleFormIterator
                disableClear
                disableReordering
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
                        marginTop: '8px'
                    },

                    '& .description': {
                        gridColumn: '2 / 3',
                        gridRow: '2 / 2',
                        width: '400px',
                    },
                }}>
            <MyComponent
                    record={record}
                    field={<SelectInput className="category" source="category" choices={competencyCategories} defaultValue='' />}
            />
            <MyComponent
                    record={record}
                    field={<TextInput className="title" source="title"/>}
            />

            <CustomRichTextInput className="description" source="description" label="Description"/>

        </SimpleFormIterator>
    </ArrayInput>)
}

export const MyComponent = ({record,source,field,className, ...props}) => {
    console.log(props);
    const index = source.split('.').pop();
    const competency = record.competencies[index];
console.log(competency)
    console.log('MyComponent Props', {record,source,field,className, ...props});
    return cloneElement(field, {...props,readOnly:competency.template})
}

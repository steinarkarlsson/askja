import React from 'react';
import {
    AlignmentButtons,
    ClearButtons,
    FormatButtons,
    ListButtons,
    RichTextInput,
    RichTextInputToolbar
} from 'ra-input-rich-text';
import {FC, ReactElement} from 'react';

type CustomRichTextInputProps = {
    source: string;
    label: string;
}

export const CustomRichTextInput: FC<CustomRichTextInputProps> = ({source, label}): ReactElement => {
    const size = 'small';
    return (
        <RichTextInput source={source} label={label} toolbar={
            <RichTextInputToolbar size="small">
                <FormatButtons size={size}/>
                <ListButtons size={size}/>
                <ClearButtons size={size}/>
            </RichTextInputToolbar>
        }/>
    )
}

import {ClearButtons, FormatButtons, ListButtons, RichTextInput, RichTextInputToolbar,} from 'ra-input-rich-text';
import React, {FC, ReactElement} from 'react';

type CustomRichTextInputProps = {
    source: string;
    label: string;
    className: string;
};

export const CustomRichTextInput: FC<CustomRichTextInputProps> = ({...props}): ReactElement => {
    return (
            <RichTextInput
                    toolbar={
                        <RichTextInputToolbar size="small">
                            <FormatButtons/>
                            <ListButtons/>
                            <ClearButtons/>
                        </RichTextInputToolbar>
                    }
                    fullWidth
                    {...props}
            />
    );
};

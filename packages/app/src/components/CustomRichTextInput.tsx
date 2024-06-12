import React, { FC, ReactElement } from 'react';
import { ClearButtons, FormatButtons, ListButtons, RichTextInput, RichTextInputToolbar } from 'ra-input-rich-text';
import { RichTextInputProps } from 'ra-input-rich-text/src/RichTextInput';

export const CustomRichTextInput: FC<RichTextInputProps> = ({ toolbar, ...props }): ReactElement => {
    return (
        <RichTextInput
            toolbar={
                toolbar ? (
                    toolbar
                ) : (
                    <RichTextInputToolbar size="small">
                        <FormatButtons />
                        <ListButtons />
                        <ClearButtons />
                    </RichTextInputToolbar>
                )
            }
            fullWidth
            {...props}
        />
    );
};

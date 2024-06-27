import React from 'react';
import {SaveButton} from 'ra-ui-materialui';
import {useRedirect} from 'react-admin';

export const SaveDraftButton = () => {
    const redirect = useRedirect();

    const handleSave = () => {
        redirect('/');
    };
    return (
            <SaveButton label='Save Draft' onSubmit={handleSave}/>
    );
}

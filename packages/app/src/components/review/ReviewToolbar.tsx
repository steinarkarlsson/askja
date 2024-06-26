import {ReviewSubmitButton} from './ReviewSubmitButton';
import {Toolbar} from 'react-admin';
import React from 'react';
import {SaveDraftButton} from './SaveDraftButton';

interface ReviewToolbarProps {
    reviewType: string;
}

export const ReviewToolbar = ({reviewType}: ReviewToolbarProps) => (
        <Toolbar>
            <SaveDraftButton/>
            <ReviewSubmitButton reviewType={reviewType}/>
        </Toolbar>
);

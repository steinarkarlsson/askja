import {ReviewSubmitButton} from './ReviewSubmitButton';
import {Toolbar} from 'react-admin';
import React from 'react';

interface ReviewToolbarProps {
    reviewType: string;
}

export const ReviewToolbar = ({reviewType}: ReviewToolbarProps) => (
        <Toolbar>
            <ReviewSubmitButton reviewType={reviewType}/>
        </Toolbar>
        );

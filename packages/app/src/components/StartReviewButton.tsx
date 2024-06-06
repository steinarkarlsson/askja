import {EditButton} from 'react-admin';
import React from 'react';

export const StartReviewButton = () => {
    return <EditButton
            label="Start Review"
            sx={{
                border: 1,
                backgroundColor: 'green',
                color: 'white'
            }}
    />
}

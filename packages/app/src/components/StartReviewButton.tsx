import {EditButton, useRecordContext} from 'react-admin';
import React from 'react';

interface startReviewButtonProps {
    reviewType: string;
}

export const StartReviewButton = ({reviewType}: startReviewButtonProps) => {
    const record = useRecordContext();
    const allowEdit = (reviewType === 'selfReview' && record.status === 'Pending Employee') ||
            (reviewType === 'managerReview' && record.status === 'Pending Manager') ||
            (reviewType === 'hrReview' && record.status === 'Pending HR');

    const label = allowEdit ? 'Start Review' : record.status;

    return <EditButton
            label={label}
            sx={allowEdit ? {
                border: 1,
                backgroundColor: '#85C430',
                color: 'white'
            } : {}}
            disabled={!allowEdit}
    />
}

import {EditButton, useRecordContext} from 'react-admin';
import React from 'react';

interface startReviewButtonProps {
    reviewType: string;
}

export const StartReviewButton = ({reviewType}: startReviewButtonProps) => {
    const record = useRecordContext();
    const allowEdit = (reviewType === 'selfReview' && record.status === 'Pending Employee') ||
            (reviewType === 'employeeReview' && record.status === 'Pending Manager') ||
            (reviewType === 'hrReview' && record.status === 'Pending HR');
    const label = allowEdit ? 'Start Review' : record.status;

    if (record.status === 'Completed') return null;

    return <EditButton
            label={label}
            variant="contained"
            disabled={!allowEdit}
    />
}

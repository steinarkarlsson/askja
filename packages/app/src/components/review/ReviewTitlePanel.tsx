import React from 'react';
import {Stack, Typography} from '@mui/material';
import {useRecordContext} from 'react-admin';
import {Review} from '@jucy-askja/common/schemas/Review';

export const ReviewTitlePanel = () => {
    const review: Review = useRecordContext();

    return (
            <Stack direction='column' spacing={2} margin={2}>
                <Typography variant='h4'>{review.reviewPeriodName}</Typography>
                <Typography variant='h5'>Employee: {review.employeeName}</Typography>
            </Stack>
    );
}

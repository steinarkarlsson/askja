import React from 'react';
import {Stack, Typography} from '@mui/material';
import {ReferenceField, useRecordContext} from 'react-admin';
import {Review} from '@jucy-askja/common/schemas/Review';

export const ReviewTitlePanel = () => {
    const review: Review = useRecordContext();
    console.log({review})
    return (
                <Stack direction='column' spacing={2}>
                    <Typography>{review.reviewPeriodName}</Typography>
                    <Typography>Employee: {review.employeeName}</Typography>
                    <Typography>Title: {review.jobTitle}</Typography>
                    <ReferenceField source="managerId" reference="managerId"/>
                </Stack>
    );
}

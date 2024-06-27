import React from 'react';
import {Edit, SimpleForm, useGetIdentity} from 'react-admin';
import {Box, CircularProgress, Typography} from '@mui/material';
import {ReviewTitlePanel} from '../components/review/ReviewTitlePanel';
import {ReviewToolbar} from '../components/review/ReviewToolbar';
import {SMARTGoals} from '../components/review/SMARTGoals';
import {SelfReviewFormIterator} from '../components/review/SelfReviewFormIterator';
import {ErrorComponent} from '../components/ErrorComponent';
import {ReviewShow} from '../components/review/ReviewShow';
import {ReviewList} from '../components/review/ReviewList';

export const SelfReviewList = (props: any) => {
    const {isLoading: identityLoading, error: identityError} = useGetIdentity();

    if (identityLoading) {
        return (
                <Box display="flex" justifyContent="center" padding={2} width="100%">
                    <CircularProgress/>
                </Box>
        );
    }

    if (identityError) {
        return <ErrorComponent error={identityError}/>;
    }
    return (
            <>
                <Box sx={{marginTop: 10, marginX: 10}}>
                    <Typography variant="h4">Your KPIs</Typography>
                    <ReviewList reviewType='selfReview' {...props}/>
                </Box>
            </>
    );
};

export const SelfReviewShow = () => (
        <ReviewShow/>
);

export const SelfReviewEdit = () => (
        <Edit>
            <ReviewTitlePanel/>
            <SMARTGoals/>
            <SimpleForm toolbar={<ReviewToolbar reviewType="selfReview"/>}>
                <SelfReviewFormIterator/>
            </SimpleForm>
        </Edit>
);

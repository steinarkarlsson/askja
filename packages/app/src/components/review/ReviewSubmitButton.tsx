import * as React from 'react';
import {useNotify, useRecordContext, useRedirect, useUpdate} from 'react-admin';
import {getUpdatedReviewStatus} from '../../lib/getUpdatedReviewStatus';
import {Button} from '@mui/material';
import {useFormContext} from 'react-hook-form';
import {Review} from '@performus/common/schemas/Review';
import {useGetUserProfile} from '../../hooks/useGetUserProfile';

export const ReviewSubmitButton = () => {
    const record = useRecordContext();
    const redirect = useRedirect();
    const [update, {error}] = useUpdate();
    const notify = useNotify();
    const formState = useFormContext();
    const updatedForm = formState.getValues() as Review;
    // eslint-disable-next-line no-unused-vars
    const {status, ...updatedFormWithoutStatus} = updatedForm
    const {data: profile} = useGetUserProfile();

    const handleClick = () => {
        update(
                'review',
                {
                    id: record.id,
                    data: {...updatedFormWithoutStatus, status: getUpdatedReviewStatus(updatedForm, profile?.manager)},
                    previousData: record
                },
                {
                    onSuccess: () => {
                        notify('Review Submitted');
                        redirect('/');
                    }
                }
        )
    }
    if (error) {
        return <p>error</p>;
    }

    if (!record) {
        return null
    }

    return <Button
            variant='contained'
            size='medium'
            onClick={handleClick}
            sx={{margin: 2}}
    >Submit</Button>
};

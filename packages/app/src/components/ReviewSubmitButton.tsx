import * as React from 'react';
import {useNotify, useRecordContext, useUpdate, useRedirect} from 'react-admin';
import {getUpdatedReviewStatus} from '../lib/getUpdatedReviewStatus';
import {Button} from '@mui/material';
import {redirect} from 'react-router';
import {useFormContext} from 'react-hook-form';
import { Review} from '@jucy-askja/common/schemas/Review';

export const ReviewSubmitButton = (props: { reviewType: string }) => {
    const record = useRecordContext();
    const redirect = useRedirect();
    const [update, { error }] = useUpdate();
    const notify = useNotify();
    const formState = useFormContext();
    const updatedForm = formState.getValues() as Review;
    const {status, ...updatedFormWithoutStatus} = updatedForm

    const handleClick = () => {
        console.log('old status: ', record.status)
        console.log('updated status: ', getUpdatedReviewStatus(updatedForm))

        update(
                'review',
                {id: record.id, data: {...updatedFormWithoutStatus, status:getUpdatedReviewStatus(updatedForm)}, previousData: record},
                {
                    onSuccess: () => {
                        notify('Review Submitted');
                        redirect(`/${props.reviewType}`);
                    }
                }
        )
    }
    if (error) { return <p>error</p>; }

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

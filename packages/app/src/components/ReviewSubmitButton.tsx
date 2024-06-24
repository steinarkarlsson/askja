import * as React from 'react';
import {useNotify, useRecordContext, useRedirect, useUpdate} from 'react-admin';
import {useFormState} from 'react-hook-form';
import {getUpdatedReviewStatus} from '../lib/getUpdatedReviewStatus';
import {SaveButton} from 'ra-ui-materialui';

export const useSubmitReview = (reviewType:string) => {
    const record = useRecordContext();
    const notify = useNotify();
    const redirect = useRedirect();

    const formState = useFormState();
    const updatedRecord = formState.defaultValues;

    const updatedStatus = getUpdatedReviewStatus(record.status);

    console.log('data to update: ');
    console.log({id: record.id, data: {status: updatedStatus, ...updatedRecord}})
        useUpdate(
                'review',
                {id: record.id, data: {status: updatedStatus, ...updatedRecord}, previousData: record},
                {
                    onSuccess: () => {
                        redirect(`/${reviewType}`);
                        notify('Review Submitted');
                    },
                    onError: (error: Error) => {
                        notify(`Review submission error: ${error.message}`, {type: 'error'});
                    },
                }
        );
}

export const ReviewSubmitButton = (props: { reviewType: string }) => {
    const record = useRecordContext();

    if (!record) {
        return null
    }

    return <SaveButton
            label="Submit"
            variant='contained'
            size='medium'
            onClick={useSubmitReview}
            sx={{margin: 2}}
    />};

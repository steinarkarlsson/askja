import * as React from 'react';
import {Button, useNotify, useRecordContext, useRedirect, useUpdate} from 'react-admin';
import {Competency} from '@jucy-askja/common/schemas/Competency';
import {ReviewStatus} from '@jucy-askja/common/schemas/ReviewStatus';
import {SaveButton} from 'ra-ui-materialui';
import {useFormState} from 'react-hook-form';

export const ReviewSubmitButton = (props: { reviewType: string }) => {
    const record = useRecordContext();
    const notify = useNotify();
    const redirect = useRedirect();
    // const managerApproved = record.competencies.some((competency: Competency) => competency.managerApproved === 'Request Changes');
    // const hrApproved = record.competencies.some((competency: Competency) => competency.hrApproved === 'Request Changes');
    const formState = useFormState();
    const updatedRecord = formState.defaultValues;

    const managerApproved = true;
    const hrApproved = true;

    const reviewType = props.reviewType;
    const currentStateApproved = reviewType === 'selfReview' ? true :
            reviewType === 'employeeReview' && managerApproved ? true :
                    reviewType === 'hrReview' && hrApproved ? true : false;

    const updatedStatus: ReviewStatus = currentStateApproved ?
            (reviewType === 'selfReview' ? 'Pending Manager' :
                    reviewType === 'employeeReview' ? 'Pending HR' :
                            reviewType === 'hrReview' ? 'Completed' : 'Pending Employee') :
            (reviewType === 'employeeReview' ? 'Pending Employee' :
                    reviewType === 'hrReview' ? 'Pending Manager' : 'Pending HR');

    console.log('data to update: ');
    console.log({id: record.id, data: {status: updatedStatus, ...updatedRecord}})
    const [approve, {isLoading}] = useUpdate(
            'review',
            {},
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

    if(!record){
        return null
    }
    return <Button label="Submit" variant='contained' size='medium' onClick={() => approve( 'review',   {
                       id: record.id, data: {status: updatedStatus, ...updatedRecord},previousData:record    }
    ) } disabled={isLoading}

                   sx={{margin: 2}}/>;
};

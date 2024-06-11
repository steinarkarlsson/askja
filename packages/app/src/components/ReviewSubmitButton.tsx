import * as React from 'react';
import {Button, useNotify, useRecordContext, useRedirect, useUpdate} from 'react-admin';
import {Competency} from '@jucy-askja/common/schemas/Competency';
import {ReviewStatus} from '@jucy-askja/common/schemas/ReviewStatus';

export const ReviewSubmitButton = (props:{reviewType: string}) => {
    const record = useRecordContext();
    const notify = useNotify();
    const redirect = useRedirect();

    const managerApproved = record.competencies.some((competency: Competency) => competency.managerApproved === 'request changes');
    const hrApproved = record.competencies.some((competency: Competency) => competency.humanResourcesApproved === 'request changes');

    console.log('record: ')
    console.log(record)

    console.log('managerApproved: ', managerApproved);
    console.log('hrApproved: ', hrApproved);

    const reviewType = props.reviewType;
    const currentStateApproved = reviewType === 'selfReview' ? true :
            reviewType === 'employeeReview' && managerApproved ? true :
                    reviewType === 'hrReview' && hrApproved ? true :
                            false;
console.log('currentStateApproved: ', currentStateApproved)

    const updatedStatus: ReviewStatus = currentStateApproved ?
            reviewType === 'selfReview' ? 'Pending Manager' :
                    reviewType === 'employeeReview' ? 'Pending HR' :
                            reviewType === 'hrReview' ? 'Completed' : 'Pending Employee' :
    reviewType === 'employeeReview' ? 'Pending Employee' :
            reviewType === 'hrReview' ? 'Pending Manager' : 'Pending HR';

console.log('updatedStatus: ', updatedStatus);

    const [approve, {isLoading}] = useUpdate(
            'review',
            {id: record.id, data: {status: updatedStatus}},
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

    return <Button label="Submit" variant='contained' size='medium' onClick={() => approve()} disabled={isLoading} sx={{margin: 2}}/>;
};

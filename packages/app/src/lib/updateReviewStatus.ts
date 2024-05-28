import {review} from "@jucy-askja/common/schemas";

export const updateReviewStatus = (review: review) => {
    //If review.status is 'draft' then update review.status to 'Pending manager' and send email to manager
    if (review.status === 'draft') {
        review.status = 'Pending manager';
        //send email to manager
    }
    //If review.status is 'Pending manager' then check if any review.competency.managerReview are set to 'Request Changes', then set review.status to 'draft' and send email to employee
    if (review.status === 'Pending manager') {
        if (review.competency.managerReview === 'Request Changes') {
            review.status = 'draft';
            //send email to employee
        }
    }

    //Else set review.status to 'Pending HR' and send email to HR
    else if (review.status === 'Pending manager'){
        review.status = 'Pending HR';
        //send email to HR
    }
    //If review.status is 'Pending HR' then check if any review.competency.hrReview are set to 'Request Changes', then set review.status to 'Pending manager' and send email to manager
    //Else set review.status to 'Completed' and send email to employee
    else {
        if (review.competency.hrReview === 'Request Changes') {
            review.status = 'Pending manager';
            //send email to manager
        }
        else {
            review.status = 'Completed';
            //send email to employee
            console.log('review status: ', review.status)
        }
    }
    console.log('Review status updated');
}
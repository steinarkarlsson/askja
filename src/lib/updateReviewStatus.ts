export const updateReviewStatus = (reviewId: string) => {

    //If review.status is 'draft' then update review.status to 'Pending manager' and send email to manager
    //If review.status is 'Pending manager' then check if any review.competency.managerReview are set to 'Request Changes', then set review.status to 'draft' and send email to employee
    //Else set review.status to 'Pending HR' and send email to HR
    //If review.status is 'Pending HR' then check if any review.competency.hrReview are set to 'Request Changes', then set review.status to 'Pending manager' and send email to manager
    //Else set review.status to 'Completed' and send email to employee


    console.log('Review status updated');
}
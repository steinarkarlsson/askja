import {Review}  from '../types/Review';
export const getUpdatedReviewStatus = (record:Review ) => {

    const reviewStatus = record.status;
    // const managerApproved = record.competencies.some((competency: Competency) => competency.managerApproved === 'Request Changes');
    // const hrApproved = record.competencies.some((competency: Competency) => competency.hrApproved === 'Request Changes');
    const managerApproved = true;
    const hrApproved = true;

    const currentStateApproved = record.reviewStatus === 'Pending Employee' ? true :
        reviewStatus === 'employeeReview' && managerApproved ? true :
            reviewStatus === 'hrReview' && hrApproved;

    if (currentStateApproved) {
        if (reviewStatus === 'Pending Employee') {
            return 'Pending Manager';
        } else if (reviewStatus === 'employeeReview') {
            return 'Pending HR';
        } else if (reviewStatus === 'hrReview') {
            return 'Completed';
        } else {
            return 'Pending HR';
        }
    } else {
        if (reviewStatus === 'employeeReview') {
            return 'Pending Employee';
        } else if (reviewStatus === 'hrReview') {
            return 'Pending Manager';
        } else {
            return 'Pending Employee';
        }
    }
};

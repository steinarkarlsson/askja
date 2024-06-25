import {Review}  from '@jucy-askja/common/schemas/Review';
import {Competency}  from '@jucy-askja/common/schemas/Competency';
export const getUpdatedReviewStatus = (form:Review ) => {

    const reviewStatus = form.status;

    if (!form.competencies){
        return
    }
    const managerApproved = !form.competencies.some((competency: Competency) => competency.managerApproved === 'Request Changes');
    const hrApproved = !form.competencies.some((competency: Competency) => competency.hrApproved === 'Request Changes');

    console.log(`mangerApproved: ${managerApproved} - HR Aprroved: ${hrApproved}`)

    const currentStateApproved = reviewStatus === 'Pending Employee' ? true :
        reviewStatus === 'Pending Manager' && managerApproved ? true :
            reviewStatus === 'Pending HR' && hrApproved;

    if (currentStateApproved) {
        if (reviewStatus === 'Pending Employee') {
            return 'Pending Manager';
        } else if (reviewStatus === 'Pending Manager') {
            return 'Pending HR';
        } else if (reviewStatus === 'Pending HR') {
            return 'Completed';
        } else {
            return 'Pending HR';
        }
    } else {
        if (reviewStatus === 'Pending Manager') {
            return 'Pending Employee';
        } else if (reviewStatus === 'Pending HR') {
            return 'Pending Manager';
        } else {
            return 'Pending Employee';
        }
    }
};

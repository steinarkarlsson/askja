import { mapCompetency } from './mapCompetency';
import { mapMetaData } from './mapMetaData';

export const mapReview = (review: any) => {
    return {
        employeeName: review.employeeName,
        id: review.id,
        jobTitle: review.jobTitle,
        title: review.title || review.Title,
        level: review.level,
        manager: review.manager||'',
        reviewPeriodName: review.reviewPeriodName||'',
        status: review.status,
        employeeId: review.employeeId||'',
        reviewPeriodId: review.reviewPeriodId||'',
        reviewType: review.reviewType||'endOfYear',
        coreTemplateId: review.coreTemplateId||'',
        functionalTemplateId: review.functionalTemplateId||'',
        competencies: review.competencies?.map(mapCompetency),
        ...mapMetaData(review),
    };
};

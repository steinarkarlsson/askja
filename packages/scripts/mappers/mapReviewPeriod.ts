import { mapMetaData } from './mapMetaData';

export const mapReviewPeriod = (reviewPeriod: any) => {
    return {
        id: reviewPeriod.id,
        title: reviewPeriod.title,
        type: reviewPeriod.type,
        endDate: reviewPeriod.endDate || reviewPeriod['end date'],
        startDate: reviewPeriod.startDate || reviewPeriod['start date'],
        ...mapMetaData(reviewPeriod),
    };
};

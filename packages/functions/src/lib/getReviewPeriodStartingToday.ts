//@ts-ignore-next-line
import {FirebaseFirestore } from '@firebase/firestore-types';

export const getReviewPeriodStartingToday = (reviewPeriods: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>) => {
    const todayUTC = new Date();
    const todayNZT = todayUTC.toLocaleString('en-US', { timeZone: 'Pacific/Auckland' });
    const today = new Date(todayNZT).toISOString().slice(0, 10);
    return reviewPeriods.docs.find((reviewPeriod) => {
        if(reviewPeriod.data().startDate === undefined) {
            return false
        }
        const reviewPeriodStartDate = reviewPeriod.data().startDate.toDate().toISOString().slice(0, 10);
        return reviewPeriodStartDate === today;
    });
};

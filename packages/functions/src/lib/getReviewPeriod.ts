//@ts-ignore-next-line
import {FirebaseFirestore } from '@firebase/firestore-types';

export const getReviewPeriod = (reviewPeriods: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,date: 'startDate' | 'endDate') => {

    const todayUTC = new Date();

    const todayNZT = todayUTC.toLocaleString('en-US', { timeZone: 'Pacific/Auckland' });

    const today = new Date(todayNZT).toISOString().slice(0, 10);

    return reviewPeriods.docs.find((reviewPeriod) => {
        if (date === 'startDate') {
            if (reviewPeriod.data().startDate === undefined) {
                return false;
            }
            const reviewPeriodDate = reviewPeriod.data().startDate.toDate().toISOString().slice(0, 10);
            return reviewPeriodDate === today;
        } else {
            if (reviewPeriod.data().endDate === undefined) {
                return false;
            }
            const reviewPeriodDate = reviewPeriod.data().endDate.toDate().toISOString().slice(0, 10);
            return reviewPeriodDate === today;
        }

    });
};

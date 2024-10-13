import { reviewPeriodSchema } from '@performus/common/schemas/ReviewPeriod';
import firestoreAdmin from './firestoreAdmin';
import { mapReviewPeriod } from './mappers/mapReviewPeriod';

const collection =  firestoreAdmin.collection('reviewPeriod');
(async () => {
    const templateSnapshots = await collection.get();
    const data = templateSnapshots.docs.map((doc) => doc.data());

    for (const reviewPeriod of data) {
        const sanitizedReviewPeriod = mapReviewPeriod(reviewPeriod);
        reviewPeriodSchema.parse(sanitizedReviewPeriod);
        await collection.doc(reviewPeriod.id).set(sanitizedReviewPeriod);
    }
})().catch(console.error);

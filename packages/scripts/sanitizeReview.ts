import { reviewSchema } from '@performus/common/schemas/Review';
import firestoreAdmin from './firestoreAdmin';
import { mapReview } from './mappers/mapReview';


const collection = firestoreAdmin.collection('review');
(async () => {
    const templateSnapshots = await collection.get();
    const data = templateSnapshots.docs.map((doc) => doc.data());

    for (const review of data) {
        const sanitizedTemplate = mapReview(review);
        reviewSchema.parse(sanitizedTemplate);
        console.log(sanitizedTemplate);
        await collection.doc(review.id).set(sanitizedTemplate);
    }
})().catch(console.error);

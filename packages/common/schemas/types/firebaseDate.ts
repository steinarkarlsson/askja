import { z } from 'zod';
import type { Timestamp } from 'firebase/firestore';

export const transformDate = (val: unknown) => {
    if (typeof val === 'string') {
        return new Date(val);
    }
    if (val instanceof Date) {
        return val;
    }
    if ((val as Timestamp)?.toDate) {
        return (val as Timestamp).toDate();
    }
    return val;
};

export const firebaseDate = z.any().transform(transformDate).pipe(z.date());

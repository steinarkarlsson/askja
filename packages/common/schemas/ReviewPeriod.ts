import { z } from 'zod';
import { reviewTypeSchema } from './ReviewType';
import { firebaseDate } from './types/firebaseDate';

export const reviewPeriodSchema = z.object({
    endDate: firebaseDate,
    startDate: firebaseDate,
    id: z.string(),
    title: z.string(),
    type: reviewTypeSchema,
});

export type ReviewPeriod = z.infer<typeof reviewPeriodSchema>

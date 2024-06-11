import { z } from 'zod';
import { reviewTypeSchema } from './ReviewType';

export const reviewPeriodSchema = z.object({
    endDate: z.date(),
    startDate: z.date(),
    id: z.string(),
    title: z.string(),
    type: reviewTypeSchema,
});

export type ReviewPeriod = z.infer<typeof reviewPeriodSchema>

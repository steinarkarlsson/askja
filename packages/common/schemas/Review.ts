import { z } from 'zod';
import { competencyReviewSchema } from './CompetencyReview';
import { reviewStatusSchema } from './ReviewStatus';
import { reviewTypeSchema } from './ReviewType';

export const reviewSchema = z.object({
    id: z.string(),
    employeeId: z.string(),
    managerId: z.string(),
    jobTitle: z.string(),
    competencies: z.array(competencyReviewSchema),
    reviewType: reviewTypeSchema,
    status: reviewStatusSchema,
});

export type Review = z.infer<typeof reviewSchema>;

import { z } from 'zod';
import {ReviewStatus} from './ReviewStatus';
import { CompetencyReview} from './CompetencyReview';
import {ReviewType} from './ReviewType';

export const reviewScema = z.object({
    id: z.string(),
    employeeId: z.string(),
    managerId: z.string(),
    jobTitle: z.string(),
    competencies: z.array(CompetencyReview),
    reviewType: ReviewType,
    status: ReviewStatus,
});

export type Review = z.infer<typeof reviewScema>; // string

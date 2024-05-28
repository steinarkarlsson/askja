import z from 'zod';
import {competencyReview, reviewStatus, reviewTypes} from './index';

export const review = z.object({
    id: z.string(),
    employeeId: z.string(),
    managerId: z.string(),
    jobTitle: z.string(),
    competencies: z.array(competencyReview),
    reviewType: reviewTypes,
    status: reviewStatus,
});
import z from 'zod';
import {CompetencyReview, ReviewStatus} from './index';
import {ReviewType} from "./ReviewType";

export const Review = z.object({
    id: z.string(),
    employeeId: z.string(),
    managerId: z.string(),
    jobTitle: z.string(),
    competencies: z.array(CompetencyReview),
    reviewType: ReviewType,
    status: ReviewStatus,
});
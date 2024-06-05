import { z } from 'zod';
import { competencyReviewSchema } from './CompetencyReview';
import { reviewStatusSchema } from './ReviewStatus';
import { reviewTypeSchema } from './ReviewType';
import { employeeLevelSchema } from './EmployeeLevel';

export const reviewSchema = z.object({
    id: z.string(),
    employeeId: z.string(),
    employeeName: z.string(),
    managerId: z.string(),
    status: reviewStatusSchema,
    jobTitle: z.string(),
    level: employeeLevelSchema,
    reviewPeriodId: z.string(),
    reviewPeriodName: z.string(),
    reviewType: reviewTypeSchema,
    coreTemplateId: z.string(),
    functionalTemplateId: z.string(),
    competencies: z.array(competencyReviewSchema),
});

export type Review = z.infer<typeof reviewSchema>;

import { z } from 'zod';
import { competencySchema } from './Competency';
import { reviewStatusSchema } from './ReviewStatus';
import { reviewTypeSchema } from './ReviewType';

export const reviewSchema = z.object({
    competencies: z.array(competencySchema),
    employeeName: z.string(),
    id: z.string(),
    employeeLevel: z.string(),
    jobTitle: z.string().optional(),
    manager: z.string().optional().nullable(),
    reviewPeriodName: z.string(),
    status: reviewStatusSchema,
    employeeId: z.string(),
    reviewPeriodId: z.string(),
    reviewType: reviewTypeSchema,
    coreTemplateId: z.string(),
    functionalTemplateId: z.string(),
});

export type Review = z.infer<typeof reviewSchema>;

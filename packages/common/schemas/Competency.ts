import { z } from 'zod';
import { competencyReviewStatusSchema } from './CompetencyReviewStatus';

export const competencySchema = z.object({
    title: z.string().optional().nullable(),
    competencyCategory: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    managerComment: z.string().optional().nullable(),
    hrComment: z.string().optional().nullable(),
    managerApproved: competencyReviewStatusSchema.optional().nullable(),
    hrApproved: competencyReviewStatusSchema.optional().nullable(),
    source:z.enum(['template']).optional().nullable(),
});

export type Competency = z.infer<typeof competencySchema>;

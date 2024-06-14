import { z } from 'zod';
import { competencyTypeSchema } from './CompetencyType';
import { competencyReviewStatusSchema } from './CompetencyReviewStatus';

export const competencySchema = z.object({
    title: z.string(),
    category: z.string(),
    competencyType: competencyTypeSchema,
    description: z.string(),
    managerComment: z.string().optional(),
    hrComment: z.string().optional(),
    managerApproved: competencyReviewStatusSchema.optional(),
    hrApproved: competencyReviewStatusSchema.optional(),
    source:z.enum(['template']).optional(),
});

export type Competency = z.infer<typeof competencySchema>;

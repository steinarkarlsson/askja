import { z } from 'zod';
import { competencyCategorySchema } from './CompetencyCategory';
import { competencyTypeSchema } from './CompetencyType';
import { competencyReviewStatusSchema } from './CompetencyReviewStatus';

export const competencySchema = z.object({
    title: z.string(),
    category: competencyCategorySchema,
    competencyType: competencyTypeSchema,
    description: z.string(),
    managerComment: z.string(),
    hrComment: z.string(),
    managerApproved: competencyReviewStatusSchema,
    hrApproved: competencyReviewStatusSchema,
    template: z.boolean(),
    source:z.enum(['template']).optional(),
});

export type Competency = z.infer<typeof competencySchema>;

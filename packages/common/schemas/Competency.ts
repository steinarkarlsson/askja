import { z } from 'zod';
import { competencyCategorySchema } from './CompetencyCategory';
import { competencyTypeSchema } from './CompetencyType';

export const competencySchema = z.object({
    id: z.string(),
    title: z.string(),
    category: competencyCategorySchema,
    type: competencyTypeSchema,
    employeeDescription: z.string(),
    managerDescription: z.string(),
    humanResourcesDescription: z.string(),
    managerApproved: z.enum(['approved', 'request changes']),
    humanResourcesApproved: z.enum(['approved', 'request changes']),
});

export type Competency = z.infer<typeof competencySchema>;

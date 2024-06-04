import { z } from 'zod';
import { competencyTypeSchema } from './CompetencyType';

export const competencyReviewSchema = z.object({
    id: z.string(),
    objective: z.string(),
    title: competencyTypeSchema,
    employeeNotes: z.string(),
    managerNotes: z.string(),
    humanResourcesNotes: z.string(),
    employeeRating: z.number(),
    managerRating: z.number(),
    humanResourcesRating: z.number(),
});

export type CompetencyReview = z.infer<typeof competencyReviewSchema>;

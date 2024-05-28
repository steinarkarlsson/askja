import { z } from 'zod';
import {CompetencyType} from './index';

export const CompetencyReview = z.object({
    id: z.string(),
    objective: z.string(),
    title: CompetencyType,
    employeeNotes: z.string(),
    managerNotes: z.string(),
    humanResourcesNotes: z.string(),
    employeeRating: z.number(),
    managerRating: z.number(),
    humanResourcesRating: z.number(),
});
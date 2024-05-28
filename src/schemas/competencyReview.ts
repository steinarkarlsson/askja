import z from 'zod';
import {competencyType} from './index';

export const competencyReview = z.object({
    id: z.string(),
    objective: z.string(),
    title: competencyType,
    employeeNotes: z.string(),
    managerNotes: z.string(),
    humanResourcesNotes: z.string(),
    employeeRating: z.number(),
    managerRating: z.number(),
    humanResourcesRating: z.number(),
});
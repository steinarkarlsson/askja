import z from 'zod';
import {Competency, EmployeeLevel} from './index';

export const ReviewTemplate = z.object({
    id: z.string(),
    level: EmployeeLevel,
    jobTitle: z.string(),
    competencies: z.array(Competency),
});
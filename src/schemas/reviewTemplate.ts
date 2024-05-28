import z from 'zod';
import {competency, employeeLevel} from './index';

export const reviewTemplate = z.object({
    id: z.string(),
    level: employeeLevel,
    jobTitle: z.string(),
    competencies: z.array(competency),
});
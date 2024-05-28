import z from 'zod';
import {employeeLevel} from './index';

export const employee = z.object({
    id: z.string(),
    name: z.string(),
    jobTitle: z.string(),
    level: employeeLevel,
    managerId: z.string(),
    active: z.boolean(),
});
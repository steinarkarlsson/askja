import { z } from 'zod';
import {EmployeeLevel} from './EmployeeLevel';

export const Employee = z.object({
    id: z.string(),
    name: z.string(),
    jobTitle: z.string(),
    level: EmployeeLevel,
    managerId: z.string(),
    active: z.boolean(),
});
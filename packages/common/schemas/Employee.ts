import { z } from 'zod';
import { employeeLevelSchema } from './EmployeeLevel';

export const employeeSchema = z.object({
    id: z.string(),
    name: z.string(),
    jobTitle: z.string(),
    level: employeeLevelSchema,
    managerId: z.string(),
    active: z.boolean(),
    role: z.enum(['employee', 'manager', 'admin']),
});


export type Employee = z.infer<typeof employeeSchema>

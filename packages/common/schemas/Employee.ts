import { z } from 'zod';
import { employeelevelSchema } from './employeeLevel';

export const employeeSchema = z.object({
    active: z.boolean(),
    email: z.string(),
    userId: z.string(),
    id: z.string(),
    jobTitle: z.string(),
    level: employeelevelSchema,
    managerId: z.string().nullable(),
    name: z.string(),
    role: z.enum(['employee', 'manager', 'admin']),
});

export type Employee = z.infer<typeof employeeSchema>

import { z } from 'zod';
import { levelsSchema } from './Levels';

export const employeeSchema = z.object({
    active: z.boolean(),
    email: z.string(),
    id: z.string(),
    jobTitle: z.string(),
    level: levelsSchema,
    manager: z.string().nullable(),
    name: z.string(),
    role: z.enum(['employee', 'manager', 'admin']),
});

export type Employee = z.infer<typeof employeeSchema>

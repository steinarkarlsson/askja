import { z } from 'zod';

export const employeeSchema = z.object({
    active: z.boolean(),
    email: z.string(),
    userId: z.string().optional(),
    id: z.string(),
    jobTitle: z.string(),
    employeeLevel: z.string(),
    manager: z.string().optional().nullable(),
    name: z.string(),
    role: z.enum(['employee', 'manager', 'admin']),
});

export type Employee = z.infer<typeof employeeSchema>

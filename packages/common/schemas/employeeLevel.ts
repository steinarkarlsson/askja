import { z } from 'zod';

export const employeelevelSchema = z.object({
    id: z.string(),
    name: z.string(),
    parentId: z.string().nullable(),
    selfReview: z.boolean()
    });

export type EmployeeLevel = typeof employeelevelSchema;

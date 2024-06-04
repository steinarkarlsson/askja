import { z } from 'zod';

export const reviewStatusSchema = z.enum(
    [
        'active',
        'not started',
        'in progress',
        'closed'
    ]);

export type ReviewStatus = z.infer<typeof reviewStatusSchema>;

import { z } from 'zod';

export const reviewStatusSchema = z.enum(
    [
        'Pending Employee',
        'Pending Manager',
        'Pending HR',
        'Completed'
    ]);

export type ReviewStatus = z.infer<typeof reviewStatusSchema>;

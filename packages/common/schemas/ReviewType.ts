import { z } from 'zod';

export const reviewTypeSchema = z.enum(
    [
        'endOfYear',
        'midYear'
    ]);

export type ReviewType = z.infer<typeof reviewTypeSchema>;

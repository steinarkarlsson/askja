import { z } from 'zod';

export const ReviewStatus = z.enum([
    'active',
    'not started',
    'in progress',
    'closed'
]);
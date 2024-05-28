import z from 'zod';

export const ReviewType = z.enum([
    'endOfYear',
    'midYear',
]);
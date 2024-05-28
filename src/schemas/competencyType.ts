import z from 'zod';

export const competencyType = z.enum([
    'core',
    'functional'
]);
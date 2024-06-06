import { z } from 'zod';

export const competencyTypeSchema = z.enum(
    [
        'Core',
        'Functional'
    ]);

export type CompetencyType = z.infer<typeof competencyTypeSchema>;

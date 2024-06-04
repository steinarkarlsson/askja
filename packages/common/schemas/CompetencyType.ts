import { z } from 'zod';

export const competencyTypeSchema = z.enum(
    [
        'core',
        'functional'
    ]);

export type CompetencyType = z.infer<typeof competencyTypeSchema>;

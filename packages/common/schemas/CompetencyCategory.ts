import { z } from 'zod';

export const competencyCategorySchema = z.enum(
    [
        'Financial',
        'Operational',
        'Customer',
        'People',
        'fun',
        'family',
        'passion',
        'pride'
    ]);

export type CompetencyCategory = z.infer<typeof competencyCategorySchema>;

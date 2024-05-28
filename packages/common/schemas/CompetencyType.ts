import { z } from 'zod';

export const CompetencyType = z.enum([
    'core',
    'functional'
]);
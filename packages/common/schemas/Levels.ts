import { z } from 'zod';

export const levelsSchema = z.enum(
    [
        'All',
        'Executive Leader',
        'Head of Department',
        'Senior Professional',
        'Professional',
        'Support',
    ]);

export type Levels = typeof levelsSchema;

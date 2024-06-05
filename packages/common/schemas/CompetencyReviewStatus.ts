import { z } from 'zod';

export const competencyReviewStatusSchema = z.enum(
    [
        'Approved',
        'Request Changes'
    ]);

export type CompetenecyReviewStatus = typeof competencyReviewStatusSchema;

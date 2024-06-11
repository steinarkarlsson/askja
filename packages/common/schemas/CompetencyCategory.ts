import { z } from 'zod';

export const competencyCategorySchema = z.enum(
    [
        '',
        'Financial',
        'Operational',
        'Customer',
        'People',
        'Open Hearts and Open Minds',
        'Without US we are nothing',
        'We live and breath adventure',
        'Our own journey will never finish'
    ]);

export type CompetencyCategory = z.infer<typeof competencyCategorySchema>;

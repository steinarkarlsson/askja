import { z } from 'zod';
import { competencySchema } from './Competency';
import { levelsSchema } from './Levels';
import { competencyTypeSchema } from './CompetencyType';

export const templateSchema = z.object({
    id: z.string(),
    level: levelsSchema,
    jobTitle: z.string(),
    type: competencyTypeSchema,
    competencies: z.array(competencySchema),
    active: z.boolean(),
});

export type Template = z.infer<typeof templateSchema>;

import { z } from 'zod';
import { competencySchema } from './Competency';
import { employeelevelSchema } from './employeeLevel';
import { competencyTypeSchema } from './CompetencyType';

export const templateSchema = z.object({
    id: z.string(),
    level: employeelevelSchema,
    jobTitle: z.string().optional(),
    type: competencyTypeSchema,
    competencies: z.array(competencySchema),
    active: z.boolean(),
});

export type Template = z.infer<typeof templateSchema>;

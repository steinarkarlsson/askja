import { z } from 'zod';
import { employeeLevelSchema } from './EmployeeLevel';
import { competencySchema } from './Competency';

export const templateSchema = z.object({
    id: z.string(),
    level: employeeLevelSchema,
    jobTitle: z.string(),
    competencies: z.array(competencySchema),
});

export type Template = z.infer<typeof templateSchema>;

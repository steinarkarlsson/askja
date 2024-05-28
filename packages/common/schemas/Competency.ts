import z from 'zod';
import {CompetencyType, CompetencyCategory} from './index';

export const Competency = z.object({
    id: z.string(),
    title: z.string(),
    category: CompetencyCategory,
    type: CompetencyType,
    employeeDescription: z.string(),
    managerDescription: z.string(),
    humanResourcesDescription: z.string(),
    managerApproved: z.enum(['approved','request changes']),
    humanResourcesApproved: z.enum(['approved','request changes']),
});

import z from 'zod';
import {competencyType, competencyCategory} from './index';

export const competency = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: competencyCategory,
    type: competencyType
});

import { z } from 'zod';

export const employeeLevelSchema = z.enum(
    [
        'Executive Leader - Grade 5',
        'Head of Department - Grade 4',
        'Senior Professional - Grade 3',
        'Professional - Grade 2',
        'Support - Grade 1',
    ]);

export type EmployeeLevel = z.infer<typeof employeeLevelSchema>;

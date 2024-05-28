import z from 'zod';

export const employeeLevel = z.enum([
    'Executive Leader - Grade 5',
    'Head of Department - Grade 4',
    'Senior Professional - Grade 3',
    'Professional - Grade 2',
    'Support - Grade 1'
]);
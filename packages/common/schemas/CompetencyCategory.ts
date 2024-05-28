import z from 'zod';

export const CompetencyCategory = z.enum([
    'Financial',
    'Operational',
    'Customer',
    'People',
    'fun',
    'family',
    'passion',
    'pride'
]);
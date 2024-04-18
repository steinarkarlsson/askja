import z from 'zod';

export const employeeLevel = z.enum([
    "Executive Leader - Grade 5",
    "Head of Department - Grade 4",
    "Senior Professional - Grade 3",
    "Professional - Grade 2",
    "Support - Grade 1"
]);
export const competencyType = z.enum([
    "core",
    "functional"
]);
export const competencyCategory = z.enum([
    "Financial",
    "Operational",
    "Customer",
    "People",
    "fun",
    "family",
    "passion",
    "pride"
]);
export const reviewType = z.enum([
    "end of year ",
    "mid year"
]);
export const reviewStatus = z.enum([
    "active",
    "not started",
    "in progress",
    "closed"
]);

export const competency = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    category: competencyCategory,
    type: competencyType
});

export const competencyReview = z.object({
    id: z.string(),
    objective: z.string(),
    title: competencyType,
    employeeNotes: z.string(),
    managerNotes: z.string(),
    humanResourcesNotes: z.string(),
    employeeRating: z.number(),
    managerRating: z.number(),
    humanResourcesRating: z.number(),
});

export const review = z.object({
    id: z.string(),
    employeeId: z.string(),
    managerId: z.string(),
    jobTitle: z.string(),
    competencies: z.array(competencyReview),
    reviewType: reviewType,
    status: reviewStatus,
});

export const reviewTemplate = z.object({
    id: z.string(),
    level: employeeLevel,
    jobTitle: z.string(),
    competencies: z.array(competency),
});

export const employee = z.object({
    id: z.string(),
    name: z.string(),
    jobTitle: z.string(),
    level: employeeLevel,
    managerId: z.string(),
    active: z.boolean(),
});
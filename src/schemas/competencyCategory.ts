import z from "zod";

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
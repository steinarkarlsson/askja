import z from "zod";

export const reviewStatus = z.enum([
    "active",
    "not started",
    "in progress",
    "closed"
]);
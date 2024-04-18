import z from "zod";
import {competencyReview} from "./competencyReview";
import {reviewStatus} from "./reviewStatus";
import {reviewType} from "./reviewType";

export const review = z.object({
    id: z.string(),
    employeeId: z.string(),
    managerId: z.string(),
    jobTitle: z.string(),
    competencies: z.array(competencyReview),
    reviewType: reviewType,
    status: reviewStatus,
});
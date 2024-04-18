import z from "zod";
import {competency} from "./competency";
import {employeeLevel} from "./employeeLevel";

export const reviewTemplate = z.object({
    id: z.string(),
    level: employeeLevel,
    jobTitle: z.string(),
    competencies: z.array(competency),
});
import z from "zod";

export const reviewType = z.enum([
    "end of year ",
    "mid year"
]);
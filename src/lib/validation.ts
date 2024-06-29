import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );

//creating jobs schema
export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    role: requiredString.max(100),
    type: requiredString.refine(
      (value) => jobTypes.includes(value),
      "Invalid job type",
    ),
    companyName: requiredString.max(50),
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(
      10,
      "Number can't be longer than 10 digits",
    ),
  })
  .and(locationSchema);

//filtering job schema
export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  salary: z.string().optional(),
});

export type CreateJobValues = z.infer<typeof createJobSchema>;
export type JobFilterValues = z.infer<typeof jobFilterSchema>;

// src/api/hiring/validators/candidate.validator.ts
import { z } from "zod";

export const CreateCandidateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  position: z.string().min(1, "Position is required"),
  referenceUrl: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
});

// All fields optional, but require at least one to be present
export const UpdateCandidateSchema = z
  .object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    position: z.string().min(1).optional(),
    referenceUrl: z.string().url().optional(),
    portfolioUrl: z.string().url().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

// Types
export type CreateCandidateDTO = z.infer<typeof CreateCandidateSchema>;
export type UpdateCandidateDTO = z.infer<typeof UpdateCandidateSchema>;

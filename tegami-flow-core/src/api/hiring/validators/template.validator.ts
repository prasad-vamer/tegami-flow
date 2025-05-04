// src/api/hiring/validators/template.validator.ts
import { z } from "zod";

export const CreateTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  strict: z.boolean().optional().default(false),
});

export const UpdateTemplateSchema = z
  .object({
    name: z.string().min(1).optional(),
    subject: z.string().min(1).optional(),
    body: z.string().min(1).optional(),
    strict: z.boolean().optional().default(false),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

export type CreateTemplateDTO = z.infer<typeof CreateTemplateSchema>;
export type UpdateTemplateDTO = z.infer<typeof UpdateTemplateSchema>;

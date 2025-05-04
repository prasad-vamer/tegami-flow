// src/api/hiring/validators/email.validator.ts
import { z } from "zod";

export const SendEmailSchema = z.object({
  candidateId: z.string().uuid(),
  templateId: z.string().uuid(),
  data: z.record(z.any()).optional(), // dynamic values for Handlebars
});

export type SendEmailDTO = z.infer<typeof SendEmailSchema>;

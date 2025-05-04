// src/api/hiring/controllers/email.controller.ts
import { Request, Response, NextFunction } from "express";
import { CandidateService } from "core/hiring/candidates/candidate.service";
import { TemplateService } from "core/hiring/templates/template.service";
import {
  mergeTemplate,
  mergeTemplateStrict,
} from "core/hiring/email/email.merger";
import { sendEmail } from "core/hiring/email/email.sender";
import { SendEmailSchema } from "api/hiring/validators/email.validator";

const candidateService = new CandidateService();
const templateService = new TemplateService();

export async function send(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { templateId, candidateId, data } = SendEmailSchema.parse(req.body);

    // 1. Get candidate and template
    const candidate = await candidateService.getCandidateById(candidateId);
    const template = await templateService.getTemplateById(templateId);

    if (!template) {
      res.status(404).json({ message: "Template not found" });
      return;
    }

    // 2. Merge template with candidate + additional data
    const mergeData = { ...candidate, ...(data || {}) };
    const compiled = template.strict
      ? mergeTemplateStrict(
          { subject: template.subject, body: template.body },
          mergeData
        )
      : mergeTemplate(
          { subject: template.subject, body: template.body },
          mergeData
        );

    // 3. Send the email
    await sendEmail({
      toEmail: candidate.email,
      subject: compiled.subject,
      body: compiled.body,
      candidateId,
      templateId,
    });

    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    next(err);
  }
}

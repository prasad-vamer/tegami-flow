import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { EmailLogService } from "../email-logs/email-log.service";
import { SendEmailInput } from "./email.types";
import { EmailSendingError } from "./email.errors";

// Load config via environment or fallback
const RETRY_LIMIT = parseInt(process.env.RETRY_LIMIT || "3", 10);
const AWS_REGION = process.env.AWS_REGION || "ap-northeast-1";
const SENDER_EMAIL = process.env.SENDER_EMAIL || "no-reply@yourdomain.com";
const DISPLAY_NAME = process.env.DISPLAY_NAME;

const ses = new SESClient({ region: AWS_REGION });

export async function sendEmail(input: SendEmailInput) {
  const { toEmail, subject, body, templateId, candidateId } = input;

  let attempts = 0;
  let lastError: string | undefined;
  const displayName = `${DISPLAY_NAME} <${SENDER_EMAIL}>`;
  while (attempts < RETRY_LIMIT) {
    try {
      await ses.send(
        new SendEmailCommand({
          Source: displayName,
          Destination: { ToAddresses: [toEmail] },
          Message: {
            Subject: { Data: subject },
            Body: { Html: { Data: body } },
          },
        })
      );

      await new EmailLogService().createLog({
        toEmail,
        subject,
        body,
        status: "sent",
        templateId,
        candidateId,
      });

      return;
    } catch (err: any) {
      lastError = err.message;
      attempts += 1;
    }
  }

  await new EmailLogService().createLog({
    toEmail,
    subject,
    body,
    status: "failed",
    error: lastError,
    templateId,
    candidateId,
  });

  throw new EmailSendingError(lastError || "Unknown error");
}

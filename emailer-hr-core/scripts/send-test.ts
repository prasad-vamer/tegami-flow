import { sendEmail } from "../src/hiring/email/email.sender";
import { SendEmailInput } from "../src/hiring/email/email.types";

const testEmail: SendEmailInput = {
  toEmail: "test.admin@gmail.com",
  subject: "Test Email from EmailerHR",
  body: "<p>This is a test email sent from EmailerHR using AWS SES.</p>",
};

async function sendTestEmail() {
  try {
    await sendEmail(testEmail);
    console.log("Test email sent successfully!");
  } catch (error: unknown) {
    // Type the error explicitly as an instance of Error∏
    if (error instanceof Error) {
      console.error("Failed to send test email:", error.message);
    } else {
      console.error("Failed to send test email: Unknown error");
    }
  }
}

sendTestEmail();

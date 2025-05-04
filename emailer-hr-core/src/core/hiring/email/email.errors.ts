export class EmailSendingError extends Error {
  constructor(message: string) {
    super(`Failed to send email: ${message}`);
    this.name = "EmailSendingError";
  }
}

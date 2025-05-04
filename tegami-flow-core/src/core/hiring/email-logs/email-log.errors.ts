export class EmailLogNotFoundError extends Error {
  constructor(id: string) {
    super(`Email log with ID "${id}" not found.`);
    this.name = "EmailLogNotFoundError";
  }
}

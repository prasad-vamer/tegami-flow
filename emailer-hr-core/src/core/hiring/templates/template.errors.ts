export class TemplateNotFoundError extends Error {
  constructor(id: string) {
    super(`Template with ID "${id}" not found.`);
    this.name = "TemplateNotFoundError";
  }
}

export class DuplicateTemplateNameError extends Error {
  constructor(name: string) {
    super(`A template with the name "${name}" already exists.`);
    this.name = "DuplicateTemplateNameError";
  }
}

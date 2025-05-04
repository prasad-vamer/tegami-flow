import Handlebars from "handlebars";

function formatBodyWithLineBreaks(html: string): string {
  return html.replace(/\n/g, "<br>");
}

// This function merges a template with data using Handlebars.
// It replaces the placeholders in the template with the corresponding values from the data object.
// The template can contain placeholders in the form of {{key}}.
// The function returns an object containing the merged subject and body.
// The mergeTemplate function does not enforce strict checking of the data object.
// It will replace the placeholders with whatever values are available in the data object.
// If a placeholder does not have a corresponding value in the data object, it will be replaced with an empty string.
// This means that the function will not throw an error if some placeholders are missing.
// This is useful when you want to allow for optional data in the template.
export function mergeTemplate(
  template: { subject: string; body: string },
  data: Record<string, any>
): { subject: string; body: string } {
  const compile = (tpl: string) => Handlebars.compile(tpl)(data);
  return {
    subject: compile(template.subject),
    body: formatBodyWithLineBreaks(compile(template.body)),
  };
}

// This function merges a template with data using Handlebars.
// It replaces the placeholders in the template with the corresponding values from the data object.
// The template can contain placeholders in the form of {{key}}.
// The function returns an object containing the merged subject and body.
// The mergeTemplateStrict function enforces strict checking of the data object.
// It will throw an error if any placeholders in the template do not have a corresponding value in the data object.
// This means that the function will not replace the placeholders with empty strings.
// This is useful when you want to ensure that all required data is provided for the template.
export function mergeTemplateStrict(
  template: { subject: string; body: string },
  data: Record<string, any>
): { subject: string; body: string } {
  const requiredVars = extractVariables(template.subject + template.body);
  const missing = requiredVars.filter((key) => !(key in data));

  if (missing.length > 0) {
    throw new Error(`Missing template variables: ${missing.join(", ")}`);
  }

  const compile = (tpl: string) => Handlebars.compile(tpl)(data);
  return {
    subject: compile(template.subject),
    body: formatBodyWithLineBreaks(compile(template.body)),
  };
}

function extractVariables(templateStr: string): string[] {
  const regex = /{{\s*(\w+)\s*}}/g;
  const vars = new Set<string>();
  let match;
  while ((match = regex.exec(templateStr)) !== null) {
    vars.add(match[1]);
  }
  return Array.from(vars);
}

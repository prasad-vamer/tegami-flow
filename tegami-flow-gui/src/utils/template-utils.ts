import type { Candidate } from "src/types/candidate";
import type { TemplateWithContent } from "src/types/email";

// Extract all variables from a template (both subject and body)
export function extractTemplateVariables(
  template: TemplateWithContent | null
): string[] {
  if (!template) return [];

  const variables: Set<string> = new Set();

  // Extract variables from subject
  const subjectVariables = extractVariablesFromText(template.subject);
  subjectVariables.forEach((variable) => variables.add(variable));

  // Extract variables from body
  const bodyVariables = extractVariablesFromText(template.body);
  bodyVariables.forEach((variable) => variables.add(variable));

  return Array.from(variables);
}

// Extract variables from a text string
export function extractVariablesFromText(text: string): string[] {
  const variableRegex = /\{\{([^{}]+)\}\}/g;
  const matches = text.match(variableRegex) || [];

  // Remove the {{ and }} from each match
  return matches.map((match) => match.replace(/\{\{|\}\}/g, ""));
}

// Check if a variable can be filled from candidate data
export function isVariableFromCandidate(variable: string): boolean {
  const candidateFields = ["name", "email", "position"];
  return candidateFields.includes(variable.toLowerCase());
}

// Get candidate value for a variable
export function getCandidateValueForVariable(
  candidate: Candidate | null,
  variable: string
): string {
  if (!candidate) return "";

  const lowerVariable = variable.toLowerCase();

  switch (lowerVariable) {
    case "name":
      return candidate.name;
    case "email":
      return candidate.email;
    case "position":
      return candidate.position;
    default:
      return "";
  }
}

// Replace variables in a template with actual values
export function replaceTemplateVariables(
  text: string,
  variables: Record<string, string>
): string {
  return text.replace(/\{\{([^{}]+)\}\}/g, (match, variable) => {
    return variables[variable] || match;
  });
}

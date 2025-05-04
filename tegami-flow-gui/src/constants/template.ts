import { t } from "i18next";
import { Variable } from "src/molecules/variable-inserter";

// Define available variables
export const bodyVariables: Variable[] = [
  { key: "{{name}}", label: t("templates.variables.name") },
  { key: "{{email}}", label: t("templates.variables.email") },
  { key: "{{position}}", label: t("templates.variables.position") },
  { key: "{{company}}", label: t("templates.variables.company") },
  { key: "{{date}}", label: t("templates.variables.date") },
  { key: "{{time}}", label: t("templates.variables.time") },
  { key: "{{hr-sign}}", label: t("templates.variables.signature") },
];

export const subjectVariables: Variable[] = [
  { key: "{{name}}", label: t("templates.variables.name") },

  { key: "{{position}}", label: t("templates.variables.position") },
  { key: "{{company}}", label: t("templates.variables.company") },
];

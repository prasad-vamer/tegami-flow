import { useTranslation } from "react-i18next";
import { Variable } from "src/molecules/variable-inserter";

export function useBodyVariables(): Variable[] {
  const { t } = useTranslation();

  return [
    { key: "{{name}}", label: t("templates.variables.name") },
    { key: "{{email}}", label: t("templates.variables.email") },
    { key: "{{position}}", label: t("templates.variables.position") },
    { key: "{{company}}", label: t("templates.variables.company") },
    { key: "{{date}}", label: t("templates.variables.date") },
    { key: "{{time}}", label: t("templates.variables.time") },
    { key: "{{hr-sign}}", label: t("templates.variables.signature") },
  ];
}

export function useSubjectVariables(): Variable[] {
  const { t } = useTranslation();

  return [
    { key: "{{name}}", label: t("templates.variables.name") },
    { key: "{{position}}", label: t("templates.variables.position") },
    { key: "{{company}}", label: t("templates.variables.company") },
  ];
}

;

import type React from "react";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/shadcn/components/ui/button";
import { FormField } from "src/molecules/form-field";
import { FormToggle } from "src/atoms/form-toggle";
import { VariableInserter } from "src/molecules/variable-inserter";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { FormError } from "src/atoms/form-error";
import type { TemplateFormData, FormErrors } from "src/hooks/useCreateTemplate";
import { useBodyVariables, useSubjectVariables } from "src/constants/template";

interface TemplateFormProps {
  onSubmit: (data: TemplateFormData) => Promise<void>;
  isSubmitting: boolean;
  errors: FormErrors;
  setErrors: (errors: FormErrors) => void;
}

export function TemplateForm({
  onSubmit,
  isSubmitting,
  errors,
  setErrors,
}: TemplateFormProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Add a second useRef for the subject input
  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<TemplateFormData>({
    name: "",
    subject: "",
    body: "",
    strict: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleToggleChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, strict: checked }));
  };

  /// Add a new function to handle inserting variables into the subject field
  const handleInsertVariableToSubject = (variable: string) => {
    if (subjectInputRef.current) {
      const input = subjectInputRef.current;
      // Add null checks with default values of 0
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;
      const text = input.value;
      const before = text.substring(0, start);
      const after = text.substring(end);

      const newValue = before + variable + after;
      const newCursorPos = start + variable.length;

      setFormData((prev) => ({ ...prev, subject: newValue }));

      // Set cursor position after the inserted variable
      setTimeout(() => {
        input.focus();
        input.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  const handleInsertVariable = (variable: string) => {
    if (bodyTextareaRef.current) {
      const textarea = bodyTextareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;
      const before = text.substring(0, start);
      const after = text.substring(end);

      const newValue = before + variable + after;
      const newCursorPos = start + variable.length;

      setFormData((prev) => ({ ...prev, body: newValue }));

      // Set cursor position after the inserted variable
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        id="name"
        label={t("templates.fields.name")}
        placeholder={t("templates.form.namePlaceholder")}
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        disabled={isSubmitting}
      />

      <div className="space-y-1.5 mb-4">
        <label
          htmlFor="subject"
          className="text-sm font-medium flex items-center"
        >
          {t("templates.fields.subject")}
          <span className="text-destructive ml-1">*</span>
        </label>

        <VariableInserter
          onInsert={handleInsertVariableToSubject}
          disabled={isSubmitting}
          className="mb-2"
          label={t("templates.variables.titleForSubject")}
          variables={useSubjectVariables()}
        />

        <input
          id="subject"
          name="subject"
          ref={subjectInputRef}
          value={formData.subject}
          onChange={handleChange}
          placeholder={t("templates.form.subjectPlaceholder")}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.subject
              ? "border-destructive focus-visible:ring-destructive"
              : "border-input"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
          required
          disabled={isSubmitting}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <FormError id="subject-error">{errors.subject}</FormError>
        )}
      </div>

      <div className="space-y-1.5 mb-4">
        <label htmlFor="body" className="text-sm font-medium flex items-center">
          {t("templates.fields.body")}
          <span className="text-destructive ml-1">*</span>
        </label>

        <VariableInserter
          onInsert={handleInsertVariable}
          disabled={isSubmitting}
          className="mb-2"
          label={t("templates.variables.titleForBody")}
          variables={useBodyVariables()}
        />

        <Textarea
          id="body"
          name="body"
          ref={bodyTextareaRef}
          value={formData.body}
          onChange={handleChange}
          placeholder={t("templates.form.bodyPlaceholder")}
          className={`min-h-[200px] ${
            errors.body
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          }`}
          required
          disabled={isSubmitting}
          aria-invalid={!!errors.body}
          aria-describedby={errors.body ? "body-error" : undefined}
        />
        {errors.body && <FormError id="body-error">{errors.body}</FormError>}
      </div>

      <FormToggle
        id="strict"
        label={t("templates.fields.strict")}
        checked={formData.strict}
        onChange={handleToggleChange}
        helperText={t("templates.helpers.strict")}
        disabled={isSubmitting}
        className="mt-6"
      />

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/templates")}
          disabled={isSubmitting}
        >
          {t("common.cancel")}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? t("templates.form.creating")
            : t("templates.form.create")}
        </Button>
      </div>
    </form>
  );
}

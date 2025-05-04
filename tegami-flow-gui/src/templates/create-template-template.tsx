;

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useCreateTemplate,
  type TemplateFormData,
} from "src/hooks/useCreateTemplate";
import { TemplateForm } from "src/organisms/template-form";
import { Button } from "@/shadcn/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function CreateTemplateTemplate() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createTemplate, isSubmitting, errors, setErrors } =
    useCreateTemplate();

  const handleSubmit = async (data: TemplateFormData) => {
    const result = await createTemplate(data);
    if (result) {
      navigate("/templates");
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("templates.create.title")}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("templates.create.description")}
        </p>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => navigate("/templates")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t("templates.form.back")}
      </Button>
      <div className="border rounded-lg p-6 bg-card">
        <TemplateForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
}

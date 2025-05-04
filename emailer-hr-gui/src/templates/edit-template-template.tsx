;

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shadcn/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/shadcn/components/ui/skeleton";
import { useTemplate } from "src/hooks/useTemplate";
import {
  useUpdateTemplate,
  type TemplateUpdateData,
} from "src/hooks/useUpdateTemplate";
import { TemplateEditForm } from "src/organisms/template-edit-form";
import { Button } from "@/shadcn/components/ui/button";

interface EditTemplateTemplateProps {
  templateId: string;
}

export function EditTemplateTemplate({
  templateId,
}: EditTemplateTemplateProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { template, isLoading, error } = useTemplate(templateId);
  const { updateTemplate, isSubmitting, errors, setErrors } =
    useUpdateTemplate(templateId);

  const handleSubmit = async (data: TemplateUpdateData) => {
    const result = await updateTemplate(data);
    if (result) {
      navigate("/templates");
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("templates.edit.title")}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("templates.edit.description")}
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
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{t("common.error")}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-12" />
            </div>
            <div className="flex justify-end space-x-4 pt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        ) : template ? (
          <TemplateEditForm
            template={template}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            errors={errors}
            setErrors={setErrors}
          />
        ) : null}
      </div>
    </div>
  );
}

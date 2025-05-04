;
import { ArrowLeft } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import { CandidateForm } from "src/organisms/candidate-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface CreateCandidateTemplateProps {
  onSuccess?: () => void;
}

export function CreateCandidateTemplate({
  onSuccess,
}: CreateCandidateTemplateProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("candidates.add")}
        </h1>
        <p className="text-muted-foreground mt-1">
          {t("candidates.form.addDescription")}
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/candidates")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t("candidates.form.back")}
      </Button>
      <div className="border rounded-lg p-6 bg-card">
        <CandidateForm onSuccess={onSuccess} />
      </div>
    </div>
  );
}

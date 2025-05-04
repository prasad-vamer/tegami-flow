import { TableCell } from "src/atoms/table-cell";
import { ActionButton } from "src/atoms/action-button";
import { DeleteConfirmDialog } from "src/molecules/delete-confirm-dialog";
import { useState } from "react";
import { Candidate } from "src/types/candidate";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TableRow } from "@/shadcn/components/ui/table";
import { ExternalLink, Github, MailPlus, Pencil, Trash2 } from "lucide-react";

interface CandidateTableRowProps {
  candidate: Candidate;
  onEdit: (candidate: Candidate) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function CandidateTableRow({
  candidate,
  onEdit,
  onDelete,
}: CandidateTableRowProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(candidate.id);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSendEmail = () => {
    navigate(`/emails/send?candidateId=${candidate.id}`);
  };

  const formattedDate = candidate.createdAt
    ? new Date(candidate.createdAt).toLocaleDateString()
    : "N/A";

  // Function to render action button with link if URL exists
  const renderActionLink = (
    url: string | null,
    icon: React.ReactNode,
    label: string
  ) => {
    const buttonContent = (
      <ActionButton
        variant="outline"
        size="icon"
        disabled={!url}
        aria-label={label}
      >
        {icon}
      </ActionButton>
    );

    if (url) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex hover:opacity-80 focus:opacity-80 transition-opacity"
          aria-label={label}
        >
          {buttonContent}
        </a>
      );
    }

    return buttonContent;
  };

  return (
    <TableRow className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <TableCell>{candidate.name}</TableCell>
      <TableCell>{candidate.email}</TableCell>
      <TableCell>{candidate.position}</TableCell>
      <TableCell>{formattedDate}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ActionButton
            variant="outline"
            size="icon"
            onClick={() => handleSendEmail()}
            aria-label={t("candidates.actions.sendEmail")}
            title={t("candidates.actions.sendEmail")}
          >
            <MailPlus className="h-4 w-4 text-blue-600" />
          </ActionButton>

          {/* Always show GitHub icon, but disable if no URL */}
          {renderActionLink(
            candidate.portfolioUrl,
            <Github className="h-4 w-4" />,
            t("candidates.fields.portfolioUrl")
          )}

          {/* Always show ExternalLink icon, but disable if no URL */}
          {renderActionLink(
            candidate.referenceUrl,
            <ExternalLink className="h-4 w-4" />,
            t("candidates.fields.referenceUrl")
          )}

          <ActionButton
            variant="outline"
            size="icon"
            onClick={() => onEdit(candidate)}
            aria-label={t("common.edit")}
          >
            <Pencil className="h-4 w-4" />
          </ActionButton>

          <ActionButton
            variant="outline"
            size="icon"
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isDeleting}
            aria-label={t("common.delete")}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </ActionButton>
        </div>
      </TableCell>

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title={t("candidates.delete")}
        description={t("candidates.deleteConfirm")}
      />
    </TableRow>
  );
}

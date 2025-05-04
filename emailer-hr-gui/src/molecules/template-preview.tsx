import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card"
import { Skeleton } from "@/shadcn/components/ui/skeleton"
import type { TemplateWithContent } from "src/types/email"

interface TemplatePreviewProps {
  template: TemplateWithContent | null
  isLoading: boolean
  variables: Record<string, string>
}

export function TemplatePreview({ template, isLoading, variables }: TemplatePreviewProps) {
  const { t } = useTranslation()

  // Replace variables in text with their values or highlight missing ones
  const replaceVariables = (text: string): string => {
    return text.replace(/\{\{([^{}]+)\}\}/g, (match, variable) => {
      if (variables[variable]) {
        return variables[variable]
      }
      return `<span class="bg-yellow-100 text-yellow-800 px-1 rounded">${match}</span>`
    })
  }

  // Convert newlines to HTML line breaks
  const formatWithLineBreaks = (text: string): string => {
    return text.replace(/\n/g, "<br />")
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-5 w-40" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>
    )
  }

  if (!template) {
    return null
  }

  const subjectWithVariables = replaceVariables(template.subject)
  // First replace variables, then convert newlines to <br> tags
  const bodyWithVariables = formatWithLineBreaks(replaceVariables(template.body))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("emails.preview.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">{t("emails.preview.subject")}</h4>
          <p dangerouslySetInnerHTML={{ __html: subjectWithVariables }} />
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">{t("emails.preview.body")}</h4>
          <div
            className="prose prose-sm max-w-none bg-muted-foreground/10 p-3 rounded"
            dangerouslySetInnerHTML={{ __html: bodyWithVariables }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

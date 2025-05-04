

import type React from "react"

import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/shadcn/components/ui/button"
import { cn } from "@/shadcn/lib/utils"

export interface Variable {
  key: string
  label: string
}

interface VariableInserterProps {
  onInsert: (variable: string) => void
  className?: string
  disabled?: boolean
  label?: string
  variables: Variable[]
}

export function VariableInserter({ onInsert, className, disabled = false, label, variables }: VariableInserterProps) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)



  const handleInsert = (variable: string) => {
    if (!disabled) {
      onInsert(variable)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, variable: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleInsert(variable)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium">{label || t("templates.variables.title")}</label>
      <div
        ref={containerRef}
        className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/30"
        role="toolbar"
        aria-label={t("templates.variables.ariaLabel")}
      >
        {variables.map((variable) => (
          <Button
            key={variable.key}
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => handleInsert(variable.key)}
            onKeyDown={(e) => handleKeyDown(e, variable.key)}
            disabled={disabled}
            tabIndex={0}
            className="h-7 px-2 text-xs font-medium"
            aria-label={t("templates.variables.insert", { variable: variable.label })}
          >
            {variable.label}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{t("templates.variables.instruction")}</p>
    </div>
  )
}

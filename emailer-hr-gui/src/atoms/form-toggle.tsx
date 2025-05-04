
import { Switch } from "@/shadcn/components/ui/switch"
import { Label } from "@/shadcn/components/ui/label"
import { cn } from "@/shadcn/lib/utils"

interface FormToggleProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  helperText?: string
  disabled?: boolean
  className?: string
}

export function FormToggle({ id, label, checked, onChange, helperText, disabled = false, className }: FormToggleProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center space-x-2">
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
          aria-describedby={helperText ? `${id}-description` : undefined}
        />
        <Label htmlFor={id} className="cursor-pointer">
          {label}
        </Label>
      </div>
      {helperText && (
        <p id={`${id}-description`} className="text-sm text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  )
}

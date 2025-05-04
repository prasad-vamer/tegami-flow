

import type React from "react"
import { FormLabel } from "src/atoms/form-label"
import { FormInput } from "src/atoms/form-input"
import { FormError } from "src/atoms/form-error"

interface FormFieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  disabled?: boolean
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5 mb-4">
      <FormLabel htmlFor={id} required={required}>
        {label}
      </FormLabel>
      <FormInput
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={!!error}
        required={required}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <FormError id={`${id}-error`}>{error}</FormError>}
    </div>
  )
}



import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import { Button } from "@/shadcn/components/ui/button"
import { languages } from "src/i18n/config"

export function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Ensure we only render after hydration to prevent SSR mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    const currentLang = i18n.language
    const newLang = currentLang === "en" ? "ja" : "en"
    i18n.changeLanguage(newLang)
  }

  if (!mounted) {
    return null
  }

  const currentLangName = i18n.language === "en" ? languages.en : languages.ja
  const nextLangName = i18n.language === "en" ? languages.ja : languages.en

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="bg-black-700 text-white border-white-500 hover:bg-green-900 hover:text-green"
    >
      {currentLangName} → {nextLangName}
    </Button>
  )
}

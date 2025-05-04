import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "./resources/en.json";
import jaTranslations from "./resources/ja.json";

// Define available languages
export const languages = {
  en: "English",
  ja: "日本語",
};

// Define resources
const resources = {
  en: {
    translation: enTranslations,
  },
  ja: {
    translation: jaTranslations,
  },
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,
    fallbackLng: "ja",
    debug: process.env.NODE_ENV === "development",

    // Common namespace used around the full app
    defaultNS: "translation",

    interpolation: {
      escapeValue: false, // React already safes from XSS
    },

    detection: {
      // Order of language detection
      order: ["localStorage", "navigator"],

      // Cache user language on localStorage
      caches: ["localStorage"],
    },
  });

export default i18n;

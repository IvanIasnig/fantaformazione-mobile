import { getLocales } from "expo-localization";
import { LanguageDetectorModule } from "i18next";
import {
  FALLBACK_LNG,
  SupportedLanguages,
  supportedLngs,
} from "../i18n.constants";

export const languages = getLocales()
  .map((lng) => lng.languageCode)
  .filter((lng) => lng !== null);
export const currentLanguage =
  (supportedLngs.find((lang) => lang === languages[0]) as SupportedLanguages) ||
  FALLBACK_LNG;

class LanguageDetector implements LanguageDetectorModule {
  type = "languageDetector" as const;
  static type: string;

  detect() {
    return languages;
  }
}

LanguageDetector.type = "languageDetector";

export default LanguageDetector;

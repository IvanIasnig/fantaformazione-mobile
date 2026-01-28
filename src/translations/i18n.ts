import i18n from "i18next";
import BackendMultiloadAdapter, {
  MultiloadBackendOptions,
} from "i18next-multiload-backend-adapter";
import "intl-pluralrules";
import { initReactI18next } from "react-i18next";
import { FALLBACK_LNG, namespaces } from "./i18n.constants";
import LanguageDetector from "./plugins/LanguageDetector";
import StorageBackend from "./plugins/StorageBackend";

const i18nInstance = i18n.createInstance();

const initializeTranslation = () =>
  new Promise<void>((resolve, reject) =>
    i18nInstance
      .use(initReactI18next)
      .use(LanguageDetector)
      .use(BackendMultiloadAdapter)
      .init<MultiloadBackendOptions>(
        {
          load: "languageOnly",
          initAsync: false,
          fallbackLng: FALLBACK_LNG,
          interpolation: {
            escapeValue: false,
          },
          react: {
            useSuspense: true,
          },
          ns: namespaces,
          backend: { backend: StorageBackend },
        },
        (err) => (err ? reject(err) : resolve()),
      ),
  );

export { i18nInstance };

export default initializeTranslation;

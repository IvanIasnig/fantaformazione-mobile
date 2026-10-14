import {
  BackendModule,
  MultiReadCallback,
  Resource,
  ResourceLanguage,
  Services,
} from "i18next";
import { SupportedLanguages, supportedLngs } from "../i18n.constants";
import en_translation from "../locales/en.json";
import it_translation from "../locales/it.json";

export const resources = {
  en: en_translation,
  it: it_translation,
};

class StorageBackend implements BackendModule {
  type = "backend" as const;

  static type: string;

  services: Services | undefined;

  init(services: Services) {
    this.services = services;
  }

  async read() {}

  async readMulti(
    languages: SupportedLanguages[],
    namespaces: string[],
    callback: MultiReadCallback,
  ) {
    const resource: Resource = {};

    for (const lng of languages) {
      if (!supportedLngs.find((lang) => lang === lng)) continue;

      const resourceLng: ResourceLanguage = resources[lng];

      const languageData: ResourceLanguage = {};

      for (const namespace of namespaces) {
        const namespaceData = resourceLng[namespace];

        if (!namespaceData) {
          console.warn(
            `${namespace} namespace not found in ${lng} translation file`,
          );
          continue;
        }

        languageData[namespace] = namespaceData;
      }

      resource[lng] = languageData;
    }

    callback(undefined, resource);
  }
}

StorageBackend.type = "backend";

export default StorageBackend;

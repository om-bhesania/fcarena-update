import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import global_en from "../../locales/en/global.json"; // Update the import path

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  debug: true,
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: global_en, // Update how the resource is defined
    },
  },
});

export default i18n;

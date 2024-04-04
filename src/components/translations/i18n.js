// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import { AddTrans } from "../../hooks/useAddTrans";

// // Initialize i18n
// i18n.use(initReactI18next).init({
//   lng: "en",
//   fallbackLng: "en",
//   debug: true,
//   interpolation: { escapeValue: false },
//   resources: {
//     en: {},
//   },
// });

// const fetchTranslations = async () => {
//   const { getTranslations } = AddTrans();
//   try {
//     const translations = await getTranslations();
//     const formattedTranslations = {};

//     // Format translations as key-value pairs
//     Object.keys(translations).forEach((key) => {
//       const { TransKey, TransValue } = translations[key];
//       formattedTranslations[TransKey] = TransValue;
//       console.log("TransKey: ", TransKey, "TransValue:", TransValue);
//     });

//     // Add the formatted translations to i18n resources
//     i18n.addResourceBundle("en", "translationz", formattedTranslations);

//     // Update the resources object directly
//     i18n.options.resources = {
//       ...i18n.options.resources,
//       en: { ...formattedTranslations },
//     };
//   } catch (error) {
//     console.error("Error fetching translations:", error);
//   }
// };

// fetchTranslations(); // Fetch translations when the app initializes

// export default i18n;

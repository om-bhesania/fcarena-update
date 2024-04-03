import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddTrans } from "../../hooks/useAddTrans";
import Button from "./../buttons/Button";
import I18n from "./i18n";

function TranslationForm() {
  const { addTranslation, loadTranslations } = AddTrans();
  const { t, I18n } = useTranslation();
  const [translations, setTranslations] = useState({});
  const [TransKey, setTransKey] = useState("");
  const [TransValue, setTransValue] = useState("");
  useEffect(() => {
    const fetchTranslations = async () => {
      const translations = await loadTranslations();
      setTranslations(translations);
    };
    fetchTranslations();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTranslation(TransKey, TransValue);
    const updatedTranslations = { ...translations, [TransKey]: TransValue };
    setTranslations(updatedTranslations);
    I18n.addResourceBundle(
      "en",
      "translation",
      updatedTranslations,
      true,
      true
    );
    setTransKey("");
    setTransValue("");
    console.log("TransKey: ", TransKey ,"TransValue:",TransValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center lg:gap-[10px] lg:flex-row flex-col gap-[20px]"
    >
      <input
        type="text"
        placeholder={t("title")}
        value={TransKey}
        onChange={(e) => setTransKey(e.target.value)}
        className="border-primary border-2 rounded-[6px] p-2"
        required
      />
      <input
        type="text"
        placeholder={t("title")}
        value={TransValue}
        onChange={(e) => setTransValue(e.target.value)}
        className="border-primary border-2 rounded-[6px] p-2"
        required
      />
      <Button
        role={"button"}
        type="submit"
        label={t("success")}
        variant={"primary"}
        customClass={"px-[20px] py-[10px]"}
      />
    </form>
  );
}

export default TranslationForm;

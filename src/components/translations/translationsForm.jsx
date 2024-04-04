import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AddTrans } from "../../hooks/useAddTrans";
import { useToast } from "@chakra-ui/react";
import Button from "../buttons/Button";

function TranslationForm() {
  const { addTranslation } = AddTrans();
  const toast = useToast(); // Initialize useToast hook
  const [translations, setTranslations] = useState({});
  const [TransKey, setTransKey] = useState("");
  const [TransValue, setTransValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTranslation(TransKey, TransValue);
      const updatedTranslations = { ...translations, [TransKey]: TransValue };
      setTranslations(updatedTranslations);
      setTransKey("");
      setTransValue("");
      // Display success toast
      toast({
        title: "Translation added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Refresh the page after adding translation
      window.location.reload();
    } catch (error) {
      // Display error toast if adding translation fails
      toast({
        title: "Error",
        description: "Failed to add translation",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error adding translation:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center lg:gap-[10px] lg:flex-row flex-col gap-[20px]"
    >
      <input
        type="text"
        placeholder="Add Key"
        value={TransKey}
        onChange={(e) => setTransKey(e.target.value)}
        className="border-primary border-2 rounded-[6px] p-2"
        required
      />
      <input
        type="text"
        placeholder="Add Value"
        value={TransValue}
        onChange={(e) => setTransValue(e.target.value)}
        className="border-primary border-2 rounded-[6px] p-2"
        required
      />
      <Button
        role={"button"}
        type="submit"
        label="Add"
        variant={"primary"}
        customClass={"px-[30px] flex items-center justify-center py-[8px]"}
      />
    </form>
  );
}

export default TranslationForm;

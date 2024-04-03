import React, { useState, useEffect } from "react";
import { AddTrans } from "../../hooks/useAddTrans";
import Button from "./../buttons/Button";

function TranslationEditor() {
  const { getTranslations, addTranslation } = AddTrans();
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleLoadData = async () => {
    setLoading(true);
    try {
      const fetchedTranslations = await getTranslations();
      console.log("Fetched translations:", fetchedTranslations); // Log fetched translations
      setTranslations(fetchedTranslations);
      setDataLoaded(true);
    } catch (error) {
      console.error("Error loading translations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoadData();
  }, []); // Load translations when the component mounts

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const updatedTranslations = {};
      for (const id in translations) {
        const { TransKey, TransValue } = translations[id] || {};
        updatedTranslations[id] = { TransKey, TransValue };
        await addTranslation(id, TransKey, TransValue);
      }
      setTranslations(updatedTranslations);
      console.log("Translations submitted successfully");
    } catch (error) {
      console.error("Error updating translations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container">
        <h2 className="font-semibold mb-4 text-center text-3xl">
          Translations Editor
        </h2>
        {!dataLoaded && (
          <button
            onClick={handleLoadData}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Load Translations
          </button>
        )}
        {loading && <div>Loading...</div>}
        <form onSubmit={handleSubmit}>
          {dataLoaded && (
            <>
              {Object.keys(translations).map((id) => (
                <div
                  key={id}
                  className="flex items-center justify-center mb-3 gap-6"
                >
                  <div className="flex gap-[5px] flex-col">
                    <span className="inline-block text-sm">Content Key</span>
                    <input
                      type="text"
                      className="border rounded py-1 px-2 w-full flex-1"
                      value={translations[id]?.TransKey || ""}
                      onChange={(e) =>
                        setTranslations((prevTranslations) => ({
                          ...prevTranslations,
                          [id]: {
                            ...prevTranslations[id],
                            TransKey: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="flex gap-[5px] flex-col">
                    <span className="inline-block text-sm">Content Value</span>
                    <input
                      type="text"
                      className="border rounded py-1 px-2 w-full flex-1"
                      value={translations[id]?.TransValue || ""}
                      onChange={(e) =>
                        setTranslations((prevTranslations) => ({
                          ...prevTranslations,
                          [id]: {
                            ...prevTranslations[id],
                            TransValue: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                </div>
              ))}
              <Button
                role={"button"}
                type={"submit"}
                variant={"outlinePrimary"}
                label={"Submit"}
                customClass={"px-12 py-2"}
              />
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default TranslationEditor;

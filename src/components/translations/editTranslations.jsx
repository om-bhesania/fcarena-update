import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { AddTrans } from "../../hooks/useAddTrans";
import Translation from "./translation";
import { debounce } from "lodash";

const TranslationEditor = () => {
  const { getTranslations, updateTranslation, deleteTranslation } = AddTrans();
  const [translations, setTranslations] = useState([]);
  const [editingTranslationId, setEditingTranslationId] = useState(null);
  const [editedValue, setEditedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filteredTranslations, setFilteredTranslations] = useState([]);
  const toast = useToast();
  const editRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const translationsData = await getTranslations();
        setTranslations(translationsData);
        setFilteredTranslations(translationsData);
      } catch (error) {
        console.error("Error fetching translations:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const debouncedSearch = debounce(() => {
      const filtered = translations.filter((translation) =>
        translation.key.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredTranslations(filtered);
    }, 300);

    debouncedSearch();

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchKey, translations]);

 

  const handleEdit = (id, value) => {
    setEditedValue(value);
    setEditingTranslationId(id);
  };

  const handleSave = async () => {
    if (!editedValue.trim()) {
      toast({
        title: "Error",
        description: "Value cannot be empty",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    await handleUpdate(editingTranslationId);
    setEditingTranslationId(null);
  };

  const handleUpdate = async (id) => {
    try {
      setLoading(true);
      await updateTranslation(id, editedValue);
      toast({
        title: "Translation updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Refresh translations after update
      const translationsData = await getTranslations();
      setTranslations(translationsData);
    } catch (error) {
      console.error("Error updating translation:", error);
      toast({
        title: "Error",
        description: "Failed to update translation",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteTranslation(id);
      toast({
        title: "Translation deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // Refresh translations after delete
      const translationsData = await getTranslations();
      setTranslations(translationsData);
    } catch (error) {
      console.error("Error deleting translation:", error);
      toast({
        title: "Error",
        description: "Failed to delete translation",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold mb-4">
          <Translation TransKey={"tab.Translations"} />
        </h2>
        {window.location.pathname === "/superadmin" ? null : (
          <>
            <a
              className="bg-transparent border border-primary text-primary rounded hover:bg-primary hover:text-white hover:border-secondary undefined p-3 ease-in-out duration-300 font-medium active:scale-[0.9] "
              href="/superadmin"
            >
              Add trasnlations <i className="fas fa-plus"></i>{" "}
            </a>
          </>
        )}
      </div>
      <div className="">
        <input
          type="text"
          placeholder="Search by key"
          className="border-2 border-primary p-2 rounded mb-4"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          {filteredTranslations.map((translation) => (
            <div
              key={translation.id}
              className="bg-white rounded-lg p-4 shadow-md"
            >
              <p className="text-lg mb-2">
                <sub>Content Key: </sub>{" "}
                <sub className=" font-semibold text-xl inline-block">
                  {translation.key}
                </sub>
              </p>
              {editingTranslationId === translation.id ? (
                <input
                  type="text"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                  className="text-lg border rounded p-2 w-full mb-2"
                  ref={editRef}
                  autoFocus
                />
              ) : (
                <p className="text-lg border rounded p-2 w-full mb-2">
                  {translation.value}
                </p>
              )}
              <div className="flex items-end justify-end">
                {editingTranslationId === translation.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="mr-2 bg-blue-900 text-white px-3 py-1 rounded"
                      disabled={loading}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingTranslationId(null);
                        setEditedValue(""); // Clear the edited value
                      }}
                      className="mr-2 bg-red-500 text-white px-3 py-1 rounded"
                      disabled={loading}
                    >
                      <div className="flex items-center justify-center gap-2">
                        cancel edit <i className="fas fa-times"></i>
                      </div>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      handleEdit(translation.id, translation.value)
                    }
                    className="mr-2 bg-blue-900 text-white px-3 py-1 rounded"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                )}
                <button
                  onClick={() => handleDelete(translation.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  disabled={loading}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        {filteredTranslations.length === 0 && (
          <div className="text-lg text-center my-4 text-red-600 font-bold">
            <Translation TransKey={"not_found"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationEditor;

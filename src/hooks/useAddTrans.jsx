import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export const AddTrans = () => {
  const addTranslation = async (key, value) => {
    try {
      await addDoc(collection(db, "translations"), {
        key,
        value,
        timestamp: serverTimestamp(),
      });
      console.log("Translation added successfully");
    } catch (error) {
      console.error("Error adding translation: ", error);
    }
  };

  const getTranslations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "translations"));
      const translations = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        translations.push({
          id: doc.id,
          key: data.key,
          value: data.value,
        });
      });
      return translations;
    } catch (error) {
      console.error("Error getting translations: ", error);
      return [];
    }
  };

  const updateTranslation = async (id, newValue) => {
    try {
      const translationRef = doc(db, "translations", id);
      await updateDoc(translationRef, {
        value: newValue,
      });
      console.log("Translation updated successfully");
    } catch (error) {
      console.error("Error updating translation: ", error);
      throw error;
    }
  };

  const deleteTranslation = async (id) => {
    try {
      const translationRef = doc(db, "translations", id);
      await deleteDoc(translationRef);
      console.log("Translation deleted successfully");
    } catch (error) {
      console.error("Error deleting translation: ", error);
      throw error;
    }
  };

  return {
    getTranslations,
    addTranslation,
    updateTranslation,
    deleteTranslation,
  };
};

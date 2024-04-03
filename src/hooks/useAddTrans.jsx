    import {
    addDoc,
    collection,
    getDocs,
    serverTimestamp,
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
         const translations = {};
         querySnapshot.forEach((doc) => {
           const data = doc.data();
           translations[doc.id] = {
             TransKey: data.key,
             TransValue: data.value,
           };
         });
         return translations;
       } catch (error) {
         console.error("Error getting translations: ", error);
         return {};
       }
     };

      // Function to load translations dynamically
      const loadTranslations = async () => {
        try {
          const translations = await getTranslations();
          return translations;
        } catch (error) {
          console.error("Error loading translations: ", error);
          return {};
        }
      };

      return { getTranslations, addTranslation, loadTranslations };
    };

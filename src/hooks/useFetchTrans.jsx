import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

const   useTranslation   = (key) => {
  const [translation, setTranslation] = useState("");

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const q = query(
          collection(db, "translations"),
          where("key", "===", key)
        );
        const querySnapshot = await getDocs(q);
        console.log(
          "Query Snapshot:",
          querySnapshot.docs.map((doc) => doc.data())
        );
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setTranslation(doc.data().value);
          });
        } else {
          console.log(`Translation not found for key: ${key}`);
          // You can set a default value or handle the missing translation as per your requirement
        }
      } catch (error) {
        console.error("Error fetching translation:", error);
        // Handle error
      }
    };

    fetchTranslation();

    // Cleanup function
    return () => {
      // Cleanup code if necessary
    };
  }, [key]);

  return translation;
};

export default useTranslation;

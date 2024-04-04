import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Assuming you have initialized Firebase

const Translation = ({ TransKey }) => {
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const q = query(
          collection(db, "translations"),
          where("key", "==", TransKey) // Adjusted to query for "key" field
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setTranslation(doc.data().value);
          });
        } else {
          setTranslation(null); // Reset translation if the document doesn't exist
        }
      } catch (error) {
        console.error("Error fetching translation:", error);
        setTranslation(null); // Reset translation on error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchTranslation();
  }, [TransKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!translation) {
    return <div>{TransKey}</div>;
  }

  return <>{translation}</>;
};

export default Translation;

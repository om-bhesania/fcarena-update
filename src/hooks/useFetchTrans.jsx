import {useState, useEffect} from 'react';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../firebase/firebase';

const useGetTranslations = () => {
  const [loading, setLoading] = useState (true);
  const [translations, setTranslations] = useState ({});
  const [error, setError] = useState (null);

  useEffect (
    () => {
      const fetchTranslations = async () => {
        setLoading (true);
        setError (null);

        try {
          const translationsCollectionRef = collection (db, 'translations');
          const translationsSnapshot = await getDocs (
            translationsCollectionRef
          );

          // Create an empty object to store key-value pairs
          let translationsData = {};

          // Loop through each document in the collection
          translationsSnapshot.forEach (doc => {
            // Get the document data
            const data = doc.data ();
            // Loop through each key in the document data
            Object.keys (data).forEach (key => {
              // Assign each key-value pair to the translationsData object
              translationsData[key] = data[key];
            });
          });

          // Set the translations state with the key-value pairs
          setTranslations (translationsData);
          setLoading (false);
        } catch (error) {
          setError (error);
          setLoading (false);
        }
      };

      fetchTranslations ();
    },
    []
  );

  return {loading, translations, error};
};

export default useGetTranslations;

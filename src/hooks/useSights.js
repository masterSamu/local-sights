import { useEffect, useState } from "react";
import { getFirstSights, getNextSights } from "../services/sights";
import { uuidv4 } from "@firebase/util";

/**
 * Fetch sights from database
 * @returns {{
 * data: [object],
 * error: object | null,
 * isLoading: boolean,
 * allLoaded: boolean,
 * loadMore: () => void,
 *  }}
 */
const useSights = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [lastValue, setLastValue] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const maxCountOfSightsPerFetch = 3;

  useEffect(() => {
    let fetched = false;
    if (!fetched) {
      setLoading(true);
      getFirstSights(maxCountOfSightsPerFetch)
        .then((documentSnapshots) => {
          const newSights = [];
          documentSnapshots.forEach((doc) => {
            newSights.push({ ...doc.data(), id: doc.id });
          });
          setData(newSights);
          if (newSights.length === maxCountOfSightsPerFetch) {
            setLastValue(
              documentSnapshots.docs[documentSnapshots.docs.length - 1]
            );
            setAllLoaded(false);
          } else {
            setLastValue(null);
            setAllLoaded(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setError({
            id: uuidv4(),
            type: "error",
            content: error.code,
          });
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
          setError(null);
          fetched = true;
        });
    }
  }, []);

  const loadMore = async () => {
    setLoading(true);
    try {
      const documentSnapshots = await getNextSights(
        maxCountOfSightsPerFetch,
        lastValue
      );

      const newSights = [];
      documentSnapshots.forEach((doc) => {
        newSights.push({ ...doc.data(), id: doc.id });
      });
      setData([...data, ...newSights]);
      if (newSights.length === maxCountOfSightsPerFetch) {
        setLastValue(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
        setAllLoaded(false);
      } else {
        setLastValue(null);
        setAllLoaded(true);
      }
      setError(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError({
        id: uuidv4(),
        type: "error",
        content: error.code,
      });
    }
  };

  return { data, error, isLoading, loadMore, allLoaded };
};

export default useSights;

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNotification } from "../reducers/notificationReducer";
import { setSights } from "../reducers/sightReducer";
import {
  getFirstSights,
  getNextSights,
  getFirstSightsByNegativeLikes,
  getNextSightsByNegativeLikes,
  getFirstSightsByTotalLikes,
  getNextSightsByTotalLikes,
} from "../services/sights";

const useSights = () => {
  const dispatch = useDispatch();
  const sights = useSelector((state) => state.sights);
  const sightState = useSelector((state) => state.sightState);
  const [lastDoc, setLastDoc] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const maxCountPerFetch = 3;

  const loadFirstByPositiveLikes = useCallback(() => {
    getFirstSights(maxCountPerFetch)
      .then((response) => {
        dispatch(setSights(response.sights));

        if (response.sights.length === maxCountPerFetch) {
          setLastDoc(response.lastDoc);
          setAllLoaded(false);
        } else {
          setLastDoc(null);
          setAllLoaded(true);
        }
      })
      .catch((error) => {
        dispatch(
          createNotification({
            id: `loadSights-error-${Date.now().toString()}`,
            type: "error",
            message: error.message,
          })
        );
      });
  }, [dispatch]);

  /** Load next set of sights ordered by positive likes */
  const loadMoreByPositiveLikes = () => {
    if (lastDoc) {
      getNextSights(maxCountPerFetch, lastDoc)
        .then((response) => {
          dispatch(setSights([...sights, ...response.sights]));
          if (response.sights.length === maxCountPerFetch) {
            setLastDoc(response.lastDoc);
            setAllLoaded(false);
          } else {
            setLastDoc(null);
            setAllLoaded(true);
          }
        })
        .catch((error) => {
          dispatch(
            createNotification({
              id: `loadSights-error-${Date.now().toString()}`,
              type: "error",
              message: error.message,
            })
          );
        });
    }
  };

  /** Load first set of sights ordered by negative likes */
  const loadFirstByNegativeLikes = useCallback(() => {
    getFirstSightsByNegativeLikes(maxCountPerFetch)
      .then((response) => {
        dispatch(setSights(response.sights));
        if (response.sights.length === maxCountPerFetch) {
          setLastDoc(response.lastDoc);
          setAllLoaded(false);
        } else {
          setLastDoc(null);
          setAllLoaded(true);
        }
      })
      .catch((error) => {
        dispatch(
          createNotification({
            id: `loadSights-error-${Date.now().toString()}`,
            type: "error",
            message: error.message,
          })
        );
      });
  }, [dispatch]);

  /** Load next set of sights ordered by negative likes */
  const loadMoreByNegativeLikes = () => {
    if (lastDoc) {
      getNextSightsByNegativeLikes(maxCountPerFetch, lastDoc)
        .then((response) => {
          dispatch(setSights([...sights, ...response.sights]));
          if (response.sights.length === maxCountPerFetch) {
            setLastDoc(response.lastDoc);
            setAllLoaded(false);
          } else {
            setLastDoc(null);
            setAllLoaded(true);
          }
        })
        .catch((error) => {
          dispatch(
            createNotification({
              id: `loadSights-error-${Date.now().toString()}`,
              type: "error",
              message: error.message,
            })
          );
        });
    }
  };

  /** Load first set of sights ordered by total likes */
  const loadFirstByTotalLikes = useCallback(() => {
    getFirstSightsByTotalLikes(maxCountPerFetch)
      .then((response) => {
        dispatch(setSights(response.sights));
        if (response.sights.length === maxCountPerFetch) {
          setLastDoc(response.lastDoc);
          setAllLoaded(false);
        } else {
          setLastDoc(null);
          setAllLoaded(true);
        }
      })
      .catch((error) => {
        dispatch(
          createNotification({
            id: `loadSights-error-${Date.now().toString()}`,
            type: "error",
            message: error.message,
          })
        );
      });
  }, [dispatch]);

  /** Load next set of sights ordered by total likes */
  const loadMoreByTotalLikes = () => {
    if (lastDoc) {
      getNextSightsByTotalLikes(maxCountPerFetch, lastDoc)
        .then((response) => {
          dispatch(setSights([...sights, ...response.sights]));
          if (response.sights.length === maxCountPerFetch) {
            setLastDoc(response.lastDoc);
            setAllLoaded(false);
          } else {
            setLastDoc(null);
            setAllLoaded(true);
          }
        })
        .catch((error) => {
          dispatch(
            createNotification({
              id: `loadSights-error-${Date.now().toString()}`,
              type: "error",
              message: error.message,
            })
          );
        });
    }
  };

  useEffect(() => {
    let fetched = false;
    if (!fetched) {
      switch (sightState) {
        case "":
          return loadFirstByPositiveLikes();
        case "byPositiveLikes":
          return loadFirstByPositiveLikes();
        case "byNegativeLikes":
          return loadFirstByNegativeLikes();
        case "byTotalLikes":
          return loadFirstByTotalLikes();
        default:
          return loadFirstByPositiveLikes();
      }
    }
    fetched = true;
  }, [
    sightState,
    loadFirstByPositiveLikes,
    loadFirstByNegativeLikes,
    loadFirstByTotalLikes,
  ]);

  /** Call correct loadMore function based on sightState value  */
  const getLoadMoreFunction = () => {
    switch (sightState) {
      case "byPositiveLikes":
        return loadMoreByPositiveLikes();
      case "byNegativeLikes":
        return loadMoreByNegativeLikes();
      case "byTotalLikes":
        return loadMoreByTotalLikes();
      case "byNewest":
        return;
      default:
        return loadMoreByPositiveLikes();
    }
  };

  return {
    sights,
    allLoaded,
    getLoadMoreFunction,
  };
};

export default useSights;

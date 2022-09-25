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
  getFirstSightsByRecent,
  getNextSightsByRecent,
  getSightsUploadedByUser,
  getFirstSightsUploadedByUser,
  getNextSightsUploadedByUser,
} from "../services/sights";

const useSights = () => {
  const dispatch = useDispatch();
  const sights = useSelector((state) => state.sights);
  const sightState = useSelector((state) => state.sightState);
  const [lastDoc, setLastDoc] = useState(null);
  const [allLoaded, setAllLoaded] = useState(false);
  const maxCountPerFetch = 3;

  const handleResponseForFirst = useCallback(
    (response) => {
      dispatch(setSights(response.sights));
      if (response.sights.length === maxCountPerFetch) {
        setLastDoc(response.lastDoc);
        setAllLoaded(false);
      } else {
        setLastDoc(null);
        setAllLoaded(true);
      }
    },
    [dispatch]
  );

  const handleResponseForNext = (response) => {
    dispatch(setSights([...sights, ...response.sights]));
    if (response.sights.length === maxCountPerFetch) {
      setLastDoc(response.lastDoc);
      setAllLoaded(false);
    } else {
      setLastDoc(null);
      setAllLoaded(true);
    }
  };

  const handleError = useCallback(
    (error) => {
      dispatch(
        createNotification({
          id: `loadSights-error-${Date.now().toString()}`,
          type: "error",
          message: error.message,
        })
      );
    },
    [dispatch]
  );

  const loadFirstByPositiveLikes = useCallback(() => {
    getFirstSights(maxCountPerFetch)
      .then((response) => {
        handleResponseForFirst(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [handleError, handleResponseForFirst]);

  /** Load next set of sights ordered by positive likes */
  const loadMoreByPositiveLikes = () => {
    if (lastDoc) {
      getNextSights(maxCountPerFetch, lastDoc)
        .then((response) => {
          handleResponseForNext(response);
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };

  /** Load first set of sights ordered by negative likes */
  const loadFirstByNegativeLikes = useCallback(() => {
    getFirstSightsByNegativeLikes(maxCountPerFetch)
      .then((response) => {
        handleResponseForFirst(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [handleError, handleResponseForFirst]);

  /** Load next set of sights ordered by negative likes */
  const loadMoreByNegativeLikes = () => {
    if (lastDoc) {
      getNextSightsByNegativeLikes(maxCountPerFetch, lastDoc)
        .then((response) => {
          handleResponseForNext(response);
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };

  /** Load first set of sights ordered by total likes */
  const loadFirstByTotalLikes = useCallback(() => {
    getFirstSightsByTotalLikes(maxCountPerFetch)
      .then((response) => {
        handleResponseForFirst(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [handleError, handleResponseForFirst]);

  /** Load next set of sights ordered by total likes */
  const loadMoreByTotalLikes = () => {
    if (lastDoc) {
      getNextSightsByTotalLikes(maxCountPerFetch, lastDoc)
        .then((response) => {
          handleResponseForNext(response);
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };

  /**Load first set of sights ordered by newest */
  const loadFirstByRecent = useCallback(() => {
    getFirstSightsByRecent(maxCountPerFetch)
      .then((response) => {
        handleResponseForFirst(response);
      })
      .catch((error) => {
        handleError(error);
      });
  }, [handleError, handleResponseForFirst]);

  /** Load next set of sights ordered by newest */
  const loadMoreByRecent = () => {
    if (lastDoc) {
      getNextSightsByRecent(maxCountPerFetch, lastDoc)
        .then((response) => {
          handleResponseForNext(response);
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };

  /** Load first set of sights uploaded by user */
  const loadSightsUploadedByUser = (username) => {
    getFirstSightsUploadedByUser(username)
      .then((response) => {
        handleResponseForFirst(response);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  /** Load next set of uploaded by user */
  const loadMoreUploadedByUser = (username) => {
    if (lastDoc) {
      getNextSightsUploadedByUser(username, maxCountPerFetch, lastDoc)
        .then((response) => {
          handleResponseForNext(response);
        })
        .catch((error) => {
          handleError(error);
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
        case "byNewest":
          return loadFirstByRecent();
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
    loadFirstByRecent,
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
        return loadMoreByRecent();
      default:
        return loadMoreByPositiveLikes();
    }
  };

  return {
    sights,
    allLoaded,
    getLoadMoreFunction,
    loadSightsUploadedByUser,
    loadMoreUploadedByUser
  };
};

export default useSights;

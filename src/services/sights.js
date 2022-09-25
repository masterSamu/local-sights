import db from "../firebase-config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  orderBy,
  query,
  where,
  limit,
  startAfter,
} from "firebase/firestore";

const sightsRef = collection(db, "sights");

/**
 * Read all sights from database and order by descending positive likes,
 * results are limited to 50 items.
 * @returns {Array} Sight objects
 */
export const getAll = async () => {
  const q = query(sightsRef, orderBy("likes.positive", "desc"), limit(50));
  const querySnapshot = await getDocs(q);
  const data = [];
  querySnapshot.forEach((doc) => {
    const object = doc.data();
    object.id = doc.id;
    data.push(object);
  });
  return data;
};

/**
 * Get first set of documents from database. Use getNextSights() function
 * to load more items.
 * @param {number} maxCountOfSightsPerFetch Maximum count of items loaded
 * @returns {{sights: [], lastDoc: object}} querySnapshot of firestore data
 */
export const getFirstSights = async (maxCountOfSightsPerFetch) => {
  const first = query(
    sightsRef,
    orderBy("likes.positive", "desc"),
    limit(maxCountOfSightsPerFetch)
  );
  const documentSnapshots = await getDocs(first);
  const sights = [];
  documentSnapshots.forEach((doc) => {
    sights.push({ ...doc.data(), id: doc.id });
  });
  const lastDoc = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  return { sights, lastDoc };
};

/**
 * Get next set of documents from database.
 * Requires that you have first set loaded.
 * @param {number} maxCountOfSightsPerFetch Maximum count of items loaded
 * @param {object} lastDocFromPreviousLoad last firebase document of previously loaded set
 * @returns {{sights: [], lastDoc: object}} querySnapshot of firestore data
 */
export const getNextSights = async (
  maxCountOfSightsPerFetch,
  lastDocFromPreviousLoad
) => {
  const next = query(
    sightsRef,
    orderBy("likes.positive", "desc"),
    startAfter(lastDocFromPreviousLoad),
    limit(maxCountOfSightsPerFetch)
  );
  const querySnapshot = await getDocs(next);
  const sights = [];
  querySnapshot.forEach((doc) => {
    sights.push({ ...doc.data(), id: doc.id });
  });
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { sights, lastDoc };
};

/**
 * Get all sights uploaded by username
 * @param {string} username
 * @returns {[{name, id}]} sights uploaded by username
 */
export const getSightsUploadedByUser = async (username) => {
  try {
    const q = query(
      sightsRef,
      where("user.username", "==", username),
      orderBy("likes.positive", "desc")
    );
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      const object = doc.data();
      object.id = doc.id;
      data.push(object);
    });
    return data;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};

export const addSight = async (sight) => {
  try {
    const docRef = await addDoc(collection(db, "sights"), sight);
    if (docRef.id) {
      return docRef.id;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

/** Can be used for add or update */
export const updateUsersInLikedUsers = async (docId, likedUserObject) => {
  try {
    const docRef = doc(db, "sights", docId);
    await updateDoc(docRef, {
      "likes.likedUsers": arrayUnion(likedUserObject),
    });
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const removeUserFromLikedUsers = async (docId, likedUserObject) => {
  try {
    const docRef = doc(db, "sights", docId);
    await updateDoc(docRef, {
      "likes.likedUsers": arrayRemove(likedUserObject),
    });
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

/**
 * Add bookmark to user for specific sight
 * @param {string} userId
 * @param {Object} sight required fields: id, name, imageUrl
 * @returns {boolean} True if added succesfully, and false if error
 */
export const addBookmark = async (userId, sight) => {
  try {
    const bookmarkObject = {
      sightId: sight.id,
      imageUrl: sight.imageUrl,
      name: sight.name,
    };
    const docRef = doc(db, "users", userId);
    const updatedObject = await updateDoc(docRef, {
      bookmarks: arrayUnion(bookmarkObject),
    }).then(() => {
      return bookmarkObject;
    });
    return updatedObject;
  } catch (error) {
    return false;
  }
};

export const removeBookmark = async (userId, sight) => {
  try {
    const bookmarkObject = {
      sightId: sight.id,
      imageUrl: sight.imageUrl,
      name: sight.name,
    };
    const docRef = doc(db, "users", userId);
    const isUpdated = await updateDoc(docRef, {
      bookmarks: arrayRemove(bookmarkObject),
    }).then(() => {
      return true;
    });
    return isUpdated;
  } catch (error) {
    return false;
  }
};

/**
 * First set of sights ordered by negative likes
 * @returns
 */
export const getFirstSightsByNegativeLikes = async (
  maxCountOfSightsPerFetch
) => {
  const q = query(
    sightsRef,
    orderBy("likes.negative", "desc"),
    limit(maxCountOfSightsPerFetch)
  );
  const querySnapshot = await getDocs(q);
  const sights = [];
  querySnapshot.forEach((doc) => {
    sights.push({ ...doc.data(), id: doc.id });
  });
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { sights, lastDoc };
};

export const getNextSightsByNegativeLikes = async (
  maxCountOfSightsPerFetch,
  lastDocFromPreviousLoad
) => {
  const next = query(
    sightsRef,
    orderBy("likes.negative", "desc"),
    startAfter(lastDocFromPreviousLoad),
    limit(maxCountOfSightsPerFetch)
  );
  const querySnapshot = await getDocs(next);
  const sights = [];
  querySnapshot.forEach((doc) => {
    sights.push({ ...doc.data(), id: doc.id });
  });
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { sights, lastDoc };
};


/**
 * First set of sights ordered by negative likes
 * @returns
 */
 export const getFirstSightsByTotalLikes = async (
  maxCountOfSightsPerFetch
) => {
  const q = query(
    sightsRef,
    orderBy("likes.total", "desc"),
    limit(maxCountOfSightsPerFetch)
  );
  const querySnapshot = await getDocs(q);
  const sights = [];
  querySnapshot.forEach((doc) => {
    sights.push({ ...doc.data(), id: doc.id });
  });
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { sights, lastDoc };
};

export const getNextSightsByTotalLikes = async (
  maxCountOfSightsPerFetch,
  lastDocFromPreviousLoad
) => {
  const next = query(
    sightsRef,
    orderBy("likes.total", "desc"),
    startAfter(lastDocFromPreviousLoad),
    limit(maxCountOfSightsPerFetch)
  );
  const querySnapshot = await getDocs(next);
  const sights = [];
  querySnapshot.forEach((doc) => {
    sights.push({ ...doc.data(), id: doc.id });
  });
  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { sights, lastDoc };
};



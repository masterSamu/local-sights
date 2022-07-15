import db from "../firebase-config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
  query,
  where,
} from "firebase/firestore";

const sightsRef = collection(db, "sights");

const getAll = async () => {
  const querySnapshot = await getDocs(sightsRef);
  const data = [];
  querySnapshot.forEach((doc) => {
    const object = doc.data();
    object.id = doc.id;
    data.push(object);
  });
  return data;
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
  console.log("func: ", likedUserObject);
  try {
    const docRef = doc(db, "sights", docId);
    await updateDoc(docRef, {
      "likes.likedUsers": arrayUnion(likedUserObject),
    });
    return true;
  } catch (error) {
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
    return false;
  }
};

/**
 * Search bookmark for specified sight and user.
 * Can be used to check if user has bookmarked sight or not.
 * @param {string} userId id of logged user
 * @param {string} sightId id of sight
 * @returns {Object | null | string} Return bookmark object if found,
 * null if not fount or error message as string
 */
export const getBookmarks = async (userId, sightId) => {
  let bookmarks = null;
  try {
    const q = query(
      collection(db, "users", userId, "bookmarks"),
      where("sightId", "==", sightId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().sightId === sightId) {
        bookmarks = doc.data();
      }
    });
    return bookmarks;
  } catch (error) {
    bookmarks = error.message;
    console.log(error.message);
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
    const docRef = await addDoc(
      collection(db, "users", userId, "bookmarks"),
      bookmarkObject
    );
    if (docRef.id) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const removeBookmark = async (userId) => {
  
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };

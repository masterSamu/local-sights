import db from "../firebase-config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  addDoc,
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
    console.log("updated", updatedObject)
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
    await updateDoc(docRef, {
      bookmarks: arrayRemove(bookmarkObject),
    }).then(() =>{
      console.log("deleted bookmark")
    })
  } catch (error) {
    return false;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };

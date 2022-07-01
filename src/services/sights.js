import db from "../firebase-config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
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

export const updatePositiveLike = async (docId, likes) => {
  const docRef = doc(db, "sights", docId);
  await updateDoc(docRef, {
    "likes.positive": likes,
  });
};

export const updateNegativeLike = async (docId, negativeLikes) => {
  const docRef = doc(db, "sights", docId);
  await updateDoc(docRef, {
    "likes.negative": negativeLikes,
  });
};

export const removePositiveLike = async (docId, positiveLikes) => {
  if (positiveLikes < 1) return false;
  try {
    const docRef = doc(db, "sights", docId);
    await updateDoc(docRef, {
      "likes.positive": positiveLikes,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const removeNegativeLike = async (docId, likes) => {
  if (likes < 1) return false;
  try {
    const docRef = doc(db, "sights", docId);
    await updateDoc(docRef, {
      "likes.negative": likes,
    });
    return true;
  } catch (error) {
    return false;
  }
};

/** Can be used for add or update */
export const updateUsersInLikedUsers = async (docId, likedUserObject) => {
  console.log("func: ", likedUserObject)
  try {
    const docRef = doc(db, "sights", docId);
    await updateDoc(docRef, {
      "likes.likedUsers": arrayUnion(likedUserObject),
    });
    return true;
  } catch (error) {
    console.log(error.message)
    return false;
  }
};

export const removeUserFromLikedUsers = async (docId, likedUserObject) => {
  try {
    const docRef = doc(db, "sights", docId);
    await updateDoc(docRef, {
      "likes.likedUsers": arrayRemove(likedUserObject),
    })
    return true;
  } catch (error) {
    return false;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };

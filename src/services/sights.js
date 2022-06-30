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

export const addLike = async (docId, userId, likes) => {
  const docRef = doc(db, "sights", docId);
  await updateDoc(docRef, {
    "likes.positive": likes + 1,
    "likes.likedUsers": arrayUnion({ userId, type: "positive" }),
  });
};

export const addDislike = async (docId, userId, likes) => {
  const docRef = doc(db, "sights", docId);
  await updateDoc(docRef, {
    "likes.negative": likes + 1,
    "likes.likedUsers": arrayUnion({ userId, type: "negative" }),
  });
};

export const removeLike = async (docId, userId, likes) => {
  if (likes < 1) return false;
  try {
    const docRef = doc(db, "sights", docId);
    await updateDoc(docRef, {
      "likes.positive": likes - 1,
      "likes.likedUsers": arrayRemove({ userId, type: "positive" }),
    });
    return true;

  } catch(error) {
    return false;
  }
};

export const removeDislike = async (docId, userId, likes) => {
  if (likes < 1) return false;
  try {
    const docRef = doc(db, "sights", docId);
    await updateDoc(docRef, {
      "likes.negative": likes - 1,
      "likes.likedUsers": arrayRemove({ userId, type: "negative" }),
    });
    return true;
  } catch(error) {
    return false;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };

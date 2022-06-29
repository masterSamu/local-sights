import db from "../firebase-config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment
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

export const addLike = async (docId, userId) => {
  const docRef = doc(db, "sights", docId);
  await updateDoc(docRef,{
    "likes.positive": increment(1),
    "likes.likedUsers": arrayUnion({userId}),
  });
};

export const addDislike = async (docId, userId) => {
  const docRef = doc(db, "sights", docId);
  await updateDoc(docRef,{
    "likes.negative": increment(1),
    "likes.likedUsers": arrayUnion({userId}),
  });
};

export const removeLike = async (docId, userId, likes) => {
  const docRef = doc(db, "sights", docId);
  await updateDoc(docRef,{
    "likes.positive": likes -1,
    "likes.likedUsers": arrayRemove({userId}),
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };

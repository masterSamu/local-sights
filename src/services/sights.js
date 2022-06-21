import db from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };

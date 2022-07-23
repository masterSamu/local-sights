import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const querySnapshot = await getDocs(collection(db, "sights"));
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  const likedUsers = doc.data().likes.likedUsers;
  let positive,
    negative = 0;
  likedUsers.forEach((user) => {
    switch (user.type) {
      case "positive":
        positive += 1;
        break;
      case "negative":
        negative += 1;
        break;
      default:
        break;
    }
  });
  updateLikeCount({ positive, negative }, doc.id);
});

const updateLikeCount = async (likes, docId) => {
  const docRef = doc(db, "sights", docId);
  await updateDoc(docRef, {
    "likes.positive": likes.positive,
    "likes.negative": likes.negative,
  });
};

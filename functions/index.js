const functions = require("firebase-functions");

/**
 * Count likes for sight when sight is updated, and update 
 * likes.positive and .negative values on database
 */
exports.updateLikeCount = functions.firestore
  .document("sights/{docId}")
  .onUpdate((change, context) => {
    const data = change.after.data().likes;
    const previousData = change.before.data().likes;
    if (data.likedUsers.length !== previousData.likedUsers.length) {
      let positive = 0;
      let negative = 0;
      data.likedUsers.forEach((user) => {
        switch (user.type) {
          case "positive":
            positive = positive + 1;
            break;
          case "negative":
            negative = negative + 1;
            break;
          default:
            break;
        }
      });
      return change.after.ref.set(
        { likes: { ...data.likes, positive, negative } },
        { merge: true }
      );
    } else {
      return null;
    }
  });

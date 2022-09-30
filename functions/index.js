const functions = require("firebase-functions");

/**
 * Count likes for sight when sight is updated, and update
 * likes.positive and .negative values on database
 * Add total like count to document
 */
exports.updateLikeCount = functions
  .runWith({
    allowInvalidAppCheckToken: false,
  })
  .firestore.document("sights/{docId}")
  .onUpdate((change, context) => {
    // App check
    if (process.env.FUNCTIONS_EMULATOR === false) {
      if (context.app === undefined) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "The function must be called from an App Check verified app."
        );
      }
    }

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

      const total = positive + negative;

      // Update data in firestore database
      return change.after.ref.set(
        { likes: { ...data.likes, positive, negative, total } },
        { merge: true }
      );
    } else {
      return null;
    }
  });

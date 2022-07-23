const functions = require("firebase-functions");

exports.scheduledFunctionCrontab = functions.pubsub
  .schedule("0 6 * * *")
  .timeZone("Europe/Helsinki")
  .onRun((context) => {
    return null;
  });

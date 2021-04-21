const functions = require("firebase-functions");

const addUser = require("./addUser");
// const addMessage = require("./addMessage");

const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

/*
const app = require("./express-server/app");
*/

exports.addUser = functions.auth.user().onCreate((user) => {
  const addUserResponse = addUser.handler(db, user);
  console.log(">> addUserResponse", addUserResponse);
  return addUserResponse;
});

// exports.addMessage = addMessage;

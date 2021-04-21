const {nanoid} = require("nanoid");

exports.handler = (db, user) => {
  const uid = user.uid;
  console.log(`uid: ${uid}`);
  console.log("registered user: ", user);
  console.log("registered user.toJSON(): ", user.toJSON());

  const batch = db.batch();

  const userRef = db.collection("users");
  const referralRef = db.collection("referral");

  const email = user.email; // The email of the user.
  const displayName = user.displayName ? user.displayName : "";
  const firstName = displayName.split(" ")[0] ? displayName.split(" ")[0] : "";
  const lastName = displayName.split(" ")[1] ? displayName.split(" ")[1] : "";
  const phoneNumber = user.phoneNumber ? user.phoneNumber : "";
  const photoURL = user.photoURL ? user.photoURL : "";
  const referrer = user.referrer || "";

  // TODO: check if referralID exists or not
  const referralID = `cat-${nanoid(5)}`;

  const userProfile = {
    email,
    displayName,
    firstName,
    lastName,
    phoneNumber,
    photoURL,
    referrer,
    referralID,
  };
  console.log("userProfile", userProfile);

  const referralInfo = {
    referrer,
    referralID,
    uid,
  };
  console.log("referralInfo", referralInfo);

  const userDocRef = userRef.doc(uid);
  console.log("userDocRef", userDocRef);
  const referralDocRef = referralRef.doc(uid);
  console.log("referralDocRef", referralDocRef);

  batch.set(userDocRef, userProfile);
  batch.set(referralDocRef, referralInfo);

  batch
      .commit()
      .then((batchCommitted) => {
        console.log("batchCommitted", batchCommitted);
        return batchCommitted;
      })
      .catch((error) => {
        console.log("error", error);
        return error;
      });

  return 0;
};

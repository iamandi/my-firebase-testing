import { auth, firestore } from "./firebaseIndex";
const { nanoid } = require("nanoid");

export const authMethods = {
  // firebase helper methods go here...
  signup: (email, password, setErrors, setToken, referrer) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      //make res asynchonous so that we can make grab the token before saving it.
      .then(async (res) => {
        console.log("res.user", res.user);
        console.log("------> res.user.uid", res.user.uid);

        const { uid } = res.user;

        const token = await Object.entries(res.user)[5][1].b;
        //set token to localStorage
        await localStorage.setItem("token", token);
        setToken(token);
        //grab token from local storage and set to state.
        console.log(">>>>>>", res);

        const referralRef = firestore().collection("test").doc(uid);
        console.log(">>>>>> referralRef", referralRef);

        const referralID = `cat-${nanoid(5)}`;

        await referralRef.set({
          referralID,
          referrer,
          uid,
        });
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
      });
  },
  signin: (email, password, setErrors, setToken) => {
    //change from create users to...
    auth()
      .signInWithEmailAndPassword(email, password)
      //everything is almost exactly the same as the function above
      .then(async (res) => {
        const token = await Object.entries(res.user)[5][1].b;
        //set token to localStorage
        await localStorage.setItem("token", token);

        setToken(window.localStorage.token);
      })
      .catch((err) => {
        setErrors((prev) => [...prev, err.message]);
      });
  },
  //no need for email and password
  signout: (setErrors, setToken) => {
    // signOut is a no argument function
    auth()
      .signOut()
      .then((res) => {
        //remove the token
        localStorage.removeItem("token");
        //set the token back to original state
        setToken(null);
      })
      .catch((err) => {
        //there shouldn't every be an error from firebase but just in case
        setErrors((prev) => [...prev, err.message]);
        //whether firebase does the trick or not i want my user to do there thing.
        localStorage.removeItem("token");
        setToken(null);
        console.error(err.message);
      });
  },
};

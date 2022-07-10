import {
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { query, where, getDocs, collection, limit } from "firebase/firestore";
import { db } from "../firebase-config";

const auth = getAuth();

const login = async (email, password) => {
  try {
    const signIn = await signInWithEmailAndPassword(auth, email, password);
    if (signIn.user) {
      const user = extractUserProperties(signIn.user);
      return user;
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
};

const logOut = async () => {
  signOut(auth)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error.message);
      return false;
    });
};

/** Extract custom user object from firebase user object
 *
 * @typedef {object} user
 */
export const extractUserProperties = (userObject) => {
  if (userObject) {
    return {
      email: userObject.email,
      username: userObject.displayName,
      id: userObject.uid,
    };
  } else {
    return null;
  }
};

export const createUser = async (email, password, username) => {
  try {
    const create = await createUserWithEmailAndPassword(auth, email, password);
    if (create) {
      // Set username to profile
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      return extractUserProperties(auth.currentUser);
    }
  } catch (error) {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      return { error: `${email} already has registered account.` };
    }
  }
};

export const sendVerificationEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const checkUsernameAvailability = async (username) => {
  try {
    let isAvailable = true;
    const docRef = collection(db, "users");
    const q = query(docRef, where("username", "==", username), limit(1));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.exists() && doc.data().username === username) {
        isAvailable = false;
      } else {
        isAvailable = true;
      }
    });
    return isAvailable;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, logOut };

import {
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, query, where, getDocs, collection, limit } from "firebase/firestore";
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
      const profile = await updateProfile(auth.currentUser, {
        displayName: username,
      });
      console.log("profile", profile);
      if (profile) {
        return extractUserProperties(create.user);
      }
    }
  } catch (error) {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      return { error: `${email} already has registered account.` };
    }
  }
  return null;
};

export const sendVerificationEmail = () => {
  sendEmailVerification(auth.currentUser).then(() => {
    return true;
  });
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

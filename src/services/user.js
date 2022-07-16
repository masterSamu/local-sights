import {
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {
  query,
  where,
  getDocs,
  collection,
  limit,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

const auth = getAuth();

const login = async (email, password) => {
  try {
    const signIn = await signInWithEmailAndPassword(auth, email, password);
    if (signIn.user) {
      const userInfo = await getUserInfo(signIn.user.uid);
      let bookmarks = [];
      if (userInfo) {
        bookmarks = userInfo.bookmarks;
      }
      const user = extractUserProperties(signIn.user, bookmarks);
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
export const extractUserProperties = (userObject, bookmarks) => {
  if (userObject) {
    return {
      email: userObject.email,
      username: userObject.displayName,
      id: userObject.uid,
      bookmarks,
    };
  } else {
    return null;
  }
};

export const createUser = async (email, password, username) => {
  try {
    const create = await createUserWithEmailAndPassword(auth, email, password);
    console.log("create", create);
    if (create) {
      // Set username to profile
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      // Create document to users collection
      const userInfo = {
        subscription: "free",
        username: username,
        bookmarks: [],
      };
      await setDoc(doc(db, "users", create.user.uid), userInfo);
      return extractUserProperties(auth.currentUser, userInfo.bookmarks);
    }
  } catch (error) {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      return { error: `${email} already has registered account.` };
    } else {
      return { error: error.message };
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

export const getUserInfo = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      return docSnap.data();
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, logOut };

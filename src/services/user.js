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

export const login = async (email, password) => {
  const signIn = await signInWithEmailAndPassword(auth, email, password);
  if (signIn.user) {
    const userInfo = await getUserInfo(signIn.user.uid);
    const user = extractUserProperties(signIn.user, userInfo);
    return user;
  }
  return null;
};

export const logOut = async () => {
  await signOut(auth);
};

/** Extract custom user object from firebase user object
 *  @param {Object} userObject firebase user object
 *  @param {Object} userInfo user document from database
 *  @returns {Object | null} user object that contains only necessary information for app
 */
export const extractUserProperties = (userObject, userInfo) => {
  if (userObject) {
    return {
      email: userObject.email,
      username: userObject.displayName,
      id: userObject.uid,
      subscription: userInfo.subscription,
      bookmarks: userInfo.bookmarks,
      verified: userObject.emailVerified,
    };
  } else {
    return null;
  }
};

/**
 * Create new user account
 * @param {string} email 
 * @param {string} password 
 * @param {string} username 
 * @returns {object}
 */
export const createUser = async (email, password, username) => {
  const create = await createUserWithEmailAndPassword(auth, email, password);
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
      verified: false,
    };
    await setDoc(doc(db, "users", create.user.uid), userInfo);
    return extractUserProperties(auth.currentUser, userInfo);
  }
  return null;
};

export const sendVerificationEmail = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    return true;
  } catch (error) {
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
    return error.message;
  }
};

/**
 *
 * @param {string} userId
 * @returns {Object | null}
 */
export const getUserInfo = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    return null;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, logOut };

import { signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";

const auth = getAuth();

const login = async (email, password) => {
  try {
    const signIn = await signInWithEmailAndPassword(auth, email, password);
    if (signIn.user) {
      const user = extractUserProperties(signIn.user);
      console.log("login", user);
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

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, logOut };

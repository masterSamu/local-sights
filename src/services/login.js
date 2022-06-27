import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const login = async (email, password) => {
  console.log(email, password, auth);
  const signIn = await signInWithEmailAndPassword(auth, email, password);
  console.log(signIn.user);
  if (signIn.user) {
    const user = {
      email: signIn.user.email,
      displayName: signIn.user.displayName,
      id: signIn.user.uid,
    }
    return user;
  } else {
    console.log("Error login");
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };

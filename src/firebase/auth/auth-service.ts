import {
  // signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

import { FirebaseError } from "firebase/app";

import { auth } from "../config";

export const register = async function (email: string, password: string) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredentials.user;
    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw error;
    }
  }
};



// export const loginWithEmailAndPassword = function(){}
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut
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

export const loginWithEmailAndPassword = async function (
  email: string,
  password: string
) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw error;
    }
  }
};

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async function () {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw error;
    }
  }
};

export const passwordReset = async function (email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      throw error;
    }
  }
};

export const logout = async function () {
  signOut(auth);
};

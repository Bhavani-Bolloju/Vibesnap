import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  orderBy
} from "firebase/firestore";

import { db } from "../config";

import { UserDataProps } from "@/types";

export const addUser = async function (
  uid: string,
  name: string,
  email: string,
  authProvider: string
) {
  await addDoc(collection(db, "users"), {
    uid,
    name,
    email,
    authProvider
  });
};

export const getUser = async function (uid: string) {
  const q = query(collection(db, "users"), where("uid", "==", uid));

  const data = await getDocs(q);
  const docId = data?.docs[0]?.id;
  const docData = data?.docs[0]?.data();

  const user = {
    ...docData,
    userDocId: docId
  };

  return user as UserDataProps;
};

export const createPost = async function (
  userId: string,
  textContent: string,
  media: { url: string; type: string }[],
  timestamp: number
) {
  const postData = {
    userId,
    text: textContent || "",
    media: media || [],
    timestamp
  };

  const docRef = await addDoc(collection(db, "posts"), postData);

  const userRef = query(collection(db, "users"), where("uid", "==", userId));

  const querySnapshot = await getDocs(userRef);

  const userDoc = querySnapshot.docs[0];

  const userDocRef = doc(db, "users", userDoc.id);

  await updateDoc(userDocRef, {
    posts: arrayUnion(docRef.id)
  });
};

export const getPosts = async function () {
  const q = query(collection(db, "posts"), orderBy("timestamp"));

  const data = await getDocs(q);

  const postsData = data.docs.map((doc) => {
    return { ...doc.data() };
    // postDocId: doc.id
  });

  return postsData;
};

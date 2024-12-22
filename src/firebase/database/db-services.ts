import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  doc
} from "firebase/firestore";

import { db } from "../config";

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

  return { email: docData.email, name: docData.name, uid: docData.uid, docId };
};

export const createPost = async function (
  userId: string,
  textContent: string,
  images: string[],
  timestamp: number
) {
  const postData = {
    userId,
    text: textContent || "",
    images: images || [],
    timestamp
  };

  const docRef = await addDoc(collection(db, "posts"), postData);

  console.log(docRef.id, "post id");

  const userRef = query(collection(db, "users"), where("uid", "==", userId));

  const querySnapshot = await getDocs(userRef);

  const userDoc = querySnapshot.docs[0];

  const userDocRef = doc(db, "users", userDoc.id);

  await updateDoc(userDocRef, {
    posts: arrayUnion(docRef.id)
  });
};

export const getPosts = async function () {

  const q = query(collection(db, "posts"));


};

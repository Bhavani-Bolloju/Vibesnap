import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

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

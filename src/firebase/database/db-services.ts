import { addDoc, collection } from "firebase/firestore";

import { db } from "../config";

export const addUser = async function (
  uid: string,
  name: string,
  email: string
) {
  await addDoc(collection(db, "users"), {
    uid,
    name,
    email,
    authProvider: "local"
  });
};


import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  orderBy,
  getDoc,
  startAfter,
  limit,
  QueryDocumentSnapshot,
  DocumentData
} from "firebase/firestore";

import { db } from "../config";

import { UserDataProps, EditProfileProps } from "@/types";

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
  media: { url: string; type: string }[] | null,
  timestamp: number
) {
  const postData = {
    userId,
    text: textContent || "",
    media: media || null,
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


export const updateUserProfile = async function (
  profile: EditProfileProps,
  docId: string
) {
  const userDocRef = doc(db, "users", docId);

  await updateDoc(userDocRef, {
    ...profile
  });
};

export const getUserPosts = async function (
  posts: string[]
): Promise<{ url: string; type: string }[][]> {
  const postsFetchData = posts.map(async (post) => {
    const postRef = doc(db, "posts", post);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      return postSnap.data().media;
    } else {
      return null;
    }
  });

  const postsData = (await Promise.all(postsFetchData)).filter(Boolean);

  return postsData;
};

export const fetchPostsOnScroll = async function (
  lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null = null,
  pageSize: number = 5
) {
  const postsRef = collection(db, "posts");

  let q;

  if (lastVisibleDoc) {
    q = query(
      postsRef,
      orderBy("timestamp"),
      startAfter(lastVisibleDoc),
      limit(pageSize)
    );
  } else {
    q = query(postsRef, orderBy("timestamp"), limit(pageSize));
  }

  const data = await getDocs(q);

  const postsData = data.docs.map(async (doc) => {
    const post = { ...doc.data() };

    const user = await getUser(post?.userId);

    const postData = {
      media: post.media,
      timestamp: post.timestamp,
      text: post.text,
      name: user.name,
      uid: user.uid,
      profileImage: user.profileImage,
      postDocId: doc.id
    };

    return postData;
  });

  const posts = await Promise.all(postsData);

  const lastDoc = data.docs[data.docs.length - 1];

  return { posts, lastDoc };
};

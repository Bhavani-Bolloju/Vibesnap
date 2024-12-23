import { useState, useEffect } from "react";

import { getPosts, getUser } from "@/firebase/database/db-services";

import { FirebaseError } from "firebase/app";

import { FeedProps } from "@/types";

import { toastError } from "@/components/ui/toast";

const useFeeds = function () {
  const [feeds, setFeeds] = useState<null | FeedProps[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const res = await getPosts();

        if (!res) throw new Error("something went wrong");

        const postDetails = res.map(async (post) => {
          const user = await getUser(post?.userId);

          const postData: FeedProps = {
            media: post.media,
            timestamp: post.timestamp,
            text: post.text,
            name: user.name,
            uid: user.uid
          };

          return postData;
        });

        const posts = await Promise.all(postDetails);

        setFeeds(posts);
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          toastError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { isLoading, feeds };
};

export default useFeeds;


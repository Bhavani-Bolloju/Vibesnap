import { useEffect, useState } from "react";

import useUser from "./use-user";
import { getUserPosts } from "@/firebase/database/db-services";

const usePosts = function () {
  const [posts, setPosts] = useState<null | { url: string; type: string }[][]>(
    null
  );

  const user = useUser();

  useEffect(() => {
    const fetchPosts = async function (posts: string[]) {
      const postsData = await getUserPosts(posts);
      setPosts(postsData);
    };

    if (user) {
      fetchPosts(user?.posts);
    }
  }, [user]);

  return posts;
};

export default usePosts;


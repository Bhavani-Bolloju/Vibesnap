import { getUserPosts } from "@/firebase/database/db-services";

import useUser from "./use-user";
import { useEffect, useState } from "react";

// import { UserPostsProp } from "@/types";

const usePosts = function () {
  const [posts, setPosts] = useState<null | { url: string; type: string }[][]>(
    null
  );
  const user = useUser();

  useEffect(() => {
    const fetchPosts = async function (posts: string[]) {
      const res = await getUserPosts(posts);
      setPosts(res);
    };

    if (user?.posts) {
      fetchPosts(user?.posts);
    }
  }, [user]);

  return posts;
};

export default usePosts;


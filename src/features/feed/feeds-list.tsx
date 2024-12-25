import FeedCard from "./feed-card";

import { Skeleton } from "@/components/ui/skeleton";

import React, { useRef, useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

import { fetchPostsOnScroll } from "@/firebase/database/db-services";
import { FirebaseError } from "firebase/app";

import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

interface FetchPostsProps {
  media: { url: string; type: string }[];
  timestamp: number;
  text: string;
  name: string;
  uid: string;
  profileImage: string | File[] | null;
  postDocId: string;
}

const FeedsList = function () {
  const postsLists = Array.from({ length: 5 }, (_, i) => {
    return i;
  });

  const maxResults = 5;

  const lastDoc = useRef<null | QueryDocumentSnapshot>(null);

  const [data, setData] = useState<null | FetchPostsProps[]>(null);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [reachedEnd, setReachedEnd] = useState<boolean>(false);

  const { ref, inView } = useInView({
    threshold: 0.8,
    triggerOnce: false,
    delay: 500,
    root: null
  });

  useEffect(() => {
    const fetchPosts = async function (
      doc: QueryDocumentSnapshot<DocumentData> | null,
      limit: number
    ) {
      try {
        setIsLoading(true);

        const res = await fetchPostsOnScroll(doc, limit);

        if (res) {
          //
          const { posts, lastDoc: newLastDoc } = res;

          if (posts.length === 0) {
            setReachedEnd(true);
          }

          setData((prev) => {
            if (prev) {
              return [...prev, ...posts];
            } else {
              return posts;
            }
          });

          lastDoc.current = newLastDoc;
        }
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          setError(error?.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (inView && !reachedEnd) {
      fetchPosts(lastDoc?.current, maxResults);
    }
  }, [inView, reachedEnd]);

  return (
    <div className="mt-10 flex flex-col">
      <div className="flex flex-col gap-5">
        {isLoading &&
          postsLists.map((num) => (
            <React.Fragment key={num}>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <Skeleton className="w-full h-[200px] rounded-2xl" />
            </React.Fragment>
          ))}
      </div>
      <div>{data && data.map((feed, i) => <FeedCard key={i} {...feed} />)}</div>

      <div className="h-5 w-full flex-end" ref={ref}></div>

      {error && (
        <div className="bg-red-50 text-center font-karla font-semibold text-2xl">
          {error}
        </div>
      )}
    </div>
  );
};

export default FeedsList;

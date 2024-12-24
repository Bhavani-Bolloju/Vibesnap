import useFeeds from "@/hooks/use-feeds";
import FeedCard from "./feed-card";

import { Skeleton } from "@/components/ui/skeleton";

const FeedsList = function () {
  const { isLoading, feeds } = useFeeds();

  console.log(feeds);

  const postsLists = Array.from({ length: 5 }, (_, i) => {
    return i;
  });

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-5">
        {isLoading &&
          postsLists.map(() => (
            <>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <Skeleton className="w-full h-[200px] rounded-2xl" />
            </>
          ))}
      </div>
      <div>
        {feeds && feeds.map((feed, i) => <FeedCard key={i} {...feed} />)}
      </div>
    </div>
  );
};

export default FeedsList;

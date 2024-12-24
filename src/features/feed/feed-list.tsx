import Spinner from "@/components/ui/spinner";
import useFeeds from "@/hooks/use-feeds";
import FeedCard from "./feed-card";

const FeedsList = function () {
  const { isLoading, feeds } = useFeeds();

  console.log(feeds);

  return (
    <div className="mt-10">
      <div className="">{isLoading && <Spinner />}</div>
      <div>
        {feeds && feeds.map((feed, i) => <FeedCard key={i} {...feed} />)}
      </div>
    </div>
  );
};

export default FeedsList;

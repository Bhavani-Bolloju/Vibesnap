import FeedsList from "@/features/feed/feeds-list";
import UserProfileHeader from "@/features/feed/user-profile-header";
import AddNewPost from "@/features/feed/add-new-post";

const FeedsPage = function () {
  return (
    <div className="p-10 md:w-[70%] md:min-w-[600px] m-auto">
      <UserProfileHeader />
      <FeedsList />
      <AddNewPost />
    </div>
  );
};

export default FeedsPage;

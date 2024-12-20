import FeedsList from "@/features/feed/feed-list";
import UserProfileHeader from "@/features/feed/user-profile-header";
import AddNewPost from "@/features/feed/add-new-post";

const FeedsPage = function () {
  return (
    <div className="p-10">
      <UserProfileHeader />
      <FeedsList />
      <AddNewPost />
    </div>
  );
};

export default FeedsPage;

import UserProfile from "@/features/user-profile/user-profile";
import AddNewPost from "@/features/feed/add-new-post";

const ProfilePage = function () {
  return (
    <div className="m-auto">
      <UserProfile />
      <AddNewPost />
    </div>
  );
};

export default ProfilePage;


import { Button } from "@/components/ui/button";

import navigation from "@assets/navigation.svg";

import { useNavigate } from "react-router";

import useUser from "@/hooks/use-user";

import usePosts from "@/hooks/use-posts";

import UserPosts from "./user-posts";

import LazyLoad from "@/components/performance/lazy-load";

const UserProfile = function () {
  const user = useUser();

  const posts = usePosts();

  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col">
      <button
        className="absolute top-2 left-5 bg-white/50 shadow-sm shadow-zinc-200 px-1 rounded-3xl"
        onClick={() => navigate(-1)}
      >
        <img src={navigation} alt="navigation icon" />
      </button>
      <div className="h-[250px] max-sm:h-[180px] bg-gray-200 overflow-hidden">
        {user?.bannerImage && typeof user?.bannerImage === "string" && (
          <LazyLoad src={user?.bannerImage} alt="banner" />
        )}
      </div>
      <div className="h-[150px] overflow-hidden w-[150px] max-sm:h-[100px] max-sm:w-[100px] bg-gray-200 rounded-full -mt-16 ml-8 max-sm:-mt-10 ">
        {user?.profileImage && typeof user?.profileImage === "string" && (
          <LazyLoad src={user?.profileImage} alt="profile" />
        )}
      </div>
      <Button
        variant="outline"
        className="w-fit h-12 px-14 max-sm:px-5 max-sm:h-10 self-end -mt-16 max-sm:-mt-12 mr-10"
        onClick={() => navigate("/editProfile")}
      >
        edit button
      </Button>

      <div className="px-16 py-10 max-sm:px-5">
        <h3 className="font-extrabold font-karla text-2xl capitalize mb-1">
          {user?.name}
        </h3>
        <p className="font-kumbh-sans font-normal text-base mb-5">
          {user?.bio}
        </p>
        {posts && <UserPosts posts={posts} />}
      </div>
    </div>
  );
};

export default UserProfile;

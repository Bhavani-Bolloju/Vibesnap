import { Button } from "@/components/ui/button";

import navigation from "@assets/navigation.svg";

import { useNavigate } from "react-router";

import useUser from "@/hooks/use-user";

// import usePosts from "@/hooks/use-posts";
// import { Card, CardContent } from "@/components/ui/card";

const UserProfile = function () {
  const user = useUser();

  const posts = usePosts();

  console.log(posts);

  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col">
      <button className="absolute top-2 left-5" onClick={() => navigate(-1)}>
        <img src={navigation} alt="navigation icon" />
      </button>
      <div className="h-[250px] bg-gray-200 overflow-hidden">
        {user?.bannerImage && typeof user?.bannerImage === "string" && (
          <img
            src={user?.bannerImage}
            alt="banner"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="h-[150px] overflow-hidden w-[150px] bg-cyan-500 rounded-full -mt-16 ml-10">
        {user?.profileImage && typeof user?.profileImage === "string" && (
          <img
            src={user?.profileImage}
            alt="profile"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <Button
        variant="outline"
        className="w-fit h-12 px-14 self-end -mt-16 mr-10"
        onClick={() => navigate("/editProfile")}
      >
        edit button
      </Button>

      <div className="px-16 py-10 ">
        <h3 className="font-extrabold font-karla text-2xl capitalize mb-1">
          {user?.name}
        </h3>
        <p className="font-kumbh-sans font-normal text-base mb-5">
          {user?.bio}
        </p>
        {/* <div>
          <h4 className="font-karla font-semibold text-lg mb-2">My posts</h4>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 ">
            {posts &&
              posts?.map((post, i) => {
                const firstPost = post[0];

                return (
                  <div key={i} className="w-full h-full relative">
                    <Card className="w-full h-full relative overflow-hidden">
                      <CardContent className="flex w-full h-full aspect-square items-center justify-center p-0">
                        {firstPost?.type === "image" ? (
                          <div className="w-full h-full">
                            <img
                              src={firstPost.url}
                              alt=""
                              width={400}
                              height={200}
                              className="object-cover w-full h-auto block"
                            />
                          </div>
                        ) : (
                          <div className="h-full w-full ">
                            <video
                              width={500}
                              controls
                              className="h-full w-full object-cover"
                            >
                              <source
                                src={firstPost.url}
                                type={`${firstPost.type}/mp4`}
                              />
                            </video>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    <span className="text-white block font-lg font-karla absolute top-3 right-4 bg-black/50 ">
                      1/{post.length}
                    </span>
                  </div>
                );
              })}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserProfile;

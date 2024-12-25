import LazyLoad from "@/components/performance/lazy-load";
import { Card, CardContent } from "@/components/ui/card";
import { UserPostsProp } from "@/types";

const UserPosts = function ({ posts }: UserPostsProp) {
  return (
    <div>
      <h4 className="font-karla font-semibold text-lg mb-2">My posts</h4>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full h-full gap-5">
        {posts && posts.length <= 0 ? (
          <div className="text-primary/80">no posts</div>
        ) : (
          posts?.map((post, i) => {
            const firstPost = post[0];
            return (
              <div key={i} className="w-full h-full relative">
                <Card className="w-full h-full relative overflow-hidden">
                  <CardContent className="flex w-full h-full aspect-square items-center justify-center p-0">
                    {firstPost?.type === "image" ? (
                      <div className="w-full h-full">
                        <LazyLoad src={firstPost.url} alt="" />
                      </div>
                    ) : (
                      <div className="h-full w-full ">
                        <video
                          width={400}
                          height={200}
                          controls
                          className="h-full w-full object-cover block"
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
                <span className="text-white block font-lg font-karla absolute top-3 right-4 bg-black/50 px-2 rounded-2xl">
                  1/{post.length}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserPosts;

import { FeedProps } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import { getRandomPastelColor } from "@/components/shared/get-relative-time";

import SharePost from "./share-post";

import LazyLoad from "@/components/performance/lazy-load";

import VideoAutoPlay from "@/components/performance/video-auto-play";

import getRelativeTime from "@/components/shared/get-relative-time";

const FeedCard = function ({
  profileImage,
  name,
  text,
  media,
  timestamp,
  delay
}: FeedProps) {
  const date = new Date(timestamp);
  const postDate = getRelativeTime(date);
  const bgColor = getRandomPastelColor();

  return (
    <div
      style={{
        backgroundColor: bgColor
      }}
      className="px-14 max-sm:px-5 py-5 rounded-[5%] mb-10 flex flex-col shadow-sm"
    >
      <div className="grid grid-cols-profile gap-x-3 grid-rows-2 h-12 content-center">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden col-start-1 col-end-2 row-span-2 border-2 bg-gray-300">
          {profileImage && typeof profileImage === "string" ? (
            <LazyLoad
              src={profileImage}
              alt=""
              width={50}
              height={50}
              delay={delay}
            />
          ) : (
            <div className="flex items-center justify-center uppercase  w-full h-full">
              {name[0][0]}
            </div>
          )}
        </div>
        <span className="font-karla col-start-2 row-start-1  text-lg font-semibold capitalize">
          {name}
        </span>
        <span className="font-kumbh-sans font-normal col-start-2 row-start-2 leading-[2] text-sm capitalize text-black/35">
          {postDate}
        </span>
      </div>
      <div className="ml-2 font-kumbh-sans text-base font-normal mt-5">
        {text}
      </div>
      {media && media?.length > 0 && (
        <div className=" h-full">
          {media.length === 1 ? (
            <div className="p-3 relative">
              <Card className="md:w-[60%] md:min-w-[400px] h-full rounded-2xl relative overflow-hidden">
                <CardContent className="flex w-full h-full aspect-square items-center justify-center p-0">
                  {media[0]?.type === "image" ? (
                    <LazyLoad src={media[0].url} alt="" delay={delay} />
                  ) : (
                    <VideoAutoPlay src={media[0].url} type={media[0]?.type} />
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Carousel className="w-full m-auto ">
              <CarouselContent className="-ml-1">
                {media?.map((file, index) => {
                  return (
                    <CarouselItem key={index} className="pl-1 lg:basis-1/2 ">
                      <div className="p-3">
                        <Card className="rounded-2xl relative overflow-hidden">
                          <CardContent className="flex aspect-square items-center justify-center p-0">
                            {file?.type === "image" ? (
                              <LazyLoad
                                src={file.url}
                                alt=""
                                width={400}
                                height={400}
                                delay={delay}
                              />
                            ) : (
                              <VideoAutoPlay src={file.url} type={file?.type} />
                            )}
                          </CardContent>
                          <span className="bg-white px-2 rounded-full text-xs font-karla absolute top-2 left-2">{`${
                            index + 1
                          }/${media.length}`}</span>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="max-sm:left-5" />
              <CarouselNext className="max-sm:right-5" />
            </Carousel>
          )}
        </div>
      )}
      <SharePost />
    </div>
  );
};

export default FeedCard;

// <div className="h-full w-full ">
//   <video
//     width={500}
//     controls
//     className="h-full w-full object-cover"
//   >
//     <source src={file.url} type={file.type} />
//   </video>
// </div>

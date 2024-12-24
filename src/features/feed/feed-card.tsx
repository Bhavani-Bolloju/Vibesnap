import { FeedProps } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import { getRelativeTime } from "@/components/utils/utils";

const FeedCard = function ({
  profileImage,
  name,
  text,
  media,
  timestamp
}: FeedProps) {
  const date = new Date(timestamp);

  const postDate = getRelativeTime(date);

  return (
    <div className="px-14 max-sm:px-5 py-5  rounded-[5%] mb-10 border-2">
      <div className="grid grid-cols-profile gap-x-5 grid-rows-2 h-12 mb-5 content-center">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden col-start-1 col-end-2 row-span-2 border-2 bg-red-400">
          {profileImage && typeof profileImage === "string" ? (
            <img
              src={profileImage}
              alt=""
              className="block w-full h-full object-cover"
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
      {media.length > 0 && (
        <div className=" h-full">
          {media.length === 1 ? (
            <div className="p-3 relative">
              <Card className="md:w-[60%] md:min-w-[400px] h-full rounded-2xl relative overflow-hidden">
                <CardContent className="flex w-full h-full aspect-square items-center justify-center p-0">
                  {media[0]?.type === "image" ? (
                    <div className="w-full h-full">
                      <img
                        src={media[0].url}
                        alt=""
                        width={400}
                        height={200}
                        className="object-cover w-full h-full"
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
                          src={media[0].url}
                          type={`${media[0].type}/mp4`}
                        />
                      </video>
                    </div>
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
                              <div className="w-full h-full">
                                <img
                                  src={file.url}
                                  alt=""
                                  width={300}
                                  height={200}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <div className="h-full w-full ">
                                <video
                                  width={500}
                                  controls
                                  className="h-full w-full object-cover"
                                >
                                  <source src={file.url} type={file.type} />
                                </video>
                              </div>
                            )}
                          </CardContent>
                          <span className="bg-white px-2 rounded-full text-xs font-karla absolute top-2 left-2">{`${index + 1}/${media.length}`}</span>
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
    </div>
  );
};

export default FeedCard;

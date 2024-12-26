import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "../ui/skeleton";

interface VideoPlayProp {
  src: string;
  type: string;
}

const VideoAutoPlay = function ({ src, type }: VideoPlayProp) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    delay: 200,
    triggerOnce: false
  });

  const videoRef = useRef<null | HTMLVideoElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true);
    }
  }, [inView, isLoading]);

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full h-full">
      {isLoading ? (
        <video
          width={400}
          height={500}
          controls
          muted
          autoPlay
          preload="auto"
          ref={videoRef}
          className="h-full w-full object-cover"
        >
          <source src={src} type={`${type}/mp4`} />
          <p>
            Your browser doesn't support HTML video. Here is a
            <a href={src} download={src}>
              link to the video
            </a>
            instead.
          </p>
        </video>
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </div>
  );
};

export default VideoAutoPlay;

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "../ui/skeleton";

interface LazyLoadProps {
  src: string;
  alt: string;
  // width: string;
  // height: string;
}

const LazyLoad = function ({ src, alt = "" }: LazyLoadProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    delay: 500,
    triggerOnce: true
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full h-full">
      {isLoading ? (
        <img
          src={src}
          width={400}
          height={500}
          alt={alt}
          className="w-full h-full object-cover block"
        />
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </div>
  );
};

export default LazyLoad;

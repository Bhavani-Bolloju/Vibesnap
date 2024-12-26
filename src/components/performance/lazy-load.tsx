import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "../ui/skeleton";


interface LazyLoadProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  delay?: number;
}

const LazyLoad = function ({
  src,
  alt = "",
  width = 400,
  height = 400,
  delay = 2000,
}: LazyLoadProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    delay: delay,
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
          width={width}
          height={height}
          alt={alt}
          className="w-full h-full object-cover block"
          loading="eager" 
        />
      ) : (
        <Skeleton className="w-full h-full" />
      )}
    </div>
  );
};

export default LazyLoad;

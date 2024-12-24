import img1 from "@assets/img1.webp";
import img2 from "@assets/img2.webp";
import img3 from "@assets/img3.webp";
import img6 from "@assets/img6.webp";
import img7 from "@assets/img7.webp";
import img8 from "@assets/img8.webp";
import img9 from "@assets/img9.webp";
import img11 from "@assets/img11.webp";
import img13 from "@assets/img13.webp";
import img14 from "@assets/img14.webp";
import img15 from "@assets/img15.webp";

import LazyLoad from "../performance/lazy-load";

const Gallery = function () {
  return (
    <div className="gallery">
      <figure className="text-5xl text-center font-bold col-start-1 col-end-3 row-start-1 row-end-4">
        <LazyLoad src={img3} alt="" />
      </figure>
      <figure className="text-5xl text-center font-bold col-start-3 col-end-4 row-start-1 row-end-4">
        <LazyLoad src={img13} alt="" />
      </figure>
      <figure className="text-5xl text-center font-bold  col-start-1 col-end-2 row-start-4 row-span-2 ">
        <LazyLoad src={img1} alt="" />
      </figure>
      <figure className="text-5xl text-center font-bold col-start-2 col-end-4 row-start-4 row-span-2">
        <LazyLoad src={img15} alt="" />
      </figure>

      <figure className="text-5xl text-center font-bold  col-start-4 col-end-6 row-start-3 row-end-6 max-sm:hidden">
        <LazyLoad src={img14} alt="" />
      </figure>
      <figure className="text-5xl text-center font-bold  col-start-4 col-end-6 row-start-1 row-end-3 max-sm:hidden">
        <LazyLoad src={img2} alt="" />
      </figure>
      <figure className="text-5xl text-center font-bold  col-start-6 col-end-7 row-start-1 row-end-3 max-lg:hidden">
        <LazyLoad src={img7} alt="" />
      </figure>
      <figure className="text-5xl text-center font-bold  col-start-6 col-end-7 row-start-3 row-end-4 max-lg:hidden">
        <LazyLoad src={img8} alt="" />
      </figure>
      <figure className="text-5xl text-center font-bold  col-start-7 col-end-9 row-start-1 row-end-4  max-lg:hidden">
        <LazyLoad src={img9} alt="" />
      </figure>
      <figure className="text-5xl text-center font-bold col-start-6 col-end-8 row-start-4 row-end-6 max-lg:hidden">
        <LazyLoad src={img6} alt="" />
      </figure>
      <figure className="text-5xl text-center font-bold  col-start-8 col-end-9 row-start-4 row-end-6 max-lg:hidden">
        <LazyLoad src={img11} alt="" />
      </figure>
    </div>
  );
};

export default Gallery;

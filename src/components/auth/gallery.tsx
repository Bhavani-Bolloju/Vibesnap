import image1 from "@assets/image-1.jpg";
import image2 from "@assets/image-2.jpg";
import image4 from "@assets/image-4.jpg";

import image7 from "@assets/image-7.jpg";
import image9 from "@assets/image-9.jpg";
import image11 from "@assets/image-11.jpg";
import image12 from "@assets/image-12.jpg";
import image13 from "@assets/image-13.jpg";
import image15 from "@assets/image-15.jpg";
import image16 from "@assets/image-16.jpg";
import image17 from "@assets/image-17.jpg";
import image18 from "@assets/image-18.jpg";
import image19 from "@assets/image-19.jpg";
import image20 from "@assets/image-20.jpg";

// import image3 from "@assets/image-3.jpg";
// import image5 from "@assets/image-5.jpg";
// import image6 from "@assets/image-6.jpg";
// import image8 from "@assets/image-8.jpg";
// import image14 from "@assets/image-14.jpg";
// import image10 from "@assets/image-10.jpg";
const Gallery = function () {
  return (
    <div className="gallery">
      <figure className="col-start-1 col-end-3 row-start-1 row-end-5">
        <img src={image2} alt="image2" className="w-full h-full object-cover" />
      </figure>
      <figure className="col-start-3 col-end-5 row-start-1 row-end-3 col-span-2 row-span-2">
        <img src={image4} alt="image4" className="w-full h-full object-cover" />
      </figure>
      <figure className="col-start-1 col-end-2 row-start-5  row-span-3  ">
        <img src={image1} alt="image1" className="w-full h-full object-cover" />
      </figure>
      <figure className="col-start-2 col-end-4 row-start-5 row-span-3">
        <img
          src={image19}
          alt="image19"
          className="w-full h-full object-cover"
        />
      </figure>
      <figure className="col-start-3 col-end-4 row-start-3 row-end-5">
        <img src={image7} alt="image7" className="w-full h-full object-cover" />
      </figure>
      <figure className="col-start-4 col-end-6 row-start-3 row-span-5">
        <img src={image9} alt="image9" className="w-full h-full object-cover" />
      </figure>
      <figure className="col-start-5 col-end-5 row-start-1 row-end-3">
        <img
          src={image20}
          alt="image20"
          className="w-full h-full object-cover"
        />
      </figure>
      <figure className="col-start-6 col-end-8 row-start-1 row-end-5">
        <img
          src={image15}
          alt="image15"
          className="w-full h-full object-cover"
        />
      </figure>
      <figure className=" col-start-6 col-end-8 row-start-5 row-span-3  ">
        <img
          src={image17}
          alt="image17"
          className="w-full h-full object-cover"
        />
      </figure>
      <figure className=" col-start-8 col-end-9 row-start-1 row-end-4 ">
        <img
          src={image18}
          alt="image18"
          className="w-full h-full object-cover bg-top"
        />
      </figure>

      <figure className=" col-start-9 col-end-11 row-start-1 row-end-3 ">
        <img
          src={image13}
          alt="image13"
          className="w-full h-full object-cover"
        />
      </figure>

      <figure className=" col-start-8 col-end-9 row-start-4 row-end-6  ">
        <img
          src={image11}
          alt="image11"
          className="w-full h-full object-cover"
        />
      </figure>

      <figure className=" col-start-9 col-end-11 row-start-3 row-end-8  ">
        <img
          src={image16}
          alt="image16"
          className="w-full h-full object-cover"
        />
      </figure>

      <figure className=" row-span-2  ">
        <img
          src={image12}
          alt="image12"
          className="w-full h-full object-cover"
        />
      </figure>
    </div>
  );
};

export default Gallery;


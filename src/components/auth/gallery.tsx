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

const Gallery = function () {
  return (
    <div className="gallery">
      <figure className="bg-purple-500 text-5xl text-center font-bold text-white col-start-1 col-end-3 row-start-1 row-end-4">
        <img
          src={img3}
          alt=""
          className="w-full h-full block object-cover bg-top"
        />
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-lime-400 col-start-3 col-end-4 row-start-1 row-end-4">
        <img src={img13} alt="" className="w-full h-full block object-cover" />
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-cyan-300 col-start-1 col-end-2 row-start-4 row-span-2 ">
        <img
          src={img1}
          alt=""
          className="w-full h-full block object-cover bg-top"
        />
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-red-400 col-start-2 col-end-4 row-start-4 row-span-2">
        <img
          src={img15}
          alt=""
          className="w-full h-full block object-cover bg-top"
        />
      </figure>

      <figure className="text-5xl text-center font-bold text-white bg-indigo-400 col-start-4 col-end-6 row-start-3 row-end-6 max-sm:hidden">
        <img
          src={img14}
          alt=""
          className="w-full h-full block object-cover bg-top"
        />
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-fuchsia-400 col-start-4 col-end-6 row-start-1 row-end-3 max-sm:hidden">
        <img
          src={img2}
          alt=""
          className="w-full h-full block object-cover bg-top"
        />
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-orange-400 col-start-6 col-end-7 row-start-1 row-end-3 max-lg:hidden">
        <img
          src={img7}
          alt=""
          className="w-full h-full block object-cover bg-top"
        />
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-slate-700 col-start-6 col-end-7 row-start-3 row-end-4 max-lg:hidden">
        <img
          src={img8}
          alt=""
          className="w-full h-full block object-cover bg-top"
        />
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-yellow-400 col-start-7 col-end-9 row-start-1 row-end-4  max-lg:hidden">
        <img
          src={img9}
          alt=""
          className="w-full h-full block object-cover bg-top"
        />
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-green-500 col-start-6 col-end-8 row-start-4 row-end-6 max-lg:hidden">
        <img
          src={img6}
          alt=""
          className="w-full h-full block object-cover bg-top"
        />
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-pink-500 col-start-8 col-end-9 row-start-4 row-end-6 max-lg:hidden">
        <img
          src={img11}
          alt=""
          className="w-full h-full block object-cover bg-top"
        />
      </figure>
    </div>
  );
};

export default Gallery;

{
  /* <figure className="bg-purple-500 text-5xl text-center font-bold text-white col-start-1 col-end-3 row-start-1 row-end-5">
        1
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-lime-400 col-start-3 col-end-5 row-start-1 row-end-3 col-span-2 row-span-2">
        2
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-cyan-300 col-start-1 col-end-2 row-start-5  row-span-3  ">
        3
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-red-400 col-start-2 col-end-4 row-start-5 row-span-3">
        4
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-amber-400 col-start-3 col-end-4 row-start-3 row-end-5">
        5
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-indigo-400 col-start-4 col-end-6 row-start-3 row-span-5">
        6
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-fuchsia-400 col-start-5 col-end-5 row-start-1 row-end-3">
        7
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-orange-400 col-start-6 col-end-8 row-start-1 row-end-5">
        8
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-slate-700 col-start-6 col-end-9 row-start-5 row-span-3  ">
        9
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-yellow-400 col-start-8 col-end-9 row-start-1 row-end-4 ">
        10
      </figure>
      <figure className="text-5xl text-center font-bold text-white bg-green-500">
        11
      </figure> */
}

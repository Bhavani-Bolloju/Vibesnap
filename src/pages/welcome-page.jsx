import { Button } from "@/components/ui/button";
import Gallery from "@/components/auth/gallery";
import GoogleLogin from "@/features/auth/google-login";
import logo from "@assets/vibespan.svg";

const WelcomePage = function () {
  return (
    <div className="m-auto relative h-screen">
      <Gallery />
      <div className="w-full absolute top-[50vh] bg-white h-[50vh] rounded-tr-[100px] rounded-tl-[100px] ">
        <div className="py-10  flex items-center flex-col">
          {/* <div></div> */}
          <h1 className="flex items-center gap-2">
            <img src={logo} alt="" />
            <span className="font-karla text-[28px] font-semibold">
              Vibespan
            </span>
          </h1>
          <p className="text-base mb-10">
            Moments That Matter, Shared Forever.
          </p>
          <div className="text-center">
            <GoogleLogin />
            <div className="my-5 flex items-center gap-5">
              <span className="w-full h-[.5px] bg-gray-800/60"></span>
              <span className="font-karla text-base">or</span>
              <span className="w-full h-[.5px] bg-gray-800/60"></span>
            </div>

            <a
              href="#"
              className="font-semibold hover:border-b-2 hover:border-gray-900 "
            >
              Login/signup with email
            </a>
            {/* <Button variant="outline">Login/signup with email</Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;


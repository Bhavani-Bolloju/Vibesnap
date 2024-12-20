import { logout } from "@/firebase/auth/auth-service";
import { toastSuccess } from "@/components/ui/toast";

import { Button } from "@/components/ui/button";

import image1 from "@assets/img3.webp";

const UserProfileHeader = function () {
  const logoutHandler = function () {
    logout();
    toastSuccess("You have successfully logged out. See you again soon!");
  };
  return (
    <div className="flex justify-between items-center">
      <div className="grid grid-cols-profile gap-x-3 grid-rows-2 h-12 mb-5 content-center">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden col-start-1 col-end-2 row-span-2">
          <img
            src={image1}
            alt=""
            className="block w-full h-full object-cover"
          />
        </div>
        <span className="col-start-2 row-start-1 leading-[2] text-sm capitalize text-black/35">
          Welcome back
        </span>
        <span className="col-start-2 row-start-2  text-md font-semibold capitalize">
          Arora singh
        </span>
      </div>
      <Button
        variant="outline"
        className="w-fit px-8 h-[40px]"
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserProfileHeader;


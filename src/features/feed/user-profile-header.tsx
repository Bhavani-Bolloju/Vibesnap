import { logout } from "@/firebase/auth/auth-service";
import { toastSuccess } from "@/components/ui/toast";

import { Button } from "@/components/ui/button";

import image1 from "@assets/img3.webp";

// import { getAuth } from "firebase/auth";

import useUser from "@/hooks/use-user";

import { Link } from "react-router";

const UserProfileHeader = function () {
  // const auth = getAuth();
  const user = useUser();

  const logoutHandler = function () {
    logout();
    toastSuccess("You have successfully logged out!");
  };
  return (
    <div className="flex justify-between items-center">
      <div className="grid grid-cols-profile gap-x-3 grid-rows-2 h-12 mb-5 content-center">
        <div className="w-[50px] h-[50px] rounded-full overflow-hidden col-start-1 col-end-2 row-span-2 border-2 bg-red-400">
          {user?.image ? (
            <img
              src={image1}
              alt=""
              className="block w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center uppercase  w-full h-full">
              {user?.name[0][0]}
            </div>
          )}
        </div>
        <span className="col-start-2 row-start-1 leading-[2] text-sm capitalize text-black/35">
          Welcome back
        </span>
        <Link
          to="/profile"
          className="col-start-2 row-start-2 hover:underline hover:text-link"
        >
          <span className="text-md font-semibold capitalize">{user?.name}</span>
        </Link>
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

import { Button } from "@/components/ui/button";

import navigation from "@assets/navigation.svg";

import { useNavigate } from "react-router";

const UserProfile = function () {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col">
      <button className="absolute top-2 left-5" onClick={() => navigate(-1)}>
        <img src={navigation} alt="navigation icon" />
      </button>
      <div className="h-[250px] bg-gray-200">
        <img src="" alt="" />
      </div>
      <div className="h-[150px] w-[150px] bg-cyan-500 rounded-full -mt-16 ml-10">
        <img src="" alt="" />
      </div>
      <Button
        variant="outline"
        className="w-fit h-12 px-14 self-end -mt-16 mr-10"
        onClick={() => navigate("/editProfile")}
      >
        edit button
      </Button>

      <div className="px-16 py-10 ">
        <h3 className="font-extrabold font-karla text-2xl capitalize mb-1">
          name
        </h3>
        <p className="font-kumbh-sans font-normal text-base mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          facere nostrum, quos, sint voluptates provident, sequi cupiditate
          deserunt facilis dignissimos.
        </p>
        <div>
          <h4 className="font-karla font-semibold text-lg mb-2">My posts</h4>
          <ul>
            <li>post 1</li>
            <li>post 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

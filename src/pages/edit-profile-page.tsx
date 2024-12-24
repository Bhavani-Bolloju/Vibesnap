import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";

import navigation from "@assets/navigation.svg";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import UploadContent from "@/components/posts/upload-content";

import EditImageIcon from "@/components/ui/edit-image-icon";

import { EditProfileProps } from "@/types";

import useUser from "@/hooks/use-user";
import { FirebaseError } from "firebase/app";

import Spinner from "@/components/ui/spinner";
import { uploadImages } from "@/firebase/storage/storage-services";
import { updateUserProfile } from "@/firebase/database/db-services";

import { toastError, toastSuccess } from "@/components/ui/toast";

const EditProfilePage = function () {
  const user = useUser();

  const [profileDetails, setProfileDetails] = useState<EditProfileProps>({
    name: "",
    bannerImage: null,
    profileImage: null,
    bio: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileDetails({
        name: user.name,
        bannerImage: user.bannerImage,
        profileImage: user.profileImage,
        bio: user.bio
      });
    }
  }, [user]);

  const navigate = useNavigate();

  const bannerUploadHandler = function (file: File[]) {
    console.log(file, file[0] instanceof File);
    setProfileDetails((prev) => ({ ...prev, bannerImage: file }));
  };

  const profileUploadHandler = function (file: File[]) {
    setProfileDetails((prev) => ({ ...prev, profileImage: file }));
  };

  const inputNameHandler = function (e: React.ChangeEvent<HTMLInputElement>) {
    setProfileDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const inputBioHandler = function (e: React.ChangeEvent<HTMLTextAreaElement>) {
    setProfileDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveProfileHandler = async function (
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setIsLoading(true);
    try {
      let banner;
      let profile;

      if (profileDetails?.bannerImage) {
        if (
          typeof profileDetails?.bannerImage === "object" &&
          profileDetails?.bannerImage[0] instanceof File
        ) {
          const bannerURL = await uploadImages(
            profileDetails?.bannerImage,
            "profile"
          );

          banner = bannerURL[0]?.url;
        } else {
          banner = profileDetails?.bannerImage;
        }
      }

      if (profileDetails?.profileImage) {
        if (
          typeof profileDetails?.profileImage === "object" &&
          profileDetails?.profileImage[0] instanceof File
        ) {
          const profileURL = await uploadImages(
            profileDetails?.profileImage,
            "profile"
          );

          profile = profileURL[0]?.url;
        } else {
          profile = profileDetails?.profileImage;
        }
      }

      if (!user?.userDocId) throw new Error("user is not available");

      await updateUserProfile(
        {
          profileImage: profile,
          bannerImage: banner,
          bio: profileDetails?.bio,
          name: profileDetails?.name
        },
        user?.userDocId
      );

      toastSuccess("profile is updated successfully");
      //redirect user
      setTimeout(() => {
        navigate("/profile");
      }, 2500);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toastError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col ">
      <button className="fixed z-10 top-2 left-5" onClick={() => navigate(-1)}>
        <img src={navigation} className="w-full h-full" alt="navigation icon" />
      </button>
      <div className="h-[250px] overflow-hidden bg-gray-200 relative">
        {profileDetails?.bannerImage && (
          <img
            src={
              typeof profileDetails?.bannerImage === "string"
                ? profileDetails?.bannerImage
                : URL.createObjectURL(profileDetails?.bannerImage[0])
            }
            alt=""
            className="w-full h-full object-cover block"
          />
        )}
        <UploadContent
          multiSelect={false}
          onUpload={bannerUploadHandler}
          acceptTypes={{ "image/*": [] }}
        >
          <button className="w-10 h-10 absolute bottom-5 right-5 bg-white text-primary/80  rounded-full ">
            <EditImageIcon />
          </button>
        </UploadContent>
      </div>

      <div className="h-[150px] overflow-hidden w-[150px] relative bg-gray-200 rounded-full -mt-16 ml-10">
        {profileDetails?.profileImage && (
          <img
            src={
              typeof profileDetails?.profileImage === "string"
                ? profileDetails?.profileImage
                : URL.createObjectURL(profileDetails?.profileImage[0])
            }
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        <UploadContent
          multiSelect={false}
          onUpload={profileUploadHandler}
          acceptTypes={{ "image/*": [] }}
        >
          <button className="w-10 h-10 absolute top-1/2 -right-2 bg-white text-primary/80 rounded-full ">
            <EditImageIcon />
          </button>
        </UploadContent>
      </div>

      <form
        className="px-16 max-sm:px-8 py-10 sm:w-[600px] h-[50vh] flex flex-col "
        onSubmit={saveProfileHandler}
      >
        <div className="flex flex-col mb-5 gap-2">
          <Label htmlFor="name">Name</Label>
          <input
            type="text"
            className="border-b outline-none focus:outline-none font-semibold placeholder:font-normal border-primary/80 h-8"
            placeholder="your name"
            name="name"
            value={profileDetails.name}
            onChange={inputNameHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Bio</Label>
          <textarea
            name="bio"
            id="bio"
            className="font-semibold font-kumbh-sans outline-none focus:outline-none border-b border-primary/80 resize-none placeholder:font-normal"
            placeholder="Enter your bio"
            value={profileDetails.bio}
            onChange={inputBioHandler}
            maxLength={300}
            required
          ></textarea>
          <span className="self-end">{profileDetails?.bio?.length}/300</span>
        </div>
        <Button className="mt-auto">Save</Button>
      </form>

      {isLoading && (
        <div className="flex items-center flex-col justify-center absolute top-1/4 left-1/2 w-40 h-24 -translate-x-1/2 bg-white/50">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;

/*


501

322


 */

import { useState, useContext } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import WebCamCapture from "./web-cam-capture";
import UploadContent from "./upload-content";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { createPost } from "@/firebase/database/db-services";

import { uploadImages } from "@/firebase/storage/storage-services";

import { AuthContext } from "@/firebase/auth/auth-context";
import { FirebaseError } from "firebase/app";

import { toastSuccess, toastError } from "@/components/ui/toast";

import Spinner from "@/components/ui/spinner";

import { useNavigate } from "react-router";

const CreateNewPost = function () {
  const [multiSelect, setMultiSelect] = useState(false);
  // const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const [files, setFiles] = useState<File[] | null>(null);

  const [postContentText, setPostContentText] = useState("");

  const user = useContext(AuthContext);

  const [isLoading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const filesHandler = function (files: File[]) {
    setFiles((prev) => {
      if (multiSelect) {
        return prev ? [...prev, ...files] : files;
      } else {
        return files;
      }
    });
  };

  const handlerRemoveFile = function (index: number) {
    setFiles((prev) => {
      if (!prev) return prev;

      if (prev.length > 0) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  };

  const multiSelectHandler = function () {
    setMultiSelect((prev) => !prev);
    setFiles(null);
  };

  const textContentHandler = function (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setPostContentText(e.target.value);
  };

  //image/jpeg, video/mp4

  // console.log(files);

  const createPostHandler = async function (
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!files || !user.user) return;

    setIsloading(true);
    try {
      const media = await uploadImages(files);

      console.log(media, "media");

      await createPost(user.user?.uid, postContentText, media, Date.now());

      toastSuccess("post has been shared successfully!!");

      //redirect the user to feeds page
      setTimeout(() => {
        navigate("/feeds");
      }, 2500);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        toastError(error.message);
      }
    } finally {
      //clear all the fields
      setIsloading(false);
      setPostContentText("");
      setFiles(null);
    }
  };

  const backButton = function () {
    navigate(-1);
  };

  return (
    <div className="w-[70%] max-sm:w-[90%] flex flex-col m-auto py-12 relative">
      <div className="flex items-center gap-3 text-xl">
        <button onClick={backButton}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.6484 17.6484C11.4234 17.8734 11.1182 17.9997 10.8 17.9997C10.4818 17.9997 10.1767 17.8734 9.95164 17.6484L5.15164 12.8484C4.92667 12.6234 4.80029 12.3182 4.80029 12C4.80029 11.6818 4.92667 11.3766 5.15164 11.1516L9.95164 6.35159C10.178 6.13301 10.4811 6.01205 10.7957 6.01479C11.1104 6.01752 11.4113 6.14372 11.6338 6.36621C11.8563 6.5887 11.9825 6.88968 11.9852 7.20431C11.988 7.51895 11.867 7.82207 11.6484 8.04839L8.89684 10.8H18C18.3183 10.8 18.6235 10.9264 18.8486 11.1515C19.0736 11.3765 19.2 11.6817 19.2 12C19.2 12.3183 19.0736 12.6235 18.8486 12.8485C18.6235 13.0736 18.3183 13.2 18 13.2H8.89684L11.6484 15.9516C11.8734 16.1766 11.9998 16.4818 11.9998 16.8C11.9998 17.1182 11.8734 17.4234 11.6484 17.6484Z"
              fill="black"
            />
          </svg>
        </button>
        <h3 className="capitalize font-extrabold"> new post</h3>
      </div>
      <div>
        {multiSelect && files && (
          <Carousel className="w-full m-auto ">
            <CarouselContent className="-ml-1">
              {files?.map((file, index) => {
                return (
                  <CarouselItem
                    key={index}
                    className="pl-1 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-3">
                      <Card className="relative overflow-hidden">
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          {file?.type.startsWith("image") ? (
                            <div className="w-full h-full">
                              <img
                                src={URL.createObjectURL(file)}
                                alt=""
                                width={300}
                                height={200}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ) : (
                            <div className="h-full w-full ">
                              <video
                                width={500}
                                controls
                                className="h-full w-full object-cover"
                              >
                                <source
                                  src={URL.createObjectURL(file)}
                                  type={file.type}
                                />
                              </video>
                            </div>
                          )}
                        </CardContent>
                        <span className="bg-white px-2 rounded-full text-xs font-karla absolute top-2 left-2">{`${index + 1}/${files.length}`}</span>
                        <button
                          className="h-5 w-5 rounded-full text-lg font-karla absolute top-2 right-2 flex items-center justify-center"
                          onClick={() => handlerRemoveFile(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                          >
                            <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"></path>
                          </svg>
                        </button>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
        {!multiSelect && files?.length === 1 && (
          <div className="p-3 relative md:w-[550px] h-full m-auto">
            <Card className="w-full h-full relative overflow-hidden">
              <CardContent className="flex w-full h-full aspect-square items-center justify-center p-0">
                {files[0]?.type.startsWith("image") ? (
                  <div className="w-full h-full">
                    <img
                      src={URL.createObjectURL(files[0])}
                      alt=""
                      width={400}
                      height={200}
                      className="object-cover w-full h-auto block"
                    />
                  </div>
                ) : (
                  <div className="h-full w-full ">
                    <video
                      width={500}
                      controls
                      className="h-full w-full object-cover"
                    >
                      <source
                        src={URL.createObjectURL(files[0])}
                        type={files[0].type}
                      />
                    </video>
                  </div>
                )}
              </CardContent>
              <button
                className="h-5 w-5 rounded-full text-lg font-karla absolute top-2 right-2 flex items-center justify-center"
                onClick={() => setFiles(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 24 24"
                >
                  <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"></path>
                </svg>
              </button>
            </Card>
          </div>
        )}
      </div>
      <form id="post" onSubmit={createPostHandler}>
        <div className="mt-5 flex flex-col items-end">
          <textarea
            name="post-content"
            rows={2}
            maxLength={300}
            placeholder="Enter your notes here...."
            className="resize-none outline-none  
          w-full placeholder:text-black/50 placeholder:font-karla"
            onChange={textContentHandler}
            value={postContentText}
            required
          ></textarea>
          <span className="font-bold font-karla text-primary/80">
            {postContentText.length}/300
          </span>
        </div>
      </form>
      <div className="flex items-center max-sm:flex-wrap gap-3 border-t-2 pt-3 border-primary/50">
        <UploadContent multiSelect={multiSelect} onUpload={filesHandler}>
          <button className=" w-8 h-8 text-primary border-2 rounded-full border-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 48 48"
              fill="currentColor"
              className="w-full h-auto p-1"
            >
              <path d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 31.955078 L 32.988281 26.138672 A 1.50015 1.50015 0 0 0 32.986328 26.136719 C 32.208234 25.385403 31.18685 25 30.173828 25 C 29.16122 25 28.13988 25.385387 27.361328 26.138672 L 25.3125 28.121094 L 19.132812 22.142578 C 18.35636 21.389748 17.336076 21 16.318359 21 C 15.299078 21 14.280986 21.392173 13.505859 22.140625 A 1.50015 1.50015 0 0 0 13.503906 22.142578 L 9 26.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 30.5 13 C 29.125 13 27.903815 13.569633 27.128906 14.441406 C 26.353997 15.313179 26 16.416667 26 17.5 C 26 18.583333 26.353997 19.686821 27.128906 20.558594 C 27.903815 21.430367 29.125 22 30.5 22 C 31.875 22 33.096185 21.430367 33.871094 20.558594 C 34.646003 19.686821 35 18.583333 35 17.5 C 35 16.416667 34.646003 15.313179 33.871094 14.441406 C 33.096185 13.569633 31.875 13 30.5 13 z M 30.5 16 C 31.124999 16 31.403816 16.180367 31.628906 16.433594 C 31.853997 16.686821 32 17.083333 32 17.5 C 32 17.916667 31.853997 18.313179 31.628906 18.566406 C 31.403816 18.819633 31.124999 19 30.5 19 C 29.875001 19 29.596184 18.819633 29.371094 18.566406 C 29.146003 18.313179 29 17.916667 29 17.5 C 29 17.083333 29.146003 16.686821 29.371094 16.433594 C 29.596184 16.180367 29.875001 16 30.5 16 z M 16.318359 24 C 16.578643 24 16.835328 24.09366 17.044922 24.296875 A 1.50015 1.50015 0 0 0 17.046875 24.298828 L 23.154297 30.207031 L 14.064453 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 30.673828 L 15.589844 24.298828 C 15.802764 24.093234 16.059641 24 16.318359 24 z M 30.173828 28 C 30.438806 28 30.692485 28.09229 30.902344 28.294922 L 39 36.128906 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 18.380859 39 L 29.447266 28.294922 C 29.654714 28.094207 29.910436 28 30.173828 28 z"></path>
            </svg>
          </button>
        </UploadContent>
        <WebCamCapture onCapture={filesHandler} multiSelect={multiSelect} />
        <div className="flex items-center gap-2">
          <Label
            htmlFor="multi-select"
            className="capitalize text-sm text-primary"
          >
            multi-select
          </Label>
          <Switch
            id="multi-select"
            checked={multiSelect}
            onCheckedChange={multiSelectHandler}
          />
        </div>
      </div>
      <Button
        className="mt-5 self-end text-end sm:w-[100px] h-10 max-sm:grow uppercase"
        type="submit"
        form="post"
      >
        Post
      </Button>
      {isLoading && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-white/40">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default CreateNewPost;

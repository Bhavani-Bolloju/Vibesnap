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
          <div className="p-3 relative">
            <Card className="w-full h-full relative overflow-hidden">
              <CardContent className="flex w-full h-full aspect-square items-center justify-center p-0">
                {files[0]?.type.startsWith("image") ? (
                  <div className="w-full h-full">
                    <img
                      src={URL.createObjectURL(files[0])}
                      alt=""
                      width={400}
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
        <UploadContent multiSelect={multiSelect} onUpload={filesHandler} />
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


import { useState, useRef, useCallback } from "react";
const videoConstraints = {
  facingMode: "user"
};

import Webcam from "react-webcam";

import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader
} from "@/components/ui/dialog";

import captureIcon from "@assets/icons8-round-80.png";
import { Button } from "@/components/ui/button";

interface WebCamCaptureProps {
  onCapture: (file: File[]) => void;
  multiSelect: boolean;
}

const WebCamCapture = function ({
  onCapture,
  multiSelect
}: WebCamCaptureProps) {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "File name", { type: "image/jpeg" });
          onCapture([file]);
        });

      setCaptureEnable(false);
    }
  }, [webcamRef, onCapture]);

  return (
    <Dialog open={isCaptureEnable} onOpenChange={setCaptureEnable}>
      <DialogTrigger
        disabled={multiSelect}
        onClick={() => setCaptureEnable(true)}
        className=" disabled:text-primary/70 w-8 h-8 text-primary disabled:cursor-not-allowed border-2 border-primary rounded-full disabled:border-primary/70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="96px"
          height="96px"
          fill="currentColor"
          className="w-full h-auto p-1"
        >
          <path d="M 13.5 5 L 13.1875 5.40625 L 12 7 L 11 7 L 11 6 L 5 6 L 5 7 L 3 7 L 3 26 L 29 26 L 29 7 L 24 7 L 22.8125 5.40625 L 22.5 5 Z M 14.5 7 L 21.5 7 L 22.6875 8.59375 L 23 9 L 27 9 L 27 24 L 5 24 L 5 9 L 13 9 L 13.3125 8.59375 Z M 8 10 C 7.449219 10 7 10.449219 7 11 C 7 11.550781 7.449219 12 8 12 C 8.550781 12 9 11.550781 9 11 C 9 10.449219 8.550781 10 8 10 Z M 18 10 C 14.699219 10 12 12.699219 12 16 C 12 19.300781 14.699219 22 18 22 C 21.300781 22 24 19.300781 24 16 C 24 12.699219 21.300781 10 18 10 Z M 18 12 C 20.222656 12 22 13.777344 22 16 C 22 18.222656 20.222656 20 18 20 C 15.777344 20 14 18.222656 14 16 C 14 13.777344 15.777344 12 18 12 Z" />
        </svg>
      </DialogTrigger>
      <DialogContent className="h-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center">Camera</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="h-full w-full ">
          <Webcam
            audio={false}
            width={600}
            height={500}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full"
          />
        </div>

        <Button
          onClick={capture}
          className="-mt-3 w-12 h-12 justify-self-center hover:scale-105"
        >
          <img
            src={captureIcon}
            alt=""
            className="w-full h-full object-cover"
          />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default WebCamCapture;

{
  /* {isCaptureEnable || (
        //camera svg
        <button
          disabled={multiSelect}
          onClick={() => setCaptureEnable(true)}
          className=" disabled:text-primary/70 w-8 h-8 text-primary disabled:cursor-not-allowed border-2 border-primary rounded-full disabled:border-primary/70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="48px"
            height="48px"
            fill="currentColor"
            className="w-full h-auto p-1.5"
          >
            <path d="M 19.265625 3 C 17.510922 3 15.879726 3.9224619 14.976562 5.4277344 L 13.433594 8 L 5.8183594 8 C 2.6180531 8 1.1842379e-15 10.618053 0 13.818359 L 0 36.183594 C 0 39.383104 2.6180531 42 5.8183594 42 L 44.183594 42 C 47.383104 42 50 39.381947 50 36.181641 L 50 13.818359 C 50 10.618053 47.381947 8 44.181641 8 L 36.566406 8 L 35.019531 5.421875 C 34.118597 3.9211502 32.492938 3 30.742188 3 L 19.265625 3 z M 25 12 C 32.168 12 38 17.832 38 25 C 38 32.168 32.168 38 25 38 C 17.832 38 12 32.168 12 25 C 12 17.832 17.832 12 25 12 z M 25 14 C 18.935 14 14 18.935 14 25 C 14 31.065 18.935 36 25 36 C 31.065 36 36 31.065 36 25 C 36 18.935 31.065 14 25 14 z M 25 16.5 C 29.687 16.5 33.5 20.313 33.5 25 C 33.5 29.687 29.687 33.5 25 33.5 C 20.313 33.5 16.5 29.687 16.5 25 C 16.5 20.313 20.313 16.5 25 16.5 z M 25 18.5 A 6.5 6.5 0 0 0 25 31.5 A 6.5 6.5 0 0 0 25 18.5 z" />
          </svg>
        </button>
      )}
      {isCaptureEnable && (
        <>
          <div>
            <button onClick={() => setCaptureEnable(false)}>end</button>
          </div>
          <div>
            <Webcam
              audio={false}
              width={600}
              height={500}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="w-3/4 m-auto"
            />
          </div>

          <button onClick={capture}>capture Image</button>
        </>
      )} */
}


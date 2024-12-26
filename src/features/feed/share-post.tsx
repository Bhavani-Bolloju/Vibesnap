import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import Clipboard from "./copy-to-clipboard";

import ShareDialogContent from "./share-dialog-content";

const SharePost = function () {
  const shareURL = "https://vibesnap-161224.web.app/";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit h-10 bg-gray-200 text-black hover:bg-gray-300 capitalize text-base self-end border border-white hover:shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            className="w-10 h-10"
          >
            <path d="M20.176,5.118c0.315-0.811-0.484-1.61-1.294-1.294L3.474,9.815C3.188,9.927,3,10.202,3,10.509v0 c0,0.298,0.177,0.567,0.451,0.684L10,14l2.807,6.549C12.924,20.823,13.193,21,13.491,21h0c0.307,0,0.582-0.188,0.694-0.475 L20.176,5.118z" />
          </svg>
          <span className="font-semibold font-karla">share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-karla font-extrabold text-2xl">
            Share posts
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ShareDialogContent shareURL={shareURL} />
        <h4 className="font-karla font-semibold text-lg capitalize">
          page link
        </h4>
        <DialogFooter className="bg-gray-100 text-center h-12 rounded-xl flex items-center justify-evenly sm:justify-evenly">
          <p className="font-kumbh-sans font-normal text-base text-primary/80">
            {shareURL}
          </p>
          <Clipboard shareURL={shareURL} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SharePost;

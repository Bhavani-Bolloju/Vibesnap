import {
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon
} from "react-share";

import ShareButton from "./share-button";

const ShareDialogContent = function ({ shareURL }: { shareURL: string }) {
  return (
    <div className="grid grid-cols-4 gap-y-8 mb-5">
      <ShareButton title="telegram">
        <TelegramShareButton url={shareURL} title="telegram">
          <TelegramIcon size={32} round></TelegramIcon>
        </TelegramShareButton>
      </ShareButton>
      <ShareButton title="Email">
        <EmailShareButton url={shareURL}>
          <EmailIcon size={32} round></EmailIcon>
        </EmailShareButton>
      </ShareButton>
      <ShareButton title="twitter">
        <TwitterShareButton url={shareURL}>
          <TwitterIcon size={32} round></TwitterIcon>
        </TwitterShareButton>
      </ShareButton>
      <ShareButton title="Reddit">
        <RedditShareButton url={shareURL}>
          <RedditIcon size={32} round></RedditIcon>
        </RedditShareButton>
      </ShareButton>
      <ShareButton title="whatsapp">
        <WhatsappShareButton url={shareURL}>
          <WhatsappIcon size={32} round></WhatsappIcon>
        </WhatsappShareButton>
      </ShareButton>
      <ShareButton title="facebook">
        <FacebookShareButton url={shareURL}>
          <FacebookIcon size={32} round></FacebookIcon>
        </FacebookShareButton>
      </ShareButton>
      <ShareButton title="linkedin">
        <LinkedinShareButton url={shareURL}>
          <LinkedinIcon size={32} round></LinkedinIcon>
        </LinkedinShareButton>
      </ShareButton>
      <ShareButton title="pinterest">
        <PinterestShareButton media="" url={shareURL}>
          <PinterestIcon size={32} round></PinterestIcon>
        </PinterestShareButton>
      </ShareButton>
    </div>
  );
};

export default ShareDialogContent;


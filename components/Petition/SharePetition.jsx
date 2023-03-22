import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Link from "next/link";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import {
  AiFillLinkedin,
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";

export default function SharePetition({ open, setOpen }) {
  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Please Share With Support </DialogHeader>
        <DialogBody divider>
          <div className="flex  px-6 justify-evenly items-center">
            <FacebookShareButton
              url={"https://www.facebook.com/next-share"}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              hashtag={"#nextshare"}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={"https://twitter.com/?lang=en/next-share"}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              hashtag={"#nextshare"}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <LinkedinShareButton
              url={"https://www.linkedin.com/feed/next-share"}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              hashtag={"#nextshare"}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <WhatsappShareButton
              url={"https://web.whatsapp.com//next-share"}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              hashtag={"#nextshare"}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </Fragment>
  );
}

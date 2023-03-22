import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import SharePetition from "./SharePetition";
import Link from "next/link";

export default function LikeToDonation({ openDonation, setOpenDonation }) {
  const handleOpen = () => setOpenDonation(!openDonation);
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Dialog open={openDonation} handler={handleOpen}>
        <DialogBody className="text-xl mb-6 font-semibold text-black text-center">
          Are you Like to Donation?
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" className="mr-1 text-center mx-auto">
            <Link href={"/donation"}>
              <span>Yes</span>
            </Link>
          </Button>
          <Button
            onClick={() => setOpen(true)}
            className="mr-1 text-center mx-auto bg-red text-white"
          >
            <span>No</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <SharePetition open={open} setOpen={setOpen} />
    </Fragment>
  );
}

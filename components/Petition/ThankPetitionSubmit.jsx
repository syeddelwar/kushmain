import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import LikeToDonation from "./LikeToDonation";
import logo from "../../img/logo.png";
import Image from "next/image";

export default function ThankPetitionSubmit({
  sumitPetitionSuccess,
  setSumitPetitionSuccess,
}) {
  const [openDonation, setOpenDonation] = useState(false);
  const handleOpen = () => {
    setOpenDonation(true);
    setSumitPetitionSuccess(!sumitPetitionSuccess);
  };
  return (
    <Fragment>
      <Dialog open={sumitPetitionSuccess} handler={handleOpen}>
        <DialogBody className="lg:text-xl text-lg mb-6 font-semibold text-black text-center">
          <Image
            className="text-center mx-auto mb-5"
            src={logo}
            width={150}
            height={150}
            alt="logo"
          />
          <span className="text-xl lg:text-2xl">
            Thank YOU FOR SUPPORT kingDom of Kush.
          </span>{" "}
          <br /> TOGETHER WE PROSPER. THE FUTURE IS NOW
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            onClick={handleOpen}
            className="mr-1 text-center mx-auto"
          >
            <span>Okay</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <LikeToDonation
        openDonation={openDonation}
        setOpenDonation={setOpenDonation}
      />
    </Fragment>
  );
}

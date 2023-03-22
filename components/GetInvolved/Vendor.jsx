import React from "react";
import styles from "../../styles/styles.module.css";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import Vendor_Contact from "./Vendor_Contact";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// connect stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function Vendor() {
  return (
    <section className="dark:bg-[#161519]  dark:text-[#ffffffbf]">
      <div className=" grid grid-cols-1 md:grid-cols-2   justify-items-center lg:justify-items-start  items-center ">
        <div className={` ${styles.vulunteerBg}  min-h-[36rem]    `}></div>

        <div className=" py-[4rem]  px-4 2xl:pl-[8rem] md:pl-[4rem] md:pr-8">
          <div className="content mb-[1.5rem] mt-4">
            <h1 className="leading-[3rem] dark:text-white  xl:hidden font-bold  text-[2.8rem] ">
              Volunteer Registration
            </h1>

            <h1 className="leading-[3rem] dark:text-white xl:leading-[5rem] hidden xl:block font-bold  text-[2.8rem] xl:text-[5.5rem]">
              Vendor Registration
            </h1>

            <p className=" font-base mt-12">
              Feel a new experience in an incredible project
            </p>
            <p className=" font-base font-bold">Kingdom of Kush</p>

            <Button className=" text-primary rounded-md shadow-none hover:shadow-none bg-black      normal-case mt-16">
              <Link href="#becomeaVendor">Become a Vendor</Link>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Elements stripe={stripePromise}>
          <Vendor_Contact id="becomeaVendor" />
        </Elements>
      </div>
    </section>
  );
}

export default Vendor;

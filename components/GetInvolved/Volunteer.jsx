import React from "react";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import Vulunteer_Contact from "./Vulunteer_Contact";
import styles from "../../styles/styles.module.css";

function Volunteer() {
  return (
    <section className="dark:bg-[#161519]  dark:text-[#ffffffbf]">
      <div className=" grid grid-cols-1 md:grid-cols-2   transition-all justify-items-center lg:justify-items-start  items-center ">
        <div className={` ${styles.vulunteerBg}  min-h-[36rem]   `}></div>
        <div className=" py-[4rem]  px-4 2xl:pl-[8rem] md:pl-[4rem] md:pr-8">
          <div className="content mb-[1.5rem] mt-4">
            <h1 className="leading-[3rem] dark:text-white xl:hidden font-bold  text-[2.8rem] ">
              Volunteer Registration
            </h1>

            <h1 className="leading-[3rem] dark:text-white xl:leading-[5rem] hidden xl:block font-bold  text-[2.8rem] xl:text-[5.5rem]">
              Volunteer Registration
            </h1>

            <p className=" font-base mt-12">
              Gain experience and do your part to contribute to an incredible{" "}
              <br /> and worthwhile global project.
            </p>

            <Button className=" text-primary rounded-md shadow-none hover:shadow-none bg-black      normal-case mt-16">
              {" "}
              <Link href="#becomeaVolunteer">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </div>
      <div id="becomeaVolunteer">
        <Vulunteer_Contact />
      </div>
    </section>
  );
}

export default Volunteer;

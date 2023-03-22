import React from "react";
import Image from "next/image";
import styles from "../../styles/styles.module.css";
// imports imgage
import about_2 from "../../img/aboutus/about-2-03-768x593.jpg";

function MoreInfo() {
  return (
    <section>
      <div className="dark:bg-[#161519] grid grid-cols-1 md:grid-cols-2    justify-items-center  lg:justify-items-end   ">
        <div className="py-[1rem] sm:py-[4rem]   pl-[1rem] 2xl:pl-[4rem] md:pr-[4rem]  2xl:pr-[8rem] px-4">
          <div className="content mb-[1.5rem] mt-4">
            <h4 className=" text-base dark:text-[#ffffffbf] uppercase">About us</h4>
            <h4 className=" dark:text-white  font-bold capitalize text-[2rem]">
              More Information
            </h4>
          </div>
          <Image src={about_2} height={500} width={500} alt="contact-info" />
        </div>

        <div
          className={` ${styles.moreInfoBg}  min-h-[25rem] relative  `}
        ></div>
      </div>
    </section>
  );
}

export default MoreInfo;

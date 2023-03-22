import React from "react";
import Image from "next/image";
import styles from "../../styles/styles.module.css";
// imports imgage
import contactInfo from "../../img/aboutus/about-1-copy-768x593.jpg";
import { BsIntersect } from "react-icons/bs";
import CountUp from "react-countup";
export default function BasicInfo() {
  return (
    <section>
      <div className="dark:bg-[#161519] grid grid-cols-1 md:grid-cols-2   justify-items-center lg:justify-items-start  items-center ">
        <div className={` ${styles.basicInfoBg}  min-h-[25rem] relative  `}>
          <div
            className="  h-[11rem] w-[17rem] md:w-[12rem] lg:h-[14rem] lg:w-[14rem]  flex  justify-start  
            
           xl:w-[19rem]
            bottom-0 left-0 md:right-0 md:left-auto absolute  bg-[#000]
         "
          >
            <div className=" text-base text-primary flex flex-col pl-[2rem] justify-center  ">
              <div className=" flex items-center  space-x-3">
                <BsIntersect className=" text-white text-[1.5rem]" />

                <p className=" text-[2rem] font-bold">
                  <CountUp start={0} end={2060} duration={5} delay={2} />+
                </p>
              </div>

              <p className=" text-base text-primary font-bold">
                Area <br />
                km2
              </p>
            </div>
          </div>
        </div>

        <div className="py-[1rem] sm:py-[4rem]  px-4 2xl:pl-[8rem] md:pl-[4rem] md:pr-8">
          <div className="content mb-[1.5rem] mt-4">
            <h4 className="dark:text-[#ffffffbf] text-base  uppercase">
              About us
            </h4>
            <h4 className=" dark:text-white  font-bold capitalize text-[2rem]">
              Basic Information
            </h4>
          </div>
          <Image
            src={contactInfo}
            height={500}
            width={500}
            alt="contact-info"
          />
        </div>
      </div>
    </section>
  );
}

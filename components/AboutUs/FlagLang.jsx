import React from "react";
import Image from "next/image";
import styles from "../../styles/styles.module.css";
import CountUp from "react-countup";
// imports imgage
import contactInfo from "../../img/aboutus/about-3-e1676065375680-768x465.webp";
import { BsIntersect } from "react-icons/bs";

function FlagLang() {
  return (
    <section>
      <div className=" grid grid-cols-1 md:grid-cols-2  dark:bg-[#161519] justify-items-center lg:justify-items-start  items-center ">
        <div className={` ${styles.flagLangfoBg}  min-h-[25rem] relative  `}>
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
                  <CountUp
                    start={0}
                    end={2060}
                    duration={5}
                    separator=","
                    decimals={0}
                  />
                  +
                </p>
              </div>

              <p className=" text-base text-primary font-bold">
                Area <br />
                km2
              </p>
            </div>
          </div>
        </div>

        <div className=" py-[4rem]  px-4 2xl:pl-[8rem] md:pl-[4rem] md:pr-8">
          <div className="content mb-[1.5rem] mt-4">
            <h4 className="dark:text-[#ffffffbf] text-base  uppercase">
              About us
            </h4>
            <h4 className=" dark:text-white  font-bold capitalize text-[2rem]">
              Flag & Languages
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

export default FlagLang;

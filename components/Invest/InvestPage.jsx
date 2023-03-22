import React from "react";
import bg from "../../img/invest.jpg";
import InvestForm from "./InvestForm";

function InvestPage() {
  return (
    <section>
      <div className=" grid grid-cols-1 md:grid-cols-2 dark:bg-[#161519]  space-x-10  lg:justify-items-start   ">
        <div
          className={`  min-h-[30rem]   bg-center w-[100%] `}
          style={{
            backgroundImage: `url(${bg.src})`,
            objectFit: "cover",
          }}
        ></div>

        <div className=" py-[4rem]  px-4 2xl:pl-[8rem] md:pl-[4rem] md:pr-8">
          <div className="content mb-[1.5rem] mt-4">
            <h1 className="leading-[3rem] xl:pr-[10rem] dark:text-white font-bold  text-[3.5rem] ">
              Invest into Project
            </h1>

            <p className="dark:text-[#ffffffbf] font-base mt-6 xl:pr-[8rem]">
              Through This Form, You Can Express Your Interest To Invest In The
              KUSH KINGDOM. Please Fill In The Form And We Shall Contact You.
            </p>
          </div>
        </div>
      </div>
      <InvestForm />
    </section>
  );
}

export default InvestPage;

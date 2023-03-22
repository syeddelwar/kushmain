import styles from "../../styles/styles.module.css";
import MemberShip_Contact from "./MemberShip_Contact";
// imports imgage

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import No_MemberShip from "./No_MemberShip";
// connect stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function MemberShips() {
  const [isMember, setIsMember] = useState("yes");
  const [showMember, setShowMember] = useState(false);
  console.log(showMember, isMember);

  const handleShowMember = () => {
    setShowMember(true);
  };

  return (
    <>
      <section className="dark:bg-[#161519]">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:justify-items-start  items-center bg-white dark:bg-[#161519] dark:text-[#ffffffbf] lg:pb-[70px] ">
            <div className={` ${styles.memberBg} min-h-[36rem] `}></div>
            <div className=" py-[4rem]  px-4 2xl:pl-[8rem] md:pl-[6rem] md:pr-8">
              <div className="content mb-[1.5rem] mt-4 lg:p-5">
                <h1 className="leading-[3rem] dark:text-white xl:hidden font-bold  text-[2.8rem] ">
                  Membership application.
                </h1>

                <h1 className=" dark:text-white leading-[1]  hidden xl:block font-bold text-[5rem] font-sans">
                  Membership <br /> application.
                </h1>
                <p className="font-base mt-12">
                  Feel a new experience in an incredible project
                </p>
                <p
                  className="font-base font-bold
            "
                >
                  Kingdom of Kush
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* application form */}
        <div className="p-[50px] mb-[20px] dark:bg-[#161519] bg-white lg:mx-[100px] shadow-2xl">
          <div className="flex flex-col justify-between gap-8 items-center pb-10">
            <h1 className=" text-[1.2rem] lg:text-[2rem] xl:text-[2.5rem]  leading-6 uppercase text-[#CB9833]">
              APPLICANT INFORMATION FORM
            </h1>
            <div className=" dark:text-[#ffffffbf]">
              <h2 className="font-bold">
                <strong>Please provide all responses in English.</strong>
              </h2>
              <p>Required fields are indicated by an asterisk *</p>
            </div>
          </div>

          <div
            className="relative flex lg:mx-[50px] dark:text-[#ffffffbf] border-b-4 justify-evenly
        "
          >
            <div className="flex flex-col justify-center  items-center">
              <p className="pb-3">Checkout</p>
              <span className="w-5 h-5 rounded-full bg-black absolute -bottom-3"></span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="pb-3">Finish</p>
              <span
                className={`w-5 h-5 rounded-full ${
                  showMember ? "bg-black" : "bg-black/20"
                } absolute -bottom-3`}
              ></span>
            </div>
          </div>
          {/* ////// */}
          {showMember && isMember === "yes" && (
            <div id="membership-contract">
              <Elements stripe={stripePromise}>
                <MemberShip_Contact setShowMember={setShowMember} />
              </Elements>
            </div>
          )}
          {showMember && isMember === "no" && (
            <div id="membership-contract">
              <Elements stripe={stripePromise}>
                <No_MemberShip setShowMember={setShowMember} />
              </Elements>
            </div>
          )}

          {!showMember && (
            <div className=" lg:mx-[50px]">
              <fieldset className="p-4">
                <div>
                  <legend className="text-sm dark:text-[#ffffffbf]">
                    You are a new member? *
                  </legend>
                </div>
                <div onChange={(e) => setIsMember(e.target.value)}>
                  <input
                    className=""
                    type="radio"
                    value={"yes"}
                    name="member"
                    checked={isMember === "yes"}
                  />
                  <label
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer rounded-l"
                    for="male"
                  >
                    Yes
                  </label>
                  <input
                    className=""
                    checked={isMember === "no"}
                    type="radio"
                    value={"no"}
                    name="member"
                  />
                  <label
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 cursor-pointer"
                    for="female"
                  >
                    No
                  </label>
                </div>
              </fieldset>
              <div className=" flex justify-end mt-6">
                <button
                  onClick={() => handleShowMember()}
                  className=" bg-black   shadow-none capitalize text-base hover:shadow-none w-[40%] xl:w-[20%]    font-normal text-white py-3"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default MemberShips;

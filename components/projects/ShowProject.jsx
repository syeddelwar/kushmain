import React from "react";
import bg from "../../img/Oji-String-Beans-Farm.jpg";
import PhoneInput from "react-phone-number-input";
const ShowProject = () => {
  return (
    <div className="dark:bg-[#161519] dark:text-[#ffffffbf]">
      <div className="py-8">
        <div className="container mx-auto p-3 ">
          <div className="flex-col flex mb-8 sm:mb-0 sm:flex-row items-center">
            <div className="grid grid-cols-1 md:grid-cols-2  mb-4">
              <div>
                <span className="text-[#cb9833]">Indonesia</span>
                <div>
                  <h1 className="font-semibold text-[44px] dark:text-white leading-[55px]">
                    Oji String Beans Farm
                  </h1>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center w-[15rem] sm:w-auto">
                <label
                  className="  font-bold  after:pl-1 block"
                  htmlFor="Category"
                >
                  Category
                </label>
                <select
                  // onChange={(e) => {
                  //   setPetition({ ...petition, AddressLine: e.target.value });
                  // }}
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500  text-base"
                >
                  <option>Agriculture</option>
                  <option>Farming</option>
                  <option>Fishing</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-black dark:text-white">
              Project Description:
            </h3>
            <p>
              The Project occupies _ Hectares/acres of land, of which __produces
              __ of _. The Harvest is ____ per year, totaling in ___
              Kilo/Tonns/bushles per harvest. The land is purchased /
              leased/etc. The implementation of this project resulted in _____
              for the region /country /etc
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-black dark:text-white">
              Kush Involvement:
            </h3>
            <p>
              KOK is involved as a partner/solitare invest/ humanitarian aid and
              provided ___ in monetary /equiqments/human resource /technology
              investement (one time/ ongoing/_ times per quater/year/etc)
              totaling to __ USD . KOK plans to ___within the next ____ (Any
              blockchain related monetization can be described here as well)
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-black dark:text-white">
              <span className="text-base">Next Steps</span> Machinery /Equipment
              /Suppier /Technology
            </h3>
          </div>
          <div>
            <img src={bg.src} />
          </div>
        </div>
        <div style={{ backgroundColor: "rgba(150, 144, 162, 0.06)" }}>
          <div className="my-8 pt-16 p-3 container mx-auto">
            <h4 className="text-[22px] font-semibold mb-5">Leave a replay</h4>
            <p className="mb-8 text-[15px]">
              Your email address will not be published. Required fields are
              marked *
            </p>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="flex flex-col">
                  <label className="mb-2 font-medium">Name *</label>
                  <input
                    className="px-3 py-3 focus:bg-[#c8c7c970] text-black transition-all"
                    type={"text"}
                    placeholder="Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 font-medium">Email *</label>
                  <input
                    className="px-3 py-3 focus:bg-[#c8c7c970] text-black transition-all"
                    type={"text"}
                    placeholder="Email"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 font-medium">Phone *</label>
                  {/* <input
                    className="px-3 py-3 focus:bg-[#c8c7c970] text-black transition-all"
                    type={"text"}
                    placeholder="Website"
                  /> */}
                  <PhoneInput
                    international
                    className=" py-3 rounded-sm  w-[100%] px-2  bg-white"
                    defaultCountry="RU"
                    // value={value}
                    // onChange={setValue}
                    //     onChange={(e) => setMembership({ ...membership, Number: e })}
                  />
                </div>
              </div>
              {/* <div className="flex items-center gap-3 my-4">
                <input type={`checkbox`} className="w-4 h-5 accent-black" />
                <p className="text-[15px]">
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </p>
              </div> */}
              {/* <div className="flex flex-col">
                <label className="font-medium mb-2">Comment</label>
                <textarea className="p-4"></textarea>
              </div> */}
              <div className="my-6">
                <button className="bg-black font-bold py-3 hover:bg-[#dc2828] transition px-4 rounded text-[#fff] text-[14px]">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProject;

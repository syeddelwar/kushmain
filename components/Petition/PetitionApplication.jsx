import React, { useRef, useState, useEffect, useContext } from "react";
import { browserName, osName, fullBrowserVersion } from "react-device-detect";
import { TfiReload } from "react-icons/tfi";
import SignatureCanvas from "react-signature-canvas";
import { petitionContext } from "@/context/PetitioContext";
import { Button } from "@material-tailwind/react";
// alart and messages
import useSweetAlert from "../lib/sweetalert2";
import SharePetition from "./SharePetition";
import PhoneInput from "react-phone-number-input";
import countryName from "../../public/country.json";
import ThankPetitionSubmit from "./ThankPetitionSubmit";
import { Country, State, City } from "country-state-city";

const PetitionApplication = () => {
  // showing alert
  const { showAlert } = useSweetAlert();
  const [sumitPetitionSuccess, setSumitPetitionSuccess] = useState(false);
  const [signatureText, setSignatureText] = useState(true);

  const [states, setStates] = useState("");
  const [cities, setCities] = useState("");
  const countryName = Country.getAllCountries();
  const showAlerts = () => {
    showAlert({
      text: "Your Petition Application Successfull!",
      icon: "success",
      confirmButtonText: "ClOSE",
      confirmButtonColor: "green",
      header: "hello",
    }).then((result) => {
      console.log(result);
    });
  };

  const sigPad = useRef();
  const currentDate = new Date();

  const { petition, setPetition, postpetitions, petitionInitial } =
    useContext(petitionContext);

  // set states
  useEffect(() => {
    const handleStates = () => {
      const allStates = State.getStatesOfCountry(petition?.Country);
      setStates(allStates);
    };
    // const
    handleStates();
  }, [petition?.Country]);
  // set cities
  useEffect(() => {
    const handleCities = () => {
      const allCities = City.getCitiesOfState(
        petition?.Country,
        petition?.State
      );
      setCities(allCities);
    };
    handleCities();
  }, [petition?.Country, petition?.State]);

  const [data, setData] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Get petition data items from Local Storage
      const userString = localStorage.getItem("pititonData");
      const pititonDatas = JSON.parse(userString);
      setData(pititonDatas);
      setPetition({
        ...petition,
        DeviceActivity: `
        Browser : ${browserName}
        Platfrom: ${osName}
        IP: ${fullBrowserVersion}
        Date : ${currentDate.toLocaleDateString()}
        `,
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postpetitions();
    localStorage.removeItem("pititonData");
    setPetition(petitionInitial);
    sigPad.current.clear();
    showAlerts();
    setSumitPetitionSuccess(true);
  };

  return (
    <div className="dark:bg-[#161519] dark:text-[#ffffffbf]">
      <div className=" container mx-auto py-[2rem] xl:mt-[2rem] xl:px-[4rem] px-[1rem] ">
        <div>
          <h1 className=" text-[1.5rem] font-bold mb-4 dark:text-white">
            Add your name to show your support for the campaign for action!
          </h1>
          <form action="submit" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-8 mb-5">
              <div>
                <label
                  className="  font-bold after:content-['*'] after:text-red  after:pl-1 block"
                  htmlFor="name"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="name"
                  readOnly
                  className=" py-3 rounded-sm  w-[100%] px-2 border-softGray border-[1px]"
                  required
                  value={data?.FirstName}
                />
                <p className=" text-sm mt-[1px] text-red invisible">
                  This field is required.
                </p>
              </div>
              <div>
                <label
                  className="  font-bold after:content-['*'] after:text-red  after:pl-1 block"
                  htmlFor="name"
                >
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  readOnly
                  className=" py-3 rounded-sm  w-[100%] px-2 border-softGray border-[1px]"
                  value={data?.LastName}
                />
              </div>
            </div>

            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-x-5 mb-5">
              <div>
                <label
                  className="  after:pl-1   font-bold after:content-['*'] after:text-red  block"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <PhoneInput
                  international
                  className=" py-3 rounded-sm  w-[100%] px-2 border  border-[#ededed]"
                  defaultCountry="RU"
                  // value={value}
                  // onChange={setValue}
                  onChange={(e) => setPetition({ ...petition, Number: e })}
                />
                {/* <input
                  required
                  type="number"
                  id="phoneNumber"
                  className=" py-3 rounded-sm  w-[100%] px-2 border-softGray border-[1px]"
                  value={petition.Phone}
                  onChange={(e) =>
                    setPetition({ ...petition, Phone: e.target.value })
                  }
                /> */}
                <p className=" invisible text-sm mt-[1px] text-red">
                  This field is required.
                </p>
              </div>
              <div c>
                <label
                  className="  after:pl-1   font-bold after:content-['*'] after:text-red  block"
                  htmlFor="zipCode"
                >
                  Email Address
                </label>
                <input
                  required
                  type="text"
                  placeholder="e-mail"
                  title="Please enter a your email"
                  id="zipCode"
                  readOnly
                  value={data?.Email}
                  className=" py-3 rounded-sm  w-[100%] px-2 border-softGray border-[1px]"
                />
                <p className=" invisible text-sm mt-[1px] text-red">
                  This field is required.
                </p>
              </div>
            </div>

            {/* ///////// */}
            <div className=" grid grid-cols-1 mb-5">
              <div>
                <label
                  className="  after:pl-1   font-bold after:content-['*'] after:text-red  block"
                  htmlFor="address_1"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="address_1"
                  className=" py-3 rounded-sm  w-[100%] px-2 border-softGray border-[1px]"
                  required
                  value={petition.StreetAddress}
                  onChange={(e) =>
                    setPetition({ ...petition, StreetAddress: e.target.value })
                  }
                />
              </div>
            </div>

            {/* ///////// */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 ">
              <div>
                <label
                  className="after:pl-1   font-bold   block"
                  htmlFor="address_1"
                >
                  Country
                </label>
                <select
                  id="countries"
                  value={petition.Country}
                  onChange={(e) =>
                    setPetition({ ...petition, Country: e.target.value })
                  }
                  className=" rounded-sm  border border-softGray focus:ring-blue-500  px-2 focus:border-softGray block w-full py-[.9rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#ededed] text-[#787676e8]"
                >
                  <option selected>Select country</option>

                  {countryName?.map((country, countryIndex) => (
                    <option key={countryIndex} value={country?.isoCode}>
                      {country?.name}
                    </option>
                  ))}
                </select>
                <p className=" text-sm mt-[1px] text-red invisible">
                  This field is required.
                </p>
              </div>

              <div>
                <label
                  className="after:pl-1   font-bold   block"
                  htmlFor="address_1"
                >
                  State/Province
                </label>
                <select
                  id="state"
                  value={petition.State}
                  onChange={(e) =>
                    setPetition({ ...petition, State: e.target.value })
                  }
                  className=" border  border-softGray text-gray-900 text-sm rounded-md focus:ring-blue-500  px-2 focus:border-softGray block w-full py-[.9rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Select State</option>
                  {states?.length > 0
                    ? states?.map((state, stateIndex) => (
                        <option key={stateIndex} value={state?.isoCode}>
                          {state?.name}
                        </option>
                      ))
                    : ""}
                </select>
                {/* <input
                  type="text"
                  placeholder="E.g New South Wales"
                  id="state"
                  value={petition.State}
                  onChange={(e) =>
                    setPetition({ ...petition, State: e.target.value })
                  }
                  className=" py-3 rounded-sm  border border-softGray  w-[100%] px-2 "
                /> */}
                <p className=" text-sm mt-[1px] text-red invisible">
                  This field is required.
                </p>
              </div>
              <div>
                <label
                  className="after:pl-1   font-bold   block"
                  htmlFor="address_1"
                >
                  City
                </label>
                <select
                  value={petition.City}
                  onChange={(e) =>
                    setPetition({ ...petition, City: e.target.value })
                  }
                  id="city"
                  className=" border  border-softGray text-gray-900 text-sm rounded-md focus:ring-blue-500  px-2 focus:border-softGray block w-full py-[.9rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Select City</option>
                  {cities?.length > 0
                    ? cities?.map((city, cityIndex) => (
                        <option key={cityIndex} value={city?.isoCode}>
                          {city?.name}
                        </option>
                      ))
                    : ""}
                </select>
                {/* <input
                  type="text"
                  placeholder="E.g sydney"
                  id="city"
                  className=" py-3 rounded-sm  border border-softGray  w-[100%] px-2 "
                  value={petition.City}
                  onChange={(e) =>
                    setPetition({ ...petition, City: e.target.value })
                  }
                /> */}
                <p className=" text-sm mt-[1px] text-red invisible">
                  This field is required.
                </p>
              </div>
              <div>
                <label
                  className="after:pl-1   font-bold   block"
                  htmlFor="address_1"
                >
                  Zip / Postal Code
                </label>
                <input
                  type="number"
                  placeholder="E.g 2000"
                  id="zipcode"
                  value={petition.PostalCode}
                  onChange={(e) =>
                    setPetition({ ...petition, PostalCode: e.target.value })
                  }
                  className=" py-3 rounded-sm  border border-softGray  w-[100%] px-2 "
                />
                <p className="text-sm mt-[1px] text-red invisible">
                  This field is required.
                </p>
              </div>
            </div>
            {/* ///////// */}

            {/* ///////// */}
            {/* <div className=" grid grid-cols-1 mb-5">
              <div className="mb-5">
                <label
                  className="after:pl-1 font-bold block mb-2 after:content-['*'] after:text-red"
                  htmlFor="message"
                >
                  Please Type Your Thought About Kingdom of Kush
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Please Type Your Thought About Kingdom of Kush"
                  rows="5"
                  cols="40"
                  required
                  value={petition.Message}
                  onChange={(e) =>
                    setPetition({ ...petition, Message: e.target.value })
                  }
                  className="border p-2 border-softGray w-[100%] rounded-sm  "
                ></textarea>
              </div>
            </div> */}

            <div className="grid grid-cols-1 mb-5">
              <div className="after:pl-1 flex  font-bold  w-full mb-4 ">
                Signature <span className="text-red">*</span>
                <button
                  onClick={() => setSignatureText(false)}
                  className={`ml-4 ${!signatureText && "text-primary"}`}
                >
                  Type{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setSignatureText(true)}
                  className={`ml-4 ${signatureText && "text-primary"}`}
                >
                  Draw{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                    />
                  </svg>
                </button>
              </div>
              {signatureText ? (
                <div className="relative">
                  <SignatureCanvas
                    ref={sigPad}
                    penColor="black"
                    dotSize={1}
                    throttle={50}
                    backgroundColor="#eeee"
                    canvasProps={{
                      className:
                        " cursor-crosshair h-[156px] w-full  mb-6  rounded-sm bg-[#e6e6e6]",
                    }}
                  />
                  <TfiReload
                    onClick={(e) => {
                      sigPad.current.clear();
                    }}
                    className=" absolute   top-[10px]    right-5  text-[1rem] font-bold cursor-pointer hover:text-black text-[#3a3a3a]"
                  />
                </div>
              ) : (
                <div>
                  <textarea
                    type="number"
                    placeholder="Enter your text"
                    // id="billing_zipcode"
                    className=" py-3 rounded-sm w-full px-2  bg-[#ededed]"
                    required
                    // value={membership.BillingPostalCode}
                    // onChange={(e) =>
                    //   setMembership({
                    //     ...membership,
                    //     BillingPostalCode: e.target.value,
                    //   })
                    // }
                    name=""
                    id=""
                    cols="18"
                    rows="5"
                  ></textarea>
                </div>
              )}
            </div>

            {/* ///////// */}
            {/* <div className=" grid grid-cols-1 mb-5">
              <label
                className="after:pl-1 font-bold block after:content-['*'] after:text-red"
                htmlFor="address_2"
              >
                Signature
              </label>
              <div className="mb-5">
                <div className="relative">
                  <SignatureCanvas
                    penColor="black"
                    dotSize={1}
                    throttle={50}
                    backgroundColor="#eeee"
                    ref={sigPad}
                    canvasProps={{
                      width: 500,
                      height: 156,
                      className:
                        " cursor-crosshair     mb-6  rounded-sm bg-[#e6e6e6]",
                    }}
                  />
                  <TfiReload
                    onClick={(e) => {
                      sigPad.current.clear();
                    }}
                    className=" absolute top-[10px]   left-[29rem] text-[1rem] font-bold cursor-pointer hover:text-black text-[#3a3a3a]"
                  />
                </div>
              </div>
            </div> */}

            {/* ///////// */}
            <div className=" grid grid-cols-1 mt-6">
              <button
                type="submit"
                className=" bg-black rounded-sm  shadow-none capitalize text-base hover:shadow-none w-[40%] xl:w-[20%]    font-normal text-primary py-3"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ThankPetitionSubmit
        sumitPetitionSuccess={sumitPetitionSuccess}
        setSumitPetitionSuccess={setSumitPetitionSuccess}
      />
    </div>
  );
};

export default PetitionApplication;

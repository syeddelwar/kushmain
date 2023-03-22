import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { petitionContext } from "@/context/PetitioContext";
import { Country, State, City } from "country-state-city";
const Petition_Contact = () => {
  const countryName = Country.getAllCountries();
  const [ip, setIp] = useState("");

  const { petition, setPetition, petitionInitial } =
    useContext(petitionContext);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const pititonData = {
      FirstName: petition.FirstName,
      LastName: petition.LastName,
      Email: petition.Email,
      Country: petition.Country,
    };
    console.log(pititonData.Country);
    localStorage.setItem("pititonData", JSON.stringify(pititonData));
    router.push("/petition_application");
  };

  // get visitor ip address
  const getIpAddress = async () => {
    try {
      const res = await fetch(`https://api.ipify.org/?format=json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (petition.Country) {
        setIp(data.ip);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("petition.Country", petition.Country);
  useEffect(() => {
    getIpAddress();
  }, [petition.Country]);

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <div>
        <label
          className="  font-bold  after:text-red  after:pl-1 block"
          htmlFor="name"
        >
          First Name
        </label>
        <input
          type="text"
          id="name"
          className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[2px]"
          required
          value={petition.FirstName}
          onChange={(e) => {
            setPetition({ ...petition, FirstName: e.target.value });
          }}
        />
        <p className=" text-sm mt-[1px] text-red invisible">
          This field is required.
        </p>
      </div>
      <div>
        <label className="  font-bold  after:pl-1 block" htmlFor="name">
          Last Name
        </label>
        <input
          type="text"
          id="name"
          className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[2px]"
          value={petition.LastName}
          onChange={(e) => {
            setPetition({ ...petition, LastName: e.target.value });
          }}
          required
        />
        <p className=" text-sm mt-[1px] text-red invisible">
          This field is required.
        </p>
      </div>
      <div>
        <label className="  font-bold  after:pl-1 block" htmlFor="Email">
          Email
        </label>
        <input
          type="email"
          id="Email"
          className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[2px]"
          required
          value={petition.Email}
          onChange={(e) => {
            setPetition({ ...petition, Email: e.target.value });
          }}
        />
        <p className=" text-sm mt-[1px] text-red invisible">
          This field is required.
        </p>
      </div>

      <div>
        <label className="  font-bold  after:pl-1 block" htmlFor="country">
          Country
        </label>
        <select
          onChange={(e) => {
            setPetition({ ...petition, Country: e.target.value });
          }}
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900  rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500  text-base"
        >
          <option defaultValue="Choose a Languge">Choose a Country</option>
          {countryName?.map((country, countryIndex) => (
            <option key={countryIndex} value={country?.isoCode}>
              {country?.name}
            </option>
          ))}
        </select>
        {/* <input
          type="text"
          id="address"
          className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[2px]"
          required
          value={petition.AddressLine}
          onChange={(e) => {
            setPetition({ ...petition, AddressLine: e.target.value });
          }}
        /> */}
        <p className=" text-sm mt-[1px] text-red invisible">
          This field is required.
        </p>
      </div>
      {ip ? (
        <div>
          <label className="  font-bold  after:pl-1 block">IP location</label>
          <input
            disabled
            type="text"
            value={ip ? ip : "Not found"}
            className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[2px]"
            // value={petition.Email}
            // onChange={(e) => {
            //   setPetition({ ...petition, Email: e.target.value });
            // }}
          />
          <p className=" text-sm mt-[1px] text-red invisible">
            This field is required.
          </p>
        </div>
      ) : (
        ""
      )}
      <div>
        <label className="block text-gray-500" htmlFor="remember">
          <input
            className="mr-6 leading-tight w-5 h-5 rounded-xl"
            type="checkbox"
            id="remember"
            name="remember"
            required
          />
          <span className="text-[18px]">
            Display my name and comment on this petition
          </span>
        </label>
      </div>
      <button className="cursor-pointer py-2 px-4 block mt-6 bg-red text-white font-bold w-full text-center rounded">
        Sign this petition
      </button>
    </form>
  );
};

export default Petition_Contact;

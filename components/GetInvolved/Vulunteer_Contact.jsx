import React, { useContext, useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { VolunteerContext } from "@/context/VolunteerContext";
import { Country, State, City } from "country-state-city";
// alart and messages
import useSweetAlert from "../lib/sweetalert2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
function Vulunteer_Contact() {

  const { volunteer, setVolunteer, postVolunteers, volunteerInitial } =
    useContext(VolunteerContext);


  const generateRandomNumber = () => {
    const min = 10000000;
    const max = 99999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const actualNum = `khusvulun${randomNumber}`;
    setVolunteer({ ...volunteer, RegistrationId: actualNum });
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);



  //showing alert
  const { showAlert } = useSweetAlert();

  // state
  const [states, setStates] = useState("");
  const [cities, setCities] = useState("");

  const countryName = Country.getAllCountries();

  const showAlerts = () => {
    showAlert({
      text: " Vulunteer Application is Successfull!",
      icon: "success",
      confirmButtonText: "ClOSE",
      confirmButtonColor: "green",
      header: "hello",
    }).then((result) => {
      console.log(result);
    });
  };

  

  // set states
  useEffect(() => {
    const handleStates = () => {
      const allStates = State.getStatesOfCountry(volunteer?.Country);
      setStates(allStates);
    };
    // const
    handleStates();
  }, [volunteer?.Country]);
  // set cities
  useEffect(() => {
    const handleCities = () => {
      const allCities = City.getCitiesOfState(
        volunteer?.Country,
        volunteer?.State
      );
      setCities(allCities);
    };
    handleCities();
  }, [volunteer?.Country, volunteer?.State]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postVolunteers();
    setVolunteer(volunteerInitial);
    showAlerts();
  };

  return (
    <div className=" container mx-auto py-[2rem] xl:mt-[2rem] xl:px-[4rem] px-[1rem] ">
      <div>
        <h1
          className=" text-[1.5rem] font-bold
          mb-4"
        >
          General Information
        </h1>
        <form action="submit" onSubmit={(e) => handleSubmit(e)}>
          {/* ///////// */}
          <div className=" grid grid-cols-2 gap-x-8 mb-6">
            <div>
              <label
                className=" font-bold after:content-['*'] after:text-red  after:pl-1 block"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                value={volunteer.FirstName}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, FirstName: e.target.value })
                }
                required
              />
              <p className=" text-sm mt-2">First</p>
              <p className=" text-sm mt-[1px] invisible warningMessage text-red  ">
                This field is required.
              </p>
            </div>
            <div>
              <label className="   invisible font-bold after:content-['*'] after:text-red  block">
                Name
              </label>
              <input
                required
                type="text"
                className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                value={volunteer.LastName}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, LastName: e.target.value })
                }
              />
              <p className=" text-sm mt-2">Last</p>
            </div>
          </div>

          {/* ///////// */}
          <div className=" grid grid-cols-1 lg:grid-cols-3 gap-x-5">
            <div>
              <label
                className="  font-bold after:content-['*'] after:text-red  after:pl-1 block"
                htmlFor="email"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                value={volunteer.Email}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, Email: e.target.value })
                }
              />
              <p className={`    text-sm mt-[1px]  invisible text-red`}>
                This field is required.
              </p>
            </div>
            <div>
              <label
                className="   after:pl-1 font-bold after:content-['*'] after:text-red  block"
                htmlFor="dateOfBirth"
              >
                Date of birth
              </label>
              <input
                required
                type="date"
                id="dateOfBirth"
                className="  py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                value={volunteer.DateofBirth}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, DateofBirth: e.target.value })
                }
              />
              <p className=" invisible text-sm mt-[1px] warningMessage text-red">
                This field is required.
              </p>
            </div>
            <div>
              <label
                className="  after:pl-1   font-bold after:content-['*'] after:text-red  block"
                htmlFor="phoneNumber"
              >
                Phone number
              </label>
              <PhoneInput
                international
                className=" py-3 rounded-sm  w-[100%] px-2  border-softGray border-[1px]"
                defaultCountry="RU"
                onChange={() => ""}
                // onChange={(e) =>
                //   setVolunteer({ ...volunteer, Phone: e.target.value })
                // }
              />
              {/* <input
                required
                type="tel"
                id="phoneNumber"
                className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                value={volunteer.Phone}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, Phone: e.target.value })
                }
              /> */}
              <p className=" invisible text-sm mt-[1px] warningMessage text-red">
                This field is required.
              </p>
            </div>
          </div>
          {/* ///////// */}
          <div className=" grid grid-cols-1">
            <div>
              <label className="  font-bold block" htmlFor="address_1">
                Address
              </label>
              <input
                type="text"
                id="address_1"
                className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                value={volunteer.AddressLine1}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, AddressLine1: e.target.value })
                }
              />

              <p className="  text-sm mt-[.5rem]">Address Line 1</p>
            </div>
          </div>
          {/* ///////// */}
          <div className=" grid grid-cols-1">
            <div>
              <label
                className=" invisible  font-bold block"
                htmlFor="address_2"
              >
                Address
              </label>
              <input
                type="text"
                id="address_2"
                className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                value={volunteer.AddressLine2}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, AddressLine2: e.target.value })
                }
              />

              <p className="  text-sm mt-[.5rem]">Address Line 2</p>
            </div>
          </div>
          {/* ///////// */}
          <div className=" grid grid-cols-2 gap-x-8">
            <div>
              <label
                className=" invisible  font-bold block"
                htmlFor="address_2"
              >
                Address
              </label>

              <select
                id="countries"
                className=" border  border-softGray text-gray-900 text-sm rounded-md focus:ring-blue-500  px-2 focus:border-softGray block w-full py-[.9rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={volunteer.Country}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, Country: e.target.value })
                }
              >
                <option selected>Choose a country</option>
                {countryName?.map((country, countryIndex) => (
                  <option key={countryIndex} value={country?.isoCode}>
                    {country?.name}
                  </option>
                ))}
              </select>

              <p className="  text-sm mt-[.5rem]">Country</p>
            </div>

            <div>
              <label
                className=" invisible  font-bold block"
                htmlFor="address_2"
              >
                Address
              </label>
              <select
                id="address_2"
                value={volunteer.State}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, State: e.target.value })
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
                id="address_2"
                className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                value={volunteer.State}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, State: e.target.value })
                }
              /> */}

              <p className="  text-sm mt-[.5rem]">State / Province / Region</p>
            </div>
          </div>
          {/* ///////// */}
          <div className=" grid grid-cols-2 gap-x-8">
            <div>
              <label
                className=" invisible  font-bold block"
                htmlFor="address_2"
              >
                Address
              </label>

              <select
                value={volunteer.City}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, City: e.target.value })
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
                className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                value={volunteer.City}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, City: e.target.value })
                }
              /> */}

              <p className="  text-sm mt-[.5rem]">City</p>
            </div>
            <div>
              <label
                className=" invisible  font-bold block"
                htmlFor="address_2"
              >
                Address
              </label>
              <input
                type="number"
                id="postalCode"
                className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                value={volunteer.PostalCode}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, PostalCode: e.target.value })
                }
              />

              <p className="  text-sm mt-[.5rem]">Postal Code</p>
            </div>
          </div>
          {/* ///////// */}
          <div className=" grid grid-cols-1 mt-8">
            <div>
              <label className="   font-bold block" htmlFor="skills">
                Skills
              </label>
              <textarea
                name="skills"
                id="skills"
                cols="30"
                rows="3"
                className=" border border-softGray w-[100%] px-2 rounded-md"
                value={volunteer.Skills}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, Skills: e.target.value })
                }
              ></textarea>
              <p className="  text-sm ">
                Please indicate areas to volunteer according to your skills
              </p>
            </div>
          </div>
          {/* ///////// */}
          <div className=" grid grid-cols-1 mt-8">
            <div>
              <label className="   font-bold block" htmlFor="areas">
                Areas of Interest
              </label>
              <textarea
                name="skills"
                id="areas"
                cols="30"
                rows="3"
                className=" border border-softGray w-[100%] px-2 rounded-md"
                value={volunteer.InterestAreas}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, InterestAreas: e.target.value })
                }
              ></textarea>
            </div>
          </div>
          {/* ///////// */}
          <div className=" grid grid-cols-1 mt-8">
            <div>
              <label
                className="  after:content-['*'] after:text-red after:pl-2  font-bold block"
                htmlFor="address_2"
              >
                Place of Interest
              </label>

              <select
                id="countries"
                className=" border  border-softGray text-gray-900 text-sm rounded-md focus:ring-blue-500  px-2 focus:border-softGray block w-full py-[.9rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={volunteer.InterestPlace}
                onChange={(e) =>
                  setVolunteer({ ...volunteer, InterestPlace: e.target.value })
                }
              >
                <option selected>Choose a country</option>
                <option value="Angola">Angola</option>
                <option value="Benin">Benin</option>
                <option value="Burkina Faso">Burkina Faso</option>
                <option value="DRC">DRC</option>
                <option value="Guinea">Guinea</option>
                <option value="Indonesia">Indonesia</option>
                <option value="Ivory Coast">Ivory Coast</option>
                <option value="Mali">Mali</option>
                <option value="Nigeria">Nigeria </option>
                <option value="Sudan">Sudan</option>
                <option value="Zimbabwe">Zimbabwe</option>
                <option value="New York">New York</option>
              </select>
            </div>
          </div>
          {/* ///////// */}
          <div className=" mt-6">
            <h1
              className=" text-[1.5rem] font-bold
          mb-4"
            >
              Emergency Information
            </h1>
            <div className=" grid grid-cols-2 gap-x-8 mb-6">
              <div>
                <label
                  className="  font-bold after:content-['*'] after:text-red  after:pl-1 block"
                  htmlFor="e_email"
                >
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="e_email"
                  className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                  value={volunteer.EmergencyEmail}
                  onChange={(e) =>
                    setVolunteer({
                      ...volunteer,
                      EmergencyEmail: e.target.value,
                    })
                  }
                />
                <p className=" text-sm mt-[1px] invisible warningMessage text-red">
                  This field is required.
                </p>
              </div>
              <div>
                <label
                  className="   font-bold after:content-['*'] after:text-red  block"
                  htmlFor="e_phone"
                >
                  Phone
                </label>
                <PhoneInput
                  international
                  className=" py-3 rounded-md  w-[100%] px-2 border-softGray border-[1px]"
                  defaultCountry="RU"
                  onChange={() => ""}
                  // onChange={(e) =>
                  //   setVolunteer({ ...volunteer, Phone: e.target.value })
                  // }
                />
                {/* <input
                  required
                  type="number"
                  id="e_phone"
                  
                  value={volunteer.EmergencyPhone}
                  onChange={(e) =>
                    setVolunteer({
                      ...volunteer,
                      EmergencyPhone: e.target.value,
                    })
                  }
                /> */}
              </div>
            </div>
          </div>
          {/* ///////// */}
          <div className=" grid grid-cols-1 mt-6">
            <Button
              type="submit"
              className=" bg-black rounded-md w-[40%] xl:w-[20%] shadow-none capitalize text-base hover:shadow-none   font-normal text-primary
            "
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Vulunteer_Contact;

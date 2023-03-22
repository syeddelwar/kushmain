import Image from "next/image";
import React, { useRef, useContext, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { TfiReload } from "react-icons/tfi";
import { MembershipContext } from "@/context/MembershipContext";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// alart and messages
import useSweetAlert from "../lib/sweetalert2";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Country, State, City } from "country-state-city";
const MemberShip_Contact = ({ setShowMember }) => {
  const sigPad = useRef();
  const [signatureText, setSignatureText] = useState(true);
  const [states, setStates] = useState("");
  const [cities, setCities] = useState("");
  const [billingStates, setBillingStates] = useState("");
  const [billingCities, setBillingCities] = useState("");
  const countryName = Country.getAllCountries();
  const billingCountryName = Country.getAllCountries();

  // showing alert
  const { showAlert } = useSweetAlert();

  const showAlerts = (email, ammount) => {
    showAlert({
      title: `title`,
      html: `  <div>
       <div style="display:flex; justify-content: space-between; padding:2 3rem;   ">
       <h5>Pyament type</h5>
       <h5 style="color:#000">Card</h5>
       </div>
       <div style="display:flex; justify-content: space-between; padding:2 3rem;   ">
       <h5>Email</h5>
       <h5 style="color:#000">${email}</h5>
       </div>
       <div style="display:flex; justify-content: space-between; padding:2 3rem; margin:2rem 0;  ">
       <h5 style="font-weight:bold;">Amount Paid</h5>
       <h5 style="color:#000">$${ammount / 100}</h5>
       </div>

    </div>`,
      icon: "success",
      confirmButtonText: "ClOSE",
      confirmButtonColor: "green",
      header: "hello",
    }).then((result) => {
      console.log(result);
    });
  };

  const { membership, setMembership, postMembership, membershipInitial } =
    useContext(MembershipContext);

  const [cardError, setCardError] = useState(null);
  const [button, setButton] = useState(false);
  console.log(membership?.State);

  // set states
  useEffect(() => {
    const handleStates = () => {
      const allStates = State.getStatesOfCountry(membership?.Country);
      setStates(allStates);
    };
    // const
    handleStates();
  }, [membership?.Country]);
  // set cities
  useEffect(() => {
    const handleCities = () => {
      const allCities = City.getCitiesOfState(
        membership?.Country,
        membership?.State
      );
      setCities(allCities);
    };
    handleCities();
  }, [membership?.Country, membership?.State]);
  // billing states
  useEffect(() => {
    const handleStates = () => {
      const allStates = State.getStatesOfCountry(membership?.BillingCountry);
      setBillingStates(allStates);
    };
    // const
    handleStates();
  }, [membership?.BillingCountry]);
  // billing cities
  useEffect(() => {
    const handleCities = () => {
      const allCities = City.getCitiesOfState(
        membership?.BillingCountry,
        membership?.BillingState
      );
      setBillingCities(allCities);
    };
    handleCities();
  }, [membership?.BillingCountry, membership?.BillingState]);

  useEffect(() => {
    if (membership.CardInfo != "") {
      postMembership();
      return;
    }
  }, [membership.CardInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (elements.getElement("card") != null) {
      if (membership.MemberhipPlan === "month") {
        createMonthlySubscription();
        return;
      } else if (membership.MemberhipPlan === "year") {
        createYearlySubscription();
        return;
      }
      return;
    }
  };

  const stripe = useStripe();
  // to access card element
  const elements = useElements();

  const createYearlySubscription = async () => {
    try {
      if (elements.getElement("card") === null) return;

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card"),
      });

      if (error) {
        setCardError(error);
        return;
      }

      const url = sigPad.current.toDataURL();
      setMembership({ ...membership, Signature: url });

      setCardError(null);

      const res = await fetch(`/api/yearlysubscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: membership.Name,
          email: membership.Email,
          amount: 120,
          paymentMethod: paymentMethod.id,
        }),
      });

      if (!res.ok) return alert("Payment unsuccessfull!");

      const data = await res.json();

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(data.clientSecret);

      setButton(true);

      if (confirmError) return alert("Payment unsuccessfull!");

      setMembership({
        ...membership,
        CardInfo: `Amount: $${paymentIntent.amount / 100}  \n ClientSecret: ${
          paymentIntent.client_secret
        }`,
      });
      showAlerts(membership.Email, paymentIntent.amount);
      // send mail
      const sendmail = await fetch(`/api/emails/membershipemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: membership.Email,
          subject: `Your  120$ Yarly Donation`,
          message: "Your Yarly Donation is Succefully actived!",
          ammount: 120,
        }),
      });

      if (!sendmail.ok) return;

      // adtive button
      setButton(false);
      // clear singpad
      sigPad.current.clear();
      // clear card
      elements.getElement(CardElement).clear();
      // show alart
      setMembership(membershipInitial);
    } catch (err) {
      console.error(err);
      alert("Payment Faild!" + err.message);
    }
  };

  const createMonthlySubscription = async () => {
    try {
      if (elements.getElement("card") === null) return;

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement("card"),
      });

      if (error) {
        setCardError(error);
        return;
      }

      const url = sigPad.current.toDataURL();
      // setMembership({ ...membership, Signature: url });

      setCardError(null);

      const res = await fetch(`/api/monthlysubscripton`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: membership.Name,
          email: membership.Email,
          amount: 10,
          paymentMethod: paymentMethod.id,
        }),
      });

      if (!res.ok) return alert("Payment unsuccessfull!");

      const data = await res.json();
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(data.clientSecret);

      setButton(true);

      if (confirmError) return alert("Payment unsuccessfull!");
      console.log(confirmError);

      setMembership({
        ...membership,
        CardInfo: `Amount: $${paymentIntent.amount / 100}  \n ClientSecret: ${
          paymentIntent.client_secret
        }`,
      });

      showAlerts(membership.Email, paymentIntent.amount);
      // send mail
      const sendmail = await fetch(`/api/emails/membershipemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: membership.Email,
          subject: `Your  $10 Monthly Donation`,
          message: "Your Monthly Donation is Succefully actived!",
          ammount: 10,
        }),
      });

      if (!sendmail.ok) return;

      // adtive button
      setButton(false);
      // clear singpad
      sigPad.current.clear();
      // clear card
      elements.getElement(CardElement).clear();
      // show alart
      setMembership(membershipInitial);
    } catch (err) {
      console.error(err);
      alert("Payment Faild!" + err.message);
    }
  };

  return (
    <div className="lg:mx-[50px] my-[3rem]">
      <div className="w-full">
        <h1 className="text-[34px] dark:text-white">PERSONAL INFORMATION</h1>
      </div>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 dark:bg-[#878688] gap-x-8 mb-5 bg-[#fbfbfb] px-6 py-5 border-l-[6px] rounded-l-2xl border-[#ededed]">
          <div>
            <input
              type="text"
              placeholder="Prof."
              id="name"
              className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
              value={membership.Title}
              onChange={(e) =>
                setMembership({ ...membership, Title: e.target.value })
              }
              required
            />
            <p className=" text-sm mt-[1px] text-red invisible">
              This field is required.
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="First (Given) Name"
              id="fname"
              className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
              value={membership.FirstName}
              onChange={(e) =>
                setMembership({ ...membership, FirstName: e.target.value })
              }
              required
            />
            <p className=" text-sm mt-[1px] text-red invisible">
              This field is required.
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Middle Name"
              id="mname"
              className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
              value={membership.MiddleName}
              onChange={(e) =>
                setMembership({ ...membership, MiddleName: e.target.value })
              }
              required
            />
            <p className=" text-sm mt-[1px] text-red invisible">
              This field is required.
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Family Name (Last Name"
              id="fname"
              className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
              required
              value={membership.FamilyLastName}
              onChange={(e) =>
                setMembership({ ...membership, FamilyLastName: e.target.value })
              }
            />
            <p className=" text-sm mt-[1px] text-red invisible">
              This field is required.
            </p>
          </div>
        </div>

        {/* ///////////// */}
        <div className="bg-[#fbfbfb] dark:bg-[#878688] px-6 py-5 border-l-[6px] rounded-l-2xl border-[#ededed] mb-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 ">
            <div>
              <input
                type="email"
                placeholder="E.g. john@doe.com"
                id="email"
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                required
                value={membership.Email}
                onChange={(e) =>
                  setMembership({ ...membership, Email: e.target.value })
                }
              />
              <p className=" text-sm mt-[1px] text-red invisible">
                This field is required.
              </p>
            </div>
            <div>
              <PhoneInput
                international
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                defaultCountry="RU"
                // value={value}
                // onChange={setValue}
                onChange={(e) => setMembership({ ...membership, Number: e })}
              />
              {/* <input
                type="number"
                placeholder="Phone Number"
                id="tel"
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                required
                value={membership.Number}
                onChange={(e) =>
                  setMembership({ ...membership, Number: e.target.value })
                }
              /> */}
              <p className=" text-sm mt-[1px] text-red invisible">
                This field is required.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-8 ">
            <div>
              <label
                className="  after:pl-1   font-bold after:content-['*'] after:text-red  block"
                htmlFor="address_1"
              >
                Street Address
              </label>
              <input
                type="text"
                placeholder="E.g 42 Wallaby Way"
                id="address_1"
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                required
                value={membership.StreetAddress}
                onChange={(e) =>
                  setMembership({
                    ...membership,
                    StreetAddress: e.target.value,
                  })
                }
              />
              <p className=" text-sm mt-[1px] text-red invisible">
                This field is required.Please enter the street address.
              </p>
            </div>
            <div>
              <label
                className="  after:pl-1   font-bold   block"
                htmlFor="address_1"
              >
                Apartment, suite, etc
              </label>
              <input
                type="text"
                placeholder="Apertment"
                id="fname"
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                value={membership.Apartment}
                onChange={(e) =>
                  setMembership({ ...membership, Apartment: e.target.value })
                }
              />
              <p className=" text-sm mt-[1px] text-red invisible">
                This field is required.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 ">
            <div>
              <label
                className="after:pl-1   font-bold   block"
                htmlFor="address_1"
              >
                Country
              </label>
              <select
                value={membership.Country}
                onChange={(e) =>
                  setMembership({ ...membership, Country: e.target.value })
                }
                id="countries"
                className=" bg-[#ededed] rounded-sm focus:ring-blue-500  px-2 focus:border-softGray block w-full py-[.9rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#ededed] text-[#787676e8]"
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
                value={membership.State}
                onChange={(e) =>
                  setMembership({ ...membership, State: e.target.value })
                }
                id="state"
                className=" bg-[#ededed] rounded-sm focus:ring-blue-500  px-2 focus:border-softGray block w-full py-[.9rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#ededed] text-[#787676e8]"
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
                id="city"
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                value={membership.State}
                onChange={(e) =>
                  setMembership({ ...membership, State: e.target.value })
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
                City
              </label>
              <select
                value={membership.City}
                onChange={(e) =>
                  setMembership({ ...membership, City: e.target.value })
                }
                id="city"
                className=" bg-[#ededed] rounded-sm focus:ring-blue-500  px-2 focus:border-softGray block w-full py-[.9rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#ededed] text-[#787676e8]"
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
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                value={membership.City}
                onChange={(e) =>
                  setMembership({ ...membership, City: e.target.value })
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
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                value={membership.PostalCode}
                onChange={(e) =>
                  setMembership({ ...membership, PostalCode: e.target.value })
                }
              />
              <p className="text-sm mt-[1px] text-red invisible">
                This field is required.
              </p>
            </div>
          </div>
        </div>
        {/* Selected plan */}
        <div className="bg-[#fbfbfb] dark:bg-[#878688] px-6 py-5 border-l-[6px] rounded-l-2xl border-[#ededed] mb-5">
          <div className="grid grid-cols-1 gap-x-8">
            <div className="">
              <legend className="text-[#777771] pb-1">Membership plan</legend>

              <div className="flex">
                <input
                  type="radio"
                  id="time1"
                  name="time"
                  value="month"
                  // checked = { membership.MemberhipPlan === "month"? "true":"false"}
                  className="mr-2 w-5 h-5  accent-black"
                  onChange={(e) =>
                    setMembership({
                      ...membership,
                      MemberhipPlan: e.target.value,
                    })
                  }
                />

                <label hmtlFor="time1" className="mr-4">
                  Monthly
                </label>

                <input
                  type="radio"
                  id="time2"
                  name="time"
                  value="year"
                  // checked = { membership.MemberhipPlan === "year"? "true":"false"}
                  className="mr-2 w-5 h-5  accent-black"
                  onChange={(e) =>
                    setMembership({
                      ...membership,
                      MemberhipPlan: e.target.value,
                    })
                  }
                />
                <label hmtlFor="time2">Yearly</label>
              </div>
            </div>
            <div className="pt-10 pb-2">
              <h6 className="text-[#777771]">Price</h6>
              <p className="text-[18px] text-[#191f23] ">
                {membership.MemberhipPlan === "month"
                  ? " Currency Price 10$ / Monthly"
                  : " Currency Price 120$ / Yearly"}
              </p>
            </div>
          </div>
        </div>
        {/* payment card */}
        <div className="">
          <CardElement className=" border p-3  border-softGray rounded-md" />
          <p
            className={` text-sm mt-[1px] text-red ${
              cardError?.message != "" ? "visible" : "invisible"
            } `}
          >
            {cardError?.message}
          </p>
        </div>
        {/* /////Billing Information////// */}
        <p className="py-2  dark:text-[#ffffffbf]">Billing address</p>
        <div className="bg-[#fbfbfb] dark:bg-[#878688] px-6 py-5 border-l-[6px] rounded-l-2xl border-[#ededed] mb-5">
          <div className="grid grid-cols-1 gap-x-8 ">
            <div>
              <label
                className="  after:pl-1 text-[#777771]  block"
                htmlFor="address_1"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="E.g. John Doe"
                id="billing_name"
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                required
                value={membership.BillingName}
                onChange={(e) =>
                  setMembership({ ...membership, BillingName: e.target.value })
                }
              />
              <p className=" text-sm mt-[1px] text-red invisible">
                This field is required.
              </p>
            </div>
            <div>
              <label
                className="  after:pl-1 text-[#777771] after:content-['*'] after:text-red  block"
                htmlFor="address_1"
              >
                Street Address
              </label>
              <input
                type="text"
                placeholder="E.g. 42 Wallaby Way"
                id="billing_address_1"
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                required
                value={membership.BillingAddress}
                onChange={(e) =>
                  setMembership({
                    ...membership,
                    BillingAddress: e.target.value,
                  })
                }
              />
              <p className=" text-sm mt-[1px] text-red invisible">
                This field is required.
              </p>
            </div>
            <div>
              <label
                className="  after:pl-1 text-[#777771]  block"
                htmlFor="address_1"
              >
                Apartment, suite, etc
              </label>
              <input
                type="text"
                placeholder=""
                id="billing_address_2"
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                required
                value={membership.BillingApartment}
                onChange={(e) =>
                  setMembership({
                    ...membership,
                    BillingApartment: e.target.value,
                  })
                }
              />
              <p className=" text-sm mt-[1px] text-red invisible">
                This field is required.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 ">
            <div>
              <label
                className="after:pl-1 text-[#777771] font-bold block"
                htmlFor="billing_select_country"
              >
                Country
              </label>
              <select
                id="countries"
                className=" bg-[#ededed] rounded-sm focus:ring-blue-500  px-2 focus:border-softGray block w-full py-[.9rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#ededed] text-[#787676e8]"
                value={membership.BillingCountry}
                required
                onChange={(e) =>
                  setMembership({
                    ...membership,
                    BillingCountry: e.target.value,
                  })
                }
              >
                <option selected>Select country</option>
                {billingCountryName?.map((country, countryIndex) => (
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
                className="  after:pl-1 text-[#777771]  block"
                htmlFor="billing_state"
              >
                State/Province
              </label>
              <select
                required
                value={membership.BillingState}
                onChange={(e) =>
                  setMembership({ ...membership, BillingState: e.target.value })
                }
                id="billing_state"
                className=" bg-[#ededed] rounded-sm focus:ring-blue-500  px-2 focus:border-softGray block w-full py-[.9rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#ededed] text-[#787676e8]"
              >
                <option selected>Select State</option>
                {billingStates?.length > 0
                  ? billingStates?.map((state, stateIndex) => (
                      <option key={stateIndex} value={state?.isoCode}>
                        {state?.name}
                      </option>
                    ))
                  : ""}
              </select>
              {/* <input
                type="text"
                placeholder="E.g New South Wales"
                id="billing_state"
                className="py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                required
                value={membership.BillingState}
                onChange={(e) =>
                  setMembership({ ...membership, BillingState: e.target.value })
                }
              /> */}
              <p className=" text-sm mt-[1px] text-red invisible">
                This field is required.Please enter the city.
              </p>
            </div>
            <div>
              <label
                className="  after:pl-1 text-[#777771]  block"
                htmlFor="billing_city"
              >
                City
              </label>
              <select
                id="billing_city"
                value={membership.BillingCity}
                onChange={(e) =>
                  setMembership({ ...membership, BillingCity: e.target.value })
                }
                className=" bg-[#ededed] rounded-sm focus:ring-blue-500  px-2 focus:border-softGray block w-full py-[.9rem]  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-[#ededed] text-[#787676e8]"
              >
                <option selected>Select City</option>
                {billingCities?.length > 0
                  ? billingCities?.map((city, cityIndex) => (
                      <option key={cityIndex} value={city?.isoCode}>
                        {city?.name}
                      </option>
                    ))
                  : ""}
              </select>
              {/* <input
                type="text"
                placeholder="E.g Sydney"
                id="billing_city"
                className="py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                required
                value={membership.BillingCity}
                onChange={(e) =>
                  setMembership({ ...membership, BillingCity: e.target.value })
                }
              /> */}
              <p className=" text-sm mt-[1px] text-red invisible">
                This field is required.Please enter the city.
              </p>
            </div>
            <div>
              <label
                className="  after:pl-1 text-[#777771]  block"
                htmlFor="billing_zipcode"
              >
                ZIP / Postal Code
              </label>
              <input
                type="number"
                placeholder="E.g 2000"
                id="billing_zipcode"
                className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
                required
                value={membership.BillingPostalCode}
                onChange={(e) =>
                  setMembership({
                    ...membership,
                    BillingPostalCode: e.target.value,
                  })
                }
              />
              <p className=" text-sm mt-[1px] text-red invisible">
                This field is required.Please enter the city.
              </p>
            </div>

            <label className="w-full">
              <input type="checkbox" required className="mr-2" /> Yes, I agree
              with the{" "}
              <span className="text-[#cb9833] cursor-pointer">
                privacy policy
              </span>{" "}
              and{" "}
              <span className="text-[#cb9833] cursor-pointer">
                terms and conditions
              </span>
              .
            </label>
          </div>
        </div>

        {/* ///////// */}
        <div className="lg:grid flex flex-col-reverse lg:grid-cols-2 mt-6">
          <div>
            <div className="border border-[#d3d3d3] dark:bg-[#878688] bg-[#f9f9f9] shadow flex w-[300px] h-[100px] justify-center items-center ">
              <label className="w-full px-4 flex ">
                <input type="checkbox" className="w-5 h-5 mr-2" /> I'm not a
                robot
              </label>
              <Image
                className="my-4"
                src="https://i.ibb.co/Xk6skZp/icons8-captcha-58.png"
                alt="Picture of the recapcha"
                width={60}
                height={60}
              />
            </div>
          </div>
          <div>
            {/* // Signature field  */}

            <div className="after:pl-1 flex  font-bold  w-full mb-4 ">
              Signature <span className="text-red">*</span>
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
            </div>

            {signatureText ? (
              <div className="relative w-[100%] h-full">
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
                  className=" py-3 rounded-sm  w-[100%] px-2  bg-[#ededed]"
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
                  cols="10"
                  rows="5"
                ></textarea>
              </div>
            )}
          </div>
        </div>

        {/* ///////// */}
        <div className=" flex justify-between mt-6">
          <button
            onClick={() => setShowMember(false)}
            className=" bg-black shadow-none capitalize text-base hover:shadow-none w-[40%] xl:w-[20%]    font-normal text-white py-3"
          >
            Previous
          </button>
          <button
            disabled={button}
            type="submit"
            className=" bg-black   shadow-none capitalize text-base hover:shadow-none w-[40%] xl:w-[20%]    font-normal text-white py-3"
          >
            Submit application
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberShip_Contact;
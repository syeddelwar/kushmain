import Image from "next/image";
import React, { useRef, useContext, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { TfiReload } from "react-icons/tfi";
import { MembershipContext } from "@/context/MembershipContext";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// alart and messages
import useSweetAlert from "../lib/sweetalert2";

const No_MemberShip = ({ setShowMember }) => {
  const sigPad = useRef();

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
        <h1 className="text-[34px]">PERSONAL INFORMATION</h1>
      </div>
      <form action="submit">
        {/* /////Billing Information////// */}
        <p className="py-2">Billing address</p>
        <div className="bg-[#fbfbfb] px-6 py-5 border-l-[6px] rounded-l-2xl border-[#ededed] mb-5">
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
          </div>
        </div>

        {/* ///////// */}
        <div className="lg:grid flex flex-col-reverse lg:grid-cols-2 mt-6">
          <div>
            <div className="border border-[#d3d3d3] bg-[#f9f9f9] shadow flex w-[300px] h-[100px] justify-center items-center ">
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

            <label
              className="after:pl-1 font-bold block after:content-['*'] mb-4 after:text-red"
              htmlFor="address_2"
            >
              Signature
            </label>

            <div className="relative w-[100%] h-full">
              <SignatureCanvas
                penColor="black"
                dotSize={1}
                throttle={50}
                backgroundColor="#eeee"
                ref={sigPad}
                canvasProps={{
                  className:
                    " cursor-crosshair h-[156px] w-full  mb-6  rounded-sm bg-[#e6e6e6]",
                }}
              />
              <TfiReload
                onClick={(e) => {
                  sigPad.current.clear();
                }}
                className=" absolute   top-[10px]  right-5 text-[1rem] font-bold cursor-pointer hover:text-black text-[#3a3a3a]"
              />
            </div>
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

export default No_MemberShip;

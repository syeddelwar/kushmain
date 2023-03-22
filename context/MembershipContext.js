import { createContext, useState } from "react";
import { API_URL, API_TOKEN } from "@/config/index";
export const MembershipContext = createContext();

export const MembershipProvider = ({ children }) => {
  
  const membershipInitial = {
    Title: "",
    FirstName: "",
    MiddleName: "",
    FamilyLastName: "",
    Email: "",
    Number: "",
    StreetAddress: "",
    Apartment: "",
    State: "",
    City: "",
    PostalCode: "",
    Country: "",
    MemberhipPlan: "month",
    CardInfo: "",
    BillingName: "",
    BillingAddress: "",
    BillingApartment: "",
    BillingCity: "",
    BillingState: "",
    BillingPostalCode: "",
    BillingCountry: "",
    RegistrationId: null,
    // Signature: "",
  };

  const [membership, setMembership] = useState(membershipInitial);




  const postMembership = async () => {
    try {
      const res = await fetch(`${API_URL}/api/memberhip-plans`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: API_TOKEN,
        },

        body: JSON.stringify({
          data: {
            ...membership,
          },
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MembershipContext.Provider
      value={{ membership, setMembership, postMembership, membershipInitial }}
    >
      {children}
    </MembershipContext.Provider>
  );
};

import { createContext, useEffect, useState } from "react";
import { API_URL, API_TOKEN } from "@/config/index";

export const vendorContext = createContext();

export const VendorProvider = ({ children }) => {
  const vendorInitial = {
    FirstName: "",
    LastName: "",
    Email: "",
    DateofBirth: "",
    Phone: "",
    AddressLine1: "",
    AddressLine2: "",
    City: "",
    State: "",
    PostalCode: "",
    Country: "",
    Skills: "",
    InterestAreas: "",
    CardInfo: "",
    BillingFirstName: "",
    BillingLastName: "",
    BillingAdressline1: "",
    BillingAdressline2: "",
    BillingCity: "",
    BillingState: "",
    BillingPostal: "",
    BillingCountry: "",
    RegistrationId: null,
  };

  const [vendor, setVendor] = useState(vendorInitial);

  const postVendor = async () => {
    try {
      const res = await fetch(`${API_URL}/api/vendors`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: API_TOKEN,
        },

        body: JSON.stringify({
          data: {
            ...vendor,
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
    <vendorContext.Provider
      value={{ vendor, setVendor, vendorInitial, postVendor }}
    >
      {children}
    </vendorContext.Provider>
  );
};

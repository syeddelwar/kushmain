import { createContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { API_URL, API_TOKEN } from "@/config/index";

export const petitionContext = createContext();

export const PetitionProvider = ({ children }) => {
  const router = useRouter();

  const petitionInitial = {
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    AddressLine: "",
    StreetAddress: "",
    City: "",
    State: "",
    PostalCode: "",
    Country: "",
    Message: "",
    RegistrationId: "",
    DeviceRecentActivitys: {
      IpAddress: "",
      BrowserName: "",
      DeviceName: "",
      OperatingSystemName: "",
      Locations: "USA",
      Date: "",
    },
  };

  const [petition, setPetition] = useState(petitionInitial);

  const sendMailpetitions = async () => {
    try {
      const res = await fetch(`/api/emails/petitionemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: petition.Email,
          subject: "Petition Application",
        }),
      });

      const data = await res.json();

      // router.push(`/donation`);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postpetitions = async () => {
    try {
      const res = await fetch(`${API_URL}/api/petitions`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: API_TOKEN,
        },

        body: JSON.stringify({
          data: {
            data: { ...petition },
          },
        }),
      });

      const data = await res.json();
      console.log(data);
      sendMailpetitions();
      if (!res.ok) return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <petitionContext.Provider
      value={{
        petition,
        setPetition,
        postpetitions,
        petitionInitial,
        sendMailpetitions,
      }}
    >
      {children}
    </petitionContext.Provider>
  );
};

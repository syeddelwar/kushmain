import { createContext, useEffect, useState } from "react";
import { API_URL, API_TOKEN } from "@/config/index";
export const VolunteerContext = createContext();

export const VolunteerProvider = ({ children }) => {
  const volunteerInitial = {
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
    InterestPlace: "",
    EmergencyEmail: "",
    EmergencyPhone: "",
    RegistrationId: null,
  };

  const [volunteer, setVolunteer] = useState(volunteerInitial);

  const sendMailVolunteers = async () => {
    try {
      
      const res = await fetch(`/api/emails/vendoremail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: volunteer.Email,
          subject: "Volunteer Application",
          message: `Thank you so much ${volunteer.FirstName} for volunteering , Your willingness to give your time and service is greatly appreciated. Your support of allows us to continue to fulfill our mission and serve people in our community each year.`,
        }),
      });

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postVolunteers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/volunteers`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: API_TOKEN,
        },

        body: JSON.stringify({
          data: {
            ...volunteer,
          },
        }),
      });

      const data = await res.json();
      console.log(data);
      sendMailVolunteers();
      if (!res.ok) return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VolunteerContext.Provider
      value={{ volunteer, setVolunteer, postVolunteers, volunteerInitial }}
    >
      {children}
    </VolunteerContext.Provider>
  );
};

// AddressLine1: "fasf",
// AddressLine2: "asf",
// City: "saf",
// Country: "CA",
// DateofBirth: "2023-03-02",
// Email: "rabbim74@gmail.com",
// EmergencyEmail: "aslkfj@gmail.com",
// EmergencyPhone: "4141",
// FirstName: "asfd",
// InterestAreas: "sadf",
// InterestPlace: "asf",
// LastName: "asdf",
// Phone: "4545",
// PostalCode: "10",
// Skills: "sdfsa",
// State: "sadf",
// },

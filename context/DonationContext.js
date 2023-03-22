import { createContext, useState } from "react";
import { API_URL, API_TOKEN } from "@/config/index";
export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const donationInitial = {
    Name: "",
    Email: "",
    Amount: 2,
    Frequency: "on-time",
    CardInfo: "",
  };

  const [donation, setDonation] = useState(donationInitial);

  const sendMaildoantins = async () => {
    try {
      const res = await fetch(`/api/emails/donationmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: donation.Name,
          ammount: donation.Amount,
          email: donation.Email,
          frequency: donation.Frequency,
          subject: "Kingdomofkush Donations",
        }),
      });

      const data = await res.json();

      // router.push(`/donation`);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postDonation = async () => {
    try {
      const res = await fetch(`${API_URL}/api/donations`, {
        method: "POST",
        headers: {
          Authorization: API_TOKEN,
        },
        body: JSON.stringify({
          data: {
            data: { ...donation },
          },
        }),
      });

      sendMaildoantins();
      const data = await res.json();
      if (!res.ok) return;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DonationContext.Provider
      value={{ donation, setDonation, donationInitial, postDonation }}
    >
      {children}
    </DonationContext.Provider>
  );
};

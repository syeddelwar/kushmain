import { createContext, useState } from "react";
import { API_URL, API_TOKEN } from "@/config/index";

export const InvextContext = createContext();

export const InvestProvider = ({ children }) => {
  const InvestInitial = {
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    ProjectCategories: "",
    InvestorType: "Individual",
    InvestmentLocation: "",
    InvestmentAmount: "",
    InvestmentStartTime: "1-Week",
  };

  const [invest, setInvest] = useState(InvestInitial);

  const sendMailInvest = async () => {
    try {
      const res = await fetch(`/api/emails/investemail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: invest.Email,
          subject: `Invest $${invest.InvestmentAmount}`,
          message: `Thank ${invest.FirstName} for the quality of service provided by your company. We sincerely appreciate your efficient, gracious customer service, the level of detail and accountability you have demonstrated on each project, and the way you conduct business as a whole.`,
          ammount:invest.InvestmentAmount
        }),
      });

      const data = await res.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postInvest = async () => {
    try {
      const res = await fetch(`${API_URL}/api/invests`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: API_TOKEN,
        },

        body: JSON.stringify({
          data: {
            ...invest,
          },
        }),
      });

      sendMailInvest();
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InvextContext.Provider
      value={{ invest, setInvest, InvestInitial, postInvest }}
    >
      {children}
    </InvextContext.Provider>
  );
};

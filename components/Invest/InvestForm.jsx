import React, { useEffect, useState, useContext } from "react";
import { Alert } from "@material-tailwind/react";
import { InvextContext } from "@/context/InvestContext";
// alart and messages
import useSweetAlert from "../lib/sweetalert2";
import PhoneInput from "react-phone-number-input";

function InvestForm() {
  // showing alert
  const { showAlert } = useSweetAlert();

  const showAlerts = () => {
    showAlert({
      text: `Thanks for Your Investment Info!`,
      icon: "success",
      confirmButtonText: "ClOSE",
      confirmButtonColor: "green",
    }).then((result) => {
      console.log(result);
    });
  };

  const { invest, setInvest, InvestInitial, postInvest } =
    useContext(InvextContext);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // ========================================
    // Preferred Investment
    const preferredInvests = document.querySelectorAll(".preferredInvest");
    const checkPreferredInvests = [];

    preferredInvests.forEach((checkbox) => {
      if (checkbox.checked) {
        checkPreferredInvests.push(checkbox.value);
      }
    });

    // project Cetegorys
    const projectCetegorys = document.querySelectorAll(".projectCetegory");

    const checkedCheckboxes = [];

    projectCetegorys.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedCheckboxes.push(checkbox.value);
      }
    });

    setInvest({
      ...invest,
      ProjectCategories: checkedCheckboxes.join(", "),
      InvestmentLocation: checkPreferredInvests.join(", "),
    });
  }, [checked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postInvest();
    setInvest(InvestInitial);
    showAlerts();
    // Loop through all checkboxes and uncheck them
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkboxes) => (checkboxes.checked = false));
  };

  return (
    <div className="InvestForm dark:bg-[#161519] py-10">
      <div className="container px-[3rem] mx-auto pt-[5rem] ">
        <div className=" shadow-xl min-h-[20rem] p-[3rem] ">
          <form id="myForm" action="submit" onSubmit={handleSubmit}>
            <div className="grid  md:justify-items-start mdjustify-items-center    rounded-md border-l-4 border-[#eaeaea] grid-cols-1  space-y-5  md:space-y-0   md:grid-cols-2 md:space-x-8 p-[1rem] dark:bg-[#878688]  bg-[#fbfbfb]">
              <div className="w-[100%]">
                <input
                  required
                  type="text"
                  className=" w-[95%]  placeholder-black rounded-md bg-[#eaeaea] text-black px-2 py-2"
                  placeholder="First Name"
                  value={invest.FirstName}
                  onChange={(e) =>
                    setInvest({ ...invest, FirstName: e.target.value })
                  }
                />
                <Alert className=" bg-[#f9e4e8] invisible text-red text-[12px]  rounded-none py-1 mt-1">
                  Name is required..
                </Alert>
              </div>
              <div className="w-[95%]">
                <input
                  required
                  type="text"
                  className=" w-[100%] placeholder-black rounded-md bg-[#eaeaea] text-black px-2 py-2"
                  placeholder="Last Name"
                  value={invest.LastName}
                  onChange={(e) =>
                    setInvest({ ...invest, LastName: e.target.value })
                  }
                />
                <Alert className=" bg-[#f9e4e8] invisible text-red text-[12px]  rounded-none py-1 mt-1">
                  Name is required..
                </Alert>
              </div>
            </div>

            <div className="grid  dark:bg-[#878688]  mt-8 md:justify-items-start mdjustify-items-center    rounded-md border-l-4 border-[#eaeaea] grid-cols-1  space-y-5  md:space-y-0   md:grid-cols-2 md:space-x-8 p-[1rem]  bg-[#fbfbfb]">
              <div className="w-[95%]">
                <input
                  required
                  type="email"
                  className=" w-[100%]  placeholder-black rounded-md bg-[#eaeaea] text-black px-2 py-2"
                  placeholder="Email"
                  value={invest.Email}
                  onChange={(e) =>
                    setInvest({ ...invest, Email: e.target.value })
                  }
                />
                <Alert className=" bg-[#f9e4e8] invisible text-red text-[12px]  rounded-none py-1 mt-1">
                  Email is required..
                </Alert>
              </div>

              <div className="w-[95%] ">
                {/* <input
                  required
                  type="number"
                  className=" w-[100%] placeholder-black rounded-md bg-[#eaeaea] text-black px-2 py-2"
                  placeholder="Phone"
                  value={invest.Phone}
                  onChange={(e) =>
                    setInvest({ ...invest, Phone: e.target.value })
                  }
                /> */}
                <PhoneInput
                  international
                  className=" py-3 rounded-sm w-[100%]  px-2  bg-[#ededed]"
                  defaultCountry="RU"
                  onChange={(e) => console.log("hello")}
                  // onChange={(e) =>
                  //   setVolunteer({ ...volunteer, Phone: e.target.value })
                  // }
                />
                <Alert className=" bg-[#f9e4e8] invisible text-red text-[12px]  rounded-none py-1 mt-1">
                  Please input required a valid international phone number.
                </Alert>
              </div>
            </div>

            <div className="mt-8  dark:bg-[#878688]  rounded-md border-l-4 border-[#eaeaea] p-[1rem] bg-[#fbfbfb]">
              <div className="grid gap-2 md:grid-cols-3">
                <div>
                  <h4 className="text-[18px] font-bold text-[#777771] mb-3">
                    Project categories *
                  </h4>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      className="mr-2 w-4 h-5 projectCetegory   accent-black"
                      value={"Agriculture"}
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px] ">Agriculture</label>
                  </div>

                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value={`Houseing`}
                      className="mr-2 w-4 h-5 projectCetegory  accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px] ">Houseing</label>
                  </div>

                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value={`Clean Water`}
                      className="mr-2 w-4 h-5 projectCetegory  accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px]  ">Clean Water</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value={"Healthcare"}
                      className="mr-2 w-4 h-5 projectCetegory  accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px] ">Healthcare</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value={"Education"}
                      className="mr-2 w-4 h-5 projectCetegory  accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px] ">Education</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value={"Infrastructure (including roads)"}
                      className="mr-2 w-4 h-5 projectCetegory  accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px] ">
                      Infrastructure (including roads)
                    </label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value={"Power"}
                      className="mr-2 w-4 h-5 projectCetegory  accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px] ">Power</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value={"Communication"}
                      className="mr-2 w-4 h-5 projectCetegory  accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px] ">Communication</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value={"Tourism"}
                      className="mr-2 w-4 h-5 projectCetegory  accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px] ">Tourism</label>
                  </div>
                  <Alert className=" bg-[#f9e4e8] invisible text-red text-[12px]  rounded-none py-1 mt-1">
                    This field is required. Please select a value.
                  </Alert>
                </div>
                <div>
                  <h4 className="text-[18px] font-bold text-[#777771] mb-3">
                    Investor Type *
                  </h4>

                  <div className="flex gap-2 items-center mb-4">
                    <input
                      required
                      type="radio"
                      value="Individual"
                      name="invest"
                      className="mr-2 w-5 h-5  accent-black"
                      onChange={(e) =>
                        setInvest({ ...invest, InvestorType: e.target.value })
                      }
                    />
                    <label className="text-[14px]">Individual</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      required
                      type="radio"
                      value="Business/Corporation"
                      name="invest"
                      onChange={(e) =>
                        setInvest({ ...invest, InvestorType: e.target.value })
                      }
                      className="mr-2 w-5 h-5  accent-black"
                    />
                    <label className="text-[14px]">Business/Corporation</label>
                  </div>
                  <Alert className=" bg-[#f9e4e8] invisible text-red text-[12px]  rounded-none py-1 mt-1">
                    This field is required. Please select a value.
                  </Alert>
                </div>
                <div>
                  <h4 className="text-[18px] font-bold text-[#777771] mb-3">
                    Preferred Investment Location *
                  </h4>

                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value="kingdom of kush"
                      className="mr-2 w-4 h-5  preferredInvest accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px]">Kingdom of kush</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value="Angola"
                      className="mr-2 w-4 h-5  preferredInvest accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px]">Angola</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value="Benin"
                      className="mr-2 w-4 h-5  preferredInvest accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px]">Benin</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value="Burkina Faso"
                      className="mr-2 w-4 h-5  preferredInvest accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px]">Burkina Faso</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value="DRC"
                      className="mr-2 w-4 h-5  preferredInvest accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px]">DRC</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value="Guinea"
                      className="mr-2 w-4 h-5  preferredInvest accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px]">Guinea</label>
                  </div>
                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={"checkbox"}
                      value="Indonesia"
                      className="mr-2 w-4 h-5  preferredInvest accent-black"
                      onChange={() => setChecked(!checked)}
                    />
                    <label className="text-[14px]">Indonesia</label>
                  </div>
                  <Alert className=" bg-[#f9e4e8] invisible text-red text-[12px]  rounded-none py-1 mt-1">
                    This field is required. Please select a value.
                  </Alert>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 items-center gap-4">
                <div className="flex flex-col">
                  <label className="text-[18px] font-bold text-[#777771]">
                    Preferred Investment Amount (USD) *
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-xl">$</span>
                    </div>
                    <input
                      required
                      type={"number"}
                      value={invest.InvestmentAmount}
                      className="bg-[#EDEDED] px-3 py-3 pl-10 p-2.5 w-full text-black "
                      placeholder="Amount"
                      onChange={(e) =>
                        setInvest({
                          ...invest,
                          InvestmentAmount: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* <label className="text-[18px] font-bold text-[#777771]">
                    Preferred Investment Amount (USD) *
                  </label>
                  <input
                    required
                    type={"number"}
                    value={invest.InvestmentAmount}
                    className="bg-[#EDEDED] px-3 py-3 text-black "
                    placeholder="Amount"
                    onChange={(e) =>
                      setInvest({ ...invest, InvestmentAmount: e.target.value })
                    }
                  /> */}
                  <Alert className=" bg-[#f9e4e8] invisible text-red text-[12px]  rounded-none py-1 mt-1">
                    This field is required. Please select a value.
                  </Alert>
                </div>
                <div className="flex flex-col">
                  <label className="text-[18px] font-bold text-[#777771] ">
                    Preferred Investment Start Time *
                  </label>
                  <select
                    className="bg-[#EDEDED] px-3 py-3"
                    value={invest.InvestmentStartTime}
                    onChange={(e) =>
                      setInvest({
                        ...invest,
                        InvestmentStartTime: e.target.value,
                      })
                    }
                  >
                    <option>1 week</option>
                    <option>2 week</option>
                  </select>
                  <Alert className=" bg-[#f9e4e8] invisible text-red text-[12px]  rounded-none py-1 mt-1">
                    This field is required. Please select a value.
                  </Alert>
                </div>
              </div>
            </div>
            <button
              className="bg-[#333333] text-[#fff] font-medium text-[14px] px-3 py-2 rounded-sm mt-8"
              type="sbumit"
            >
              I am Interested in Investing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InvestForm;
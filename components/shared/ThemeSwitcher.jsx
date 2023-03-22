import React, { useContext, useEffect } from "react";
import { ModeContext } from "@/context/ModeContext";
const ThemeSwitcher = () => {
  const { isDarkMode, toggleMode } = useContext(ModeContext);

  useEffect(() => {
    const theme = document.getElementById("theme");
    if (isDarkMode) {
      theme.setAttribute("class", "dark");
    } else {
      theme.setAttribute("class", "light");
    }
  }, [isDarkMode]);
  return (
    <>
      <div className="fixed hidden lg:block top-[40%] left-[3 %] z-[99999]">
        <div className="flex flex-col gap-5 relative">
          <button
            onClick={() => toggleMode(true)}
            className="rotate-90 px-4 py-1 bg-[#4a4653] text-white rounded-full"
          >
            Dark
          </button>
          <button
            onClick={() => toggleMode(false)}
            className="rotate-90 px-4 py-1 bg-[#4a4653] text-white rounded-full"
          >
            Light
          </button>
        </div>
      </div>
      <div className="fixed  lg:hidden block bottom-10 right-10 z-[9999]">
        <button
          onClick={() => toggleMode(!isDarkMode)}
          className="w-20 h-10 rounded-full bg-[#4a4653] flex items-center transition duration-300 focus:outline-none shadow"
        >
          <div
            id="switch-toggle"
            className={`w-12 h-12 relative rounded-full transition duration-500 transform bg-[#837f8b] p-1 text-white ${
              isDarkMode ? "translate-x-full" : " -translate-x-2"
            }`}
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </div>
        </button>
      </div>
    </>
  );
};

export default ThemeSwitcher;

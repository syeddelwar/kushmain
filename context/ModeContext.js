import { createContext, useState } from "react";
export const ModeContext = createContext({
  isDarkMode: false,
  toggleMode: () => {},
});

export const ModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  function toggleMode(theme) {
    setIsDarkMode(theme);
  }
  const value = {
    isDarkMode,
    toggleMode,
  };
  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

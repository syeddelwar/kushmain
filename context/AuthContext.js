import { createContext, useEffect, useState } from "react";
import { API_URL, API_TOKEN } from "@/config/index";
import { useRouter } from "next/router";
export const AuthContext = createContext();

import { setCookie, destroyCookie, parseCookies } from "nookies";

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    checkUserLoggedId();
  }, []);

  const signup = async (userData) => {
    const res = await fetch(`/api/signup`, {
      method: "POST",

      body: JSON.stringify({
        username: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await res.json();
    if (data.user) {
      setUser(data);
      return;
    } else {
      setError(data);
    }
  };

  const singin = async ({ email: identifier, password }) => {
    const res = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();

    if (data.user) {
      setUser(data);
    } else {
      setError(data);
    }
  };

  const signOut = async (user) => {
    setUser(null);
    setError(null);
    destroyCookie(null, "token");
    router.push("/");
  };

  const checkUserLoggedId = async () => {
    const res = await fetch(`/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        error,
        user,
        singin,
        setUser,
        setError,
        signOut,
        setOpen,
        open,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

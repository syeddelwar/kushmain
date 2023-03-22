import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

function useProtectedRoute() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = user === null ? false : true; // your authentication logic here
    if (!isAuthenticated) {
      // If the user is not authenticated, redirect to the login page
      router.push("/dashboard/login");
    }
  }, []);
}

export default useProtectedRoute;

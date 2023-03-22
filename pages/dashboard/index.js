import React from "react";
import DashboardIndex from "@/components/Dashboard/DashboardIndex";
import useProtectedRoute from "@/components/Hooks/useProtectedRoute";

import Head from "next/head";

function dashboard() {
  useProtectedRoute();

  return (
    <>
      <Head>
        <title>Members</title>
      </Head>
      <DashboardIndex />
    </>
  );
}

export default dashboard;

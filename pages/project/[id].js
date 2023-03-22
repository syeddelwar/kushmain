import React from "react";
import Layout from "@/components/Layout";
import Project from "@/components/projects/Project";
import ShowProject from "@/components/projects/ShowProject";

function showProject({ item }) {
  return (
    <Layout title={"Project"}>
      <ShowProject />
    </Layout>
  );
}

export default showProject;

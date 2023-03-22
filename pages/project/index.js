import React from "react";
import Layout from "@/components/Layout";
import Project from "@/components/projects/Project";
import path from "path";
import fs from "fs-extra";

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), "public/project.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  return {
    props: {
      data: data,
    },
  };
}
function project({ data }) {
  return (
    <Layout title={"Project"}>
      <Project data={data} />
    </Layout>
  );
}

export default project;

import React from "react";
import Layout from "@/components/Layout";
import Project from "@/components/projects/Project";
import ShowProject from "@/components/projects/ShowProject";

function showProject() {
  return <Layout title={"Project"}>
      <ShowProject />
  </Layout>;
}

export default showProject;


// export async function getStaticProps({ params }) {
//   const res = await fetch(
//     `https://demo-production-edcf.up.railway.app/api/products?populate=*`
//   );

//   const product = await res.json();

//   return {
//     props: { product, params },
//     revalidate: 1,
//   };
// }

// export async function getStaticPaths() {
//   const res = await fetch(
//     `https://demo-production-edcf.up.railway.app/api/sibebars?populate=*`
//   );

//   const path = await res.json();

//   return {
//     paths: path.data.map((menu) => {
//       return {
//         params: {
//           menu: menu.attributes.Menu,
//         },
//       };
//     }),

//     fallback: false,
//   };
// }
import Layout from "@/components/Layout";
import HomePage from "@/components/Home/HomePage";
import Image from "next/image";

export default function index() {

  return (
    <Layout title={`Kingdom`}>
      <HomePage />
    </Layout>
  );
}

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch("http://localhost:3000/projectsCatagories.json");
//   const people = await res.json();
//   console.log(people);
//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: { people },
//     revalidate: 1,
//   };
// }

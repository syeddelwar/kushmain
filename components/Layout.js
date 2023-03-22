import Head from "next/head";
import Cursor from "./shared/Cursor";
import Footer from "./Footer";
import Nav from "./Nav";
import ThemeSwitcher from "./shared/ThemeSwitcher";

export default function layout({ title, des, content, children, mainContent }) {
  return (
    <Cursor>
      <Head>
        <title>{title}</title>
        <meta name={content} content={des}></meta>
      </Head>
      <Nav />
      <ThemeSwitcher />
      {children}
      <Footer />
    </Cursor>
  );
}

layout.defaultProps = {
  title: "default",
  des: "default page",
  content: "this is about page",
};

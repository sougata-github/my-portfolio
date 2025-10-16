import Experience from "@/components/home/Experience";
import Header from "@/components/home/Navbar";
import About from "@/components/home/About";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sougata Das",
};

const page = async () => {
  return (
    <>
      <Header />
      <About />
      <Experience />
    </>
  );
};

export default page;

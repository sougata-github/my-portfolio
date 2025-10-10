import Header from "@/components/home/Navbar";
import About from "@/components/home/About";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sougata Das | Home",
};

const page = async () => {
  return (
    <>
      <Header />
      <About />
    </>
  );
};

export default page;

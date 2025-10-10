import Header from "@/components/home/Navbar";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sougata Das | Home",
};

const page = async () => {
  return (
    <>
      <Header />
    </>
  );
};

export default page;

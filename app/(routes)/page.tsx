import { Metadata } from "next";
import Connect from "@/components/Connect";
import About from "@/components/home/About";
import Stack from "@/components/home/Stack";
import Blogs from "@/components/home/Blogs";
import Projects from "@/components/home/Projects";
import Services from "@/components/home/Services";
import PageTransition from "@/components/animations/PageTransition";

export const metadata: Metadata = {
  title: "Sougata Das | Home",
};

const page = async () => {
  return (
    <PageTransition>
      <section className="section-container lg:max-w-lg">
        <div className="flex flex-col gap-10">
          <About />
          <Blogs />
        </div>
        <Projects />
        <Services />
        <Stack />
        <Connect />
      </section>
    </PageTransition>
  );
};

export default page;

import { Metadata } from "next";
import Connect from "@/components/Connect";
import Skills from "@/components/stack/Skills";
import PrimaryStack from "@/components/stack/PrimaryStack";
import PageTransition from "@/components/animations/PageTransition";

export const metadata: Metadata = {
  title: "Sougata Das | Stack",
};

const page = () => {
  return (
    <PageTransition>
      <section className="section-container">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            {" "}
            <h1 className="heading-text">Stack</h1>
            <p className="secondary-text">Tool and technologies I use.</p>
          </div>
          <Skills />
        </div>
        <PrimaryStack />
        <Connect />
      </section>
    </PageTransition>
  );
};

export default page;

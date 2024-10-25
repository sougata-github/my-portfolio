import { Metadata } from "next";
import Connect from "@/components/Connect";
import Services from "@/components/projects/Services";
import PageTransition from "@/components/animations/PageTransition";
import FeaturedProjects from "@/components/projects/FeaturedProjects";

export const metadata: Metadata = {
  title: "Sougata Das | Projects",
};

const page = () => {
  return (
    <PageTransition>
      <section className="section-container">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col">
            <h1 className="heading-text">Projects</h1>
            <p className="secondary-text">My personal projects.</p>
          </div>
          <FeaturedProjects />
        </div>

        <Services />

        <div className="flex flex-col gap-4 max-w-[420px] md:max-w-[480px]">
          <h2 className="heading-text">
            Interested in exploring more of my work?
          </h2>
          <p className="secondary-text">
            Check out my GitHub (@
            <a
              target="_blank"
              className="underline"
              href="https://github.com/sougata-github"
            >
              sougata-github
            </a>
            ). Feel free to browse the repositories, raise issues, share your
            feedback, and contribute to the projects.
          </p>
        </div>

        <Connect />
      </section>
    </PageTransition>
  );
};

export default page;

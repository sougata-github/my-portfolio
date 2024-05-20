import Image from "next/image";

import { Button } from "../ui/button";
import { DocumentValidationIcon } from "../icons/CV";

import AboutCard from "../ui/AboutCard";

import { GithubIcon } from "../icons/Github";
import { Briefcase, HeadphonesIcon } from "lucide-react";

const About = () => {
  return (
    <section id="About" className="section-container">
      <h1 className="section-heading">About Me</h1>
      <p className="section-subheading">My Introduction</p>
      <div className="max-sm:mt-4 max-md:mt-8 mt-12 flex lg:flex-row flex-col gap-8 lg:justify-evenly max-lg:justify-center items-center py-4">
        <div className="rounded-3xl">
          <Image
            src="/images/profile-pic.jpg"
            height={500}
            width={500}
            alt="profile"
            className="object-cover max-w-[300px] sm:max-w-sm md:max-w-[480px] lg:max-w-[520px] h-auto rounded-3xl"
          />
        </div>
        <div className="max-lg:items-center flex flex-col gap-4 max-lg:text-center">
          <div className="flex-wrap flex gap-4 max-sm:gap-2">
            <AboutCard
              title="Work"
              description="github"
              icon={<GithubIcon className="h-5 w-5 max-sm:h-4 max-sm:w-4" />}
              link="https://github.com/sougata-github"
            />
            <AboutCard
              title="Completed"
              description="10+ projects"
              icon={<Briefcase className="h-5 w-5 max-sm:h-4 max-sm:w-4" />}
            />
            <AboutCard
              title="Support"
              description="online 24/7"
              icon={
                <HeadphonesIcon className="h-5 w-5 max-sm:h-4 max-sm:w-4" />
              }
            />
          </div>
          <p className="py-2 text-light-2 text-sm max-w-[400px] max-sm:max-w-[320px]">
            Frontend Web Developer from India with expertise in React, Next,
            TypeScript & Tailwind CSS for creating dynamic and responsive web
            applications.
          </p>
          <Button className="mt-4 w-fit bg-black max-sm:py-4 py-6 px-4 rounded-xl max-sm:text-xs">
            Download CV{" "}
            <DocumentValidationIcon className="h-5 w-5 text-white ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;

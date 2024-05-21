import Image from "next/image";

import { Button } from "../ui/button";
import { DocumentValidationIcon } from "../icons/CV";

import AboutCard from "../ui/AboutCard";

import { GithubIcon } from "../icons/Github";
import { Briefcase, HeadphonesIcon, Headset } from "lucide-react";

const About = () => {
  return (
    <section id="About" className="section-container">
      <h1 className="section-heading">About Me</h1>
      <p className="section-subheading">My Introduction</p>
      <div className="max-sm:mt-4 max-md:mt-8 mt-12 flex lg:flex-row flex-col gap-8 lg:justify-evenly max-lg:justify-center items-center lg:items-start py-4">
        <div className="rounded-[22px] overflow-clip">
          <Image
            src="/images/profile-pic.png"
            height={500}
            width={500}
            alt="profile"
            className="object-cover max-w-[280px] sm:max-w-sm md:max-w-[400px] lg:max-w-[420px] h-auto"
          />
        </div>
        <div className="max-lg:items-center flex flex-col gap-4 max-lg:text-center">
          <div className="flex-wrap flex justify-between max-lg:gap-12 max-sm:gap-8">
            <AboutCard
              title="My Work"
              description="github"
              icon={
                <GithubIcon className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-light-1" />
              }
              link="https://github.com/sougata-github"
            />
            <AboutCard
              title="Completed"
              description="10+ projects"
              icon={
                <Briefcase className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-light-1" />
              }
            />
            <AboutCard
              title="Support"
              description="online 24/7"
              icon={
                <Headset className="h-6 w-6 max-sm:h-5 max-sm:w-5 text-light-1" />
              }
            />
          </div>
          <p className="py-2 text-light-2 text-sm max-w-[400px] max-sm:max-w-[320px]">
            I am a Frontend Web Developer from India with expertise in React,
            Next, TypeScript & Tailwind CSS for creating dynamic and responsive
            web applications.
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

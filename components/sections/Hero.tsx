import Link from "next/link";
import Image from "next/image";

import Socials from "../ui/Socials";
import { Button } from "../ui/button";
import ScrollButton from "../ui/ScrollButton";

import { SentIcon } from "../icons/Sent";
import CopyButton from "../ui/CopyButton";

const Hero = () => {
  return (
    <section
      id="Home"
      className="max-sm:mb-8 mb-14 lg:mb-20 pb-2 max-md:pt-2 lg:pt-0 max-sm:pt-8 transition-all"
    >
      <div className="flex flex-col items-center lg:flex-row md:justify-between max-sm:pb-2 gap-2">
        {/* Social Buttons */}
        <div className="lg:mt-20 my-4 max-sm:my-4">
          <Socials />
        </div>

        {/* CTA */}
        <div className="lg:mt-16 max-sm:mt-2 flex flex-col items-center lg:items-start lg:text-left text-center max-md:gap-4 gap-2 ">
          <div className="gap-2">
            <h1 className="text-4xl lg:text-5xl font-bold">
              I&apos;m Sougata<span className="hidden lg:inline">👋</span>
            </h1>
            <h2 className="text-light-1 text-lg lg:text-2xl font-semibold mt-2 md:mt-4 lg:ml-1">
              Creative Developer
            </h2>
          </div>

          <p className="text-light-2 text-sm lg:text-[16px] mt-2 lg:mt-4 max-w-md max-md:max-w-[400px]">
            Transforming your ideas into interactive and engaging digital
            experiences.
          </p>

          <div className="flex gap-4 mt-8">
            <Link href="#Contact">
              <Button className="bg-black max-sm:py-4 py-6 px-4 rounded-xl max-sm:text-xs">
                Say Hello
                <SentIcon className="ml-1 mt-[0.5] h-5 w-5 max-sm:h-4 max-sm:w-4 text-white" />
              </Button>
            </Link>
            <CopyButton />
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-2 md:mb-0">
          <Image
            src="/images/hero-1.png"
            alt="Illustration of Sougata Das"
            width={500}
            height={500}
            priority
            className="w-full h-auto max-w-[380px] sm:max-w-sm md:max-w-[480px] lg:max-w-[560px]"
          />
        </div>
      </div>

      {/* Scroll Button */}
      <div className="lg:max-w-4xl lg:mx-auto max-lg:flex items-center justify-center">
        <ScrollButton />
      </div>
    </section>
  );
};

export default Hero;

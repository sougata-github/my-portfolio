import Image from "next/image";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        {/* Introduction */}
        <h1 className="heading-text">About</h1>
        <p className="secondary-text">Hi, I&apos;m Sougata.</p>
      </div>

      {/* About */}
      <div className="pt-10 flex flex-col sm:flex-row gap-6 sm:gap-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src="/profile-pic.png"
          alt="Profile Image"
          width={200}
          height={200}
          quality={100}
          unoptimized
          className="rounded-xl w-full sm:w-[260px] sm:h-[260px] max-w-full"
        />

        <div className="pt-4 flex flex-col gap-8">
          <p className="secondary-text">
            I am a Frontend Developer from India with expertise in React.js,
            Next.js, TypeScript & Tailwind CSS for creating dynamic and
            responsive web applications.
          </p>

          <Button className="max-sm:justify-center p-4 bg-background/5 rounded-md text-light w-full sm:w-fit hover:bg-background/10 transition duration-500">
            <a href="/" className="flex gap-2 items-center">
              Download CV <Download className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;

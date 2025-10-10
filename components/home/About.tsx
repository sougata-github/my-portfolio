import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";


const About = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-row md:flex-col max-md:items-center gap-4">
        {/* Introduction */}

        <div className="md:hidden flex items-center justify-center w-fit rounded-full p-0.5 bg-background/10"></div>

        <div>
          <h1 className="heading-text text-2xl">Hi, I&apos;m Sougata.</h1>
        </div>
      </div>

      {/* About */}
      <div className="pt-6 flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-8">
          <p className="secondary-text sm:max-w-lg text-[16.5px] text-light/80">
            I’m a 23-year-old Frontend Developer from India with expertise in
            React.js, Next.js, TypeScript, and TailwindCSS.
          </p>

          <Button className="max-sm:justify-center p-4 bg-background/10 rounded-md text-light w-full sm:w-fit hover:bg-background/15 transition duration-500">
            <a href="/resume.pdf" className="flex gap-2 items-center" download>
              Download CV <Download className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default About;

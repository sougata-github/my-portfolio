import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-row md:flex-col max-md:items-center gap-4">
        {/* Introduction */}

        <div className="md:hidden flex items-center justify-center w-fit rounded-full p-0.5 bg-background/5">
          <Image
            src="/emoji.png"
            alt="profile picture"
            placeholder="blur"
            blurDataURL="https://placehold.co/76x76"
            height={72}
            width={72}
            quality={100}
            unoptimized
            priority={true}
            className="rounded-full object-center"
          />
        </div>

        <div>
          <h1 className="heading-text">About</h1>
          <p className="secondary-text">Hi, I&apos;m Sougata.</p>
        </div>
      </div>

      {/* About */}
      <div className="pt-6 flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-8">
          <p className="secondary-text max-w-lg">
            I am a Frontend Developer from India with expertise in React.js,
            Next.js, TypeScript and Tailwid CSS for creating dynamic and
            responsive web applications.
          </p>

          <Button className="max-sm:justify-center p-4 bg-background/5 rounded-md text-light w-full sm:w-fit hover:bg-background/10 transition duration-500">
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

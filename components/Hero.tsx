import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="md:pt-22 sm:pt-20 h-[100vh-calc(80px)]">
      <div className="flex">
        <div className="flex flex-col gap-4 pt-10">
          <h1 className="text-5xl font-extrabold">Sougata Das👋</h1>
          <p className="font-medium text-xl text-[#424242]">
            — Creative Developer
          </p>
          <p className="pt-2 max-w-[400px] text-[16px] text-[#6a6a6a]">
            I&apos;m a frontend developer based in India, specializing in
            React.js and Next.js.
          </p>
          <div className="flex gap-4">
            <Link href="#contact">
              <Button className="bg-black text-white rounded-xl px-8 py-6">
                Say Hello{" "}
              </Button>
            </Link>

            <Button></Button>
          </div>
        </div>
        <div className="p-4 rounded-full">
          <div className="rounded-full h-[250px] w-[250px] overflow-hidden shadow-lg">
            <Image
              src="/profile-pic.jpg"
              alt="profile"
              width={250}
              height={250}
              className="object-cover h-full w-full"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

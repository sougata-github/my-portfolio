import Link from "next/link";

import { FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Connect = () => {
  return (
    <section id="contact" className="flex flex-col">
      <h1 className="heading-text">Connect</h1>

      <div className="pt-4 flex flex-col gap-4">
        <p className="secondary-text max-w-[420px]">
          If you&apos;re looking for a developer or just want to connect, reach
          out on any of my socials.
        </p>

        <ul className="mt-2 flex gap-[0.76rem] items-start">
          <Link
            target="_blank"
            href="https://github.com/sougata-github"
            className="group p-3 rounded-md bg-background/5 hover:bg-background/10 transition-all flex items-center justify-center "
          >
            <FiGithub className="h-[1.2rem] w-[1.2rem] text-light/60 group-hover:text-light transition-all" />
          </Link>
          <Link
            target="_blank"
            href="https://x.com/sougata_x"
            className="group p-3 rounded-md   bg-background/5 hover:bg-background/10 transition-all flex items-center justify-center "
          >
            <FaXTwitter className="h-[1.2rem] w-[1.2rem] text-light/60 group-hover:text-light transition-all" />
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/sougata-linkdin"
            className="group p-3 rounded-md bg-background/5 hover:bg-background/10 transition-all flex items-center justify-center "
          >
            <FaLinkedinIn className="h-[1.2rem] w-[1.2rem] text-light/60 group-hover:text-light transition-all" />
          </Link>
        </ul>
      </div>

      <div className="pt-10">
        <p className="text-xs text-light/40 w-full text-center">
          &#169; Sougata Das | 2024
        </p>
      </div>
    </section>
  );
};

export default Connect;

import Link from "next/link";
import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FiGithub } from "react-icons/fi";

const Social = () => {
  return (
    <div className="py-1 px-4 w-fit flex items-center justify-center gap-2 leading-[1] text-[1rem] text-white/50">
      <Link
        target="_blank"
        href="https://github.com/sougata-github"
        className="rounded-full p-2 hover:bg-light/20 transition-all"
      >
        <FiGithub />
      </Link>
      <Link
        target="_blank"
        href="https://www.linkedin.com/in/sougata-linkdin"
        className="rounded-full p-2 hover:bg-light/20 transition-all"
      >
        <BsLinkedin />
      </Link>
      <Link
        target="_blank"
        href="https://x.com/sougata_x"
        className="rounded-full p-2 hover:bg-light/20 transition-all"
      >
        <BsTwitterX />
      </Link>
    </div>
  );
};

export default Social;

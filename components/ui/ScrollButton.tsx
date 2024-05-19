import { ArrowDown, Mouse } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";

const ScrollButton = () => {
  return (
    <Link href="#About">
      <Button className="group mt-2 bg-transparent px-4 text-black hover:bg-transparent">
        <Mouse className="mx-1" />
        Scroll Down{" "}
        <ArrowDown className="z-[-10] ml-1 h-4 w-4 group-hover:translate-y-1 transition-all max-lg:group-hover:translate-y-0" />
      </Button>
    </Link>
  );
};

export default ScrollButton;

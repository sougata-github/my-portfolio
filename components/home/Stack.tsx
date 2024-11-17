import Link from "next/link";

import { stackData } from "@/lib/data";
import { Separator } from "../ui/separator";
import { ChevronRight } from "lucide-react";

const Stack = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="heading-text">Stack</h1>
        <p className="secondary-text">My Skills and tech-stack.</p>
      </div>

      <Separator className="h-[0.2px] mt-5 bg-background/20 w-full" />

      <ul className="pt-6 flex flex-col gap-6">
        {stackData.map((stack) => (
          <Link
            href={stack.href}
            className="flex flex-col gap-1 items-start w-full pl-0 p-1"
            key={stack.title}
          >
            <h1 className="heading-text text-[1.025rem]">{stack.title}</h1>
            <p className="secondary-text">{stack.description}</p>
          </Link>
        ))}
      </ul>

      <Link
        href="/stack"
        className="mt-6 text-sm group flex flex-row items-center gap-1"
      >
        View All
        <ChevronRight className="h-5 w-5 text-light/60 md:group-hover:translate-x-1 transition duration-500" />
      </Link>
    </section>
  );
};

export default Stack;

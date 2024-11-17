import Link from "next/link";

import { servicesData } from "@/lib/data";

import { Separator } from "../ui/separator";
import { ChevronRight } from "lucide-react";

const Services = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="heading-text">Services</h1>
        <p className="secondary-text">What I offer.</p>
      </div>

      <Separator className="h-[0.2px] mt-5 bg-background/20 w-full" />

      <ul className="pt-6 flex flex-col gap-6">
        {servicesData.map((service) => (
          <Link
            href={service.href}
            className="flex flex-col gap-1 items-start w-full pl-0 p-1"
            key={service.title}
          >
            <h1 className="heading-text text-[1.025rem]">{service.title}</h1>
            <p className="secondary-text">{service.description}</p>
          </Link>
        ))}
      </ul>

      <Link
        href="/projects#services"
        className="mt-6 text-sm group flex flex-row items-center gap-1"
      >
        View All
        <ChevronRight className="h-5 w-5 text-light/60 md:group-hover:translate-x-1 transition duration-500" />
      </Link>
    </section>
  );
};

export default Services;

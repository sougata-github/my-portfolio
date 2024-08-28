import { educationData } from "@/lib/data";
import { Separator } from "../ui/separator";

const Education = () => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="heading-text">Education</h1>
        <p className="secondary-text">Timeline of my education.</p>
      </div>

      <Separator className="h-[0.2px] mt-5 bg-background/10 w-full" />

      <ul className="pt-6 flex flex-col gap-6">
        {educationData.map((item) => (
          <li
            className="p-1 flex flex-col gap-1 md:gap-0 md:flex-row md:justify-between md:items-center"
            key={item.course}
          >
            <div className="flex flex-col">
              <h1 className="heading-text text-[1.025rem]">{item.course}</h1>
              <p className="secondary-text max-w-[260px]">{item.platform}</p>
            </div>

            <p className="text-sm text-light/40">{item.date}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Education;

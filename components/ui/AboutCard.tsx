import Link from "next/link";

interface AboutCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

const AboutCard = ({ title, description, icon, link }: AboutCardProps) => {
  return (
    <div className="cursor-pointer lg:w-[160px] lg:h-auto max-sm:px-8 px-8 py-4 lg:py-6 bg-white border-[0.5px] border-[#bcbcbc] rounded-xl flex flex-col gap-2 max-sm:gap-1 items-center">
      {icon}
      <h1 className="text-light-1 max-sm:text-[10px] lg:text-sm font-semibold tracking-tight">
        {title}
      </h1>

      {link ? (
        <Link
          target="_blank"
          href={link}
          className="text-light-2 text-xs max-sm:text-[8.5px] underline"
        >
          {description}
        </Link>
      ) : (
        <p className="text-light-2 text-xs max-sm:text-[8.5px]">
          {description}
        </p>
      )}
    </div>
  );
};

export default AboutCard;

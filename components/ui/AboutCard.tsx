import Link from "next/link";

interface AboutCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}

const AboutCard = ({ title, description, icon, link }: AboutCardProps) => {
  return (
    <div className="cursor-pointer py-4 lg:py-6 bg-transparent flex flex-col gap-2 max-sm:gap-1 items-center">
      {icon}
      <h1 className="text-light-1 max-sm:text-[12px] sm:text-lg font-semibold tracking-tight">
        {title}
      </h1>

      {link ? (
        <Link
          target="_blank"
          href={link}
          className="font-medium text-light-2 text-sm max-sm:text-[10px] hover:text-light-1 transition duration-200"
        >
          {description}
        </Link>
      ) : (
        <p className="font-medium text-light-2 text-sm max-sm:text-[10px] hover:text-light-1 transition duration-200">
          {description}
        </p>
      )}
    </div>
  );
};

export default AboutCard;

import Image from "next/image";
import Link from "next/link";

interface ProjectHeroProps {
  imageUrl: string;
  href: string;
}

const ProjectHero = ({ imageUrl, href }: ProjectHeroProps) => {
  return (
    <section className="max-sm:mt-4 mt-16 lg:mt-10 max-sm:pb-10 max-md:pb-12 pb-20 flex flex-col gap-8">
      <h1 className="project-heading">Preview</h1>
      <Link
        target="_blank"
        href={href}
        className="flex max-lg:items-center max-lg:justify-center"
      >
        <div className="cursor-pointer max-w-[1080px] shadow-xl rounded-xl">
          <Image
            src={imageUrl}
            width={500}
            height={500}
            alt="project-preview"
            priority
            unoptimized
            quality={100}
            className="w-full h-auto rounded-xl max-lg:max-w-[700px] max-md:max-w-[580px] max-sm:max-w-[480px]"
          />
        </div>
      </Link>
    </section>
  );
};

export default ProjectHero;

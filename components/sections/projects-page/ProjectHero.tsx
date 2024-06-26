import Image from "next/image";
import Link from "next/link";

interface ProjectHeroProps {
  imageUrl: string;
  mobileImageUrl: string;
  href: string;
}

const ProjectHero = ({ imageUrl, mobileImageUrl, href }: ProjectHeroProps) => {
  return (
    <section className="project-section-container">
      <h1 className="project-heading">Preview</h1>
      <Link
        target="_blank"
        href={href}
        className="flex max-lg:items-center max-lg:justify-center"
      >
        <div className="mt-6 cursor-pointer max-w-[1080px] shadow-xl rounded-xl">
          <Image
            src={imageUrl}
            width={500}
            height={500}
            alt="project-preview"
            priority
            unoptimized
            quality={100}
            className="w-full h-auto rounded-xl max-lg:max-w-[700px] max-md:max-w-[580px] max-sm:hidden"
          />
          <Image
            src={mobileImageUrl}
            width={500}
            height={500}
            alt="project-preview"
            priority
            unoptimized
            quality={100}
            className="max-w-[280px] h-auto rounded-xl sm:hidden"
          />
        </div>
      </Link>
    </section>
  );
};

export default ProjectHero;

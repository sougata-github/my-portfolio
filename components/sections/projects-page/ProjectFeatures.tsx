import ProjectFeatureCard from "./ProjectFeatureCard";

type features = {
  label: string;
  features: string[];
};

const ProjectFeatures = ({ features }: { features: features[] }) => {
  return (
    <section className="project-section-container">
      <h1 className="project-heading">Features</h1>
      <ul className="w-full max-lg:max-w-[400px] mx-auto flex py-4 flex-col lg:flex-row gap-12 max-lg:gap-20">
        {features.map((featureCard) => (
          <li
            key={featureCard.label}
            className="max-lg:border-[0.5px] max-lg:border-[#cecece] cursor-pointer max-lg:shadow-lg shadow-xl rounded-xl p-4"
          >
            <ProjectFeatureCard
              label={featureCard.label}
              features={featureCard.features}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectFeatures;

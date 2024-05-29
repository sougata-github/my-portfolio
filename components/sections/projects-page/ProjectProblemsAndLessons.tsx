const ProjectProblemsAndLessons = ({
  details,
  heading,
}: {
  details: string[];
  heading: string;
}) => {
  return (
    <section className="project-section-container">
      <h1 className="project-heading">{heading}</h1>
      <div className="max-w-[400px] sm:max-w-[600px] lg:max-w-[720px] max-lg:text-center text-light-2 font-medium tracking-tight text-sm lg:text-[15px] flex flex-col max-lg:mx-auto lg:items-start gap-8 py-4 ">
        {details.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
};

export default ProjectProblemsAndLessons;

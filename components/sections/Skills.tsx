import { skillsData } from "../icons/SkillsIcons";
import SkillBadge from "../ui/SkillBadge";

const Skills = () => {
  return (
    <section id="Skills" className="section-container">
      <h1 className="section-heading">My Skills</h1>
      <p className="section-subheading">Tech Stack</p>

      <div className="mt-2 lg:mt-8 mx-auto pt-10 lg:pt-16 pb-4 lg:py-8 max-w-md flex flex-wrap items-center justify-center gap-6">
        {skillsData.map((skill) => (
          <SkillBadge key={skill.label} label={skill.label} icon={skill.icon} />
        ))}
      </div>
    </section>
  );
};

export default Skills;

import Connect from "@/components/Connect";
import About from "@/components/home/About";
import Stack from "@/components/home/Stack";
import Projects from "@/components/home/Projects";
import Education from "@/components/home/Education";

const page = async () => {
  return (
    <section className="section-container">
      <About />
      <Projects />
      <Education />
      <Stack />
      <Connect />
    </section>
  );
};

export default page;

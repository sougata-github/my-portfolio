import AnimatedSection from "@/components/animations/AnimatedSection";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Blogs from "@/components/home/Blogs";
import About from "@/components/home/About";
import Terminal from "@/components/home/Terminal";

export function HomePage() {
  return (
    <>
      <AnimatedSection index={0}>
        <About />
      </AnimatedSection>
      <AnimatedSection index={1}>
        <Terminal />
      </AnimatedSection>
      <AnimatedSection index={2} className="mt-10 md:mt-12">
        <Experience />
      </AnimatedSection>
      <AnimatedSection index={3} className="mt-10 md:mt-12">
        <Projects />
      </AnimatedSection>
      <AnimatedSection index={4} className="mt-10 md:mt-12">
        <Blogs />
      </AnimatedSection>
    </>
  );
}

export default HomePage;

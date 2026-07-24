import AnimatedSection from "@/components/animations/AnimatedSection";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Blogs from "@/components/home/Blogs";
import Skills from "@/components/home/Skills";
import Hero from "@/components/home/Hero";

export function HomePage() {
  return (
    <>
      <Hero />
      {/*
        Skills is deliberately not wrapped in AnimatedSection. That wrapper
        fades and blurs on mount, which would fight the scroll-driven fill
        this section does instead.
      */}
      <section className="mt-16 md:mt-24">
        <Skills />
      </section>
      {/*
        Also outside AnimatedSection. Experience runs its own whileInView
        stagger, and the wrapper's mount-time blur would double up on it.
      */}
      <section className="mt-16 md:mt-24">
        <Experience />
      </section>
      <AnimatedSection index={2} id="projects" className="mt-10 md:mt-12">
        <Projects />
      </AnimatedSection>
      <AnimatedSection index={3} className="mt-10 md:mt-12">
        <Blogs />
      </AnimatedSection>
    </>
  );
}

export default HomePage;

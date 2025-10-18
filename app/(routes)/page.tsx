import AnimatedSection from "@/components/animations/AnimatedSection";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Header from "@/components/home/Navbar";
import Blogs from "@/components/home/Blogs";
import About from "@/components/home/About";

export function HomePage() {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 gap-10 md:gap-12">
        <AnimatedSection index={0} id="work">
          <About />
        </AnimatedSection>
        <AnimatedSection index={1} id="work">
          <Experience />
        </AnimatedSection>
        <AnimatedSection index={2} id="projects">
          <Projects />
        </AnimatedSection>
        <AnimatedSection index={3} id="blogs">
          <Blogs />
        </AnimatedSection>
      </main>
    </>
  );
}

export default HomePage;

import AnimatedSection from "@/components/animations/AnimatedSection";
import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Header from "@/components/home/Navbar";
import About from "@/components/home/About";


export function HomePage() {
  return (
    <>
      <Header />
      <main className="flex flex-col flex-1 gap-8 md:gap-10">
        <AnimatedSection index={0}>
          <About />
        </AnimatedSection>
        <AnimatedSection index={1}>
          <Experience />
        </AnimatedSection>
        <AnimatedSection index={2}>
          <Projects />
        </AnimatedSection>
      </main>
    </>
  );
}

export default HomePage;

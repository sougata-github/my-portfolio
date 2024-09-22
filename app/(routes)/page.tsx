import Connect from "@/components/Connect";
import About from "@/components/home/About";
import Stack from "@/components/home/Stack";
import Projects from "@/components/home/Projects";
import Services from "@/components/home/Services";
import PageTransition from "@/components/animations/PageTransition";

const page = async () => {
  return (
    <PageTransition>
      <section className="section-container">
        <div className="flex flex-col gap-10">
          <About />
          <Projects />
        </div>
        <Services />
        <Stack />
        <Connect />
      </section>
    </PageTransition>
  );
};

export default page;

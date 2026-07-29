import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Blogs from "@/components/home/Blogs";
import Skills from "@/components/home/Skills";
import Section from "@/components/Section";
import Hero from "@/components/home/Hero";

export function HomePage() {
  return (
    <>
      <Section>
        <Hero />
      </Section>
      {/*
        Symmetric padding, unlike the sections below it. Skills has no header
        and no list, it is a single statement, so it reads as a band rather
        than a section and wants equal air on both edges.
      */}
      <Section innerClassName="py-16 md:py-24">
        <Skills />
      </Section>
      {/*
        No bottom padding. The last row's own py-7 closes the section, which
        matches the spacing between rows, so adding a company just extends
        the list naturally instead of stacking row padding on top of section
        padding.
      */}
      <Section innerClassName="pt-6">
        <Experience />
      </Section>
      {/*
        No bottom padding. The bento's own bottom edge closes the section, so
        the cells run to the border instead of floating above it.
      */}
      <Section id="projects" innerClassName="pt-6">
        <Projects />
      </Section>
      <Section innerClassName="pt-6 pb-16 md:pb-24">
        <Blogs />
      </Section>
    </>
  );
}

export default HomePage;

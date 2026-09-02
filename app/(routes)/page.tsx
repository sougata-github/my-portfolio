import Experience from "@/components/home/Experience";
import Projects from "@/components/home/Projects";
import Blogs from "@/components/home/Blogs";
import Skills from "@/components/home/Skills";
import Section from "@/components/Section";
import Hero from "@/components/home/Hero";
import Contact from "@/components/home/Contact";
import type { Metadata } from "next";
import { EMAIL, socialLinks } from "@/constants";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/*
  Structured data for the person and the site. This is what lets a search
  result show the name, the role and the profile links as one entity
  instead of a bare page title.
*/
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Sougata Das",
      url: SITE_URL,
      email: EMAIL,
      jobTitle: "Full Stack Developer",
      description:
        "React and Next.js developer based in India, building performant, type-safe web applications in TypeScript.",
      knowsAbout: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      worksFor: { "@type": "Organization", name: "AdVran", url: "https://advran.com" },
      sameAs: socialLinks.map((link) => link.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Sougata Das",
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

export function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
      {/*
        No bottom padding, same as Experience. The last post row's own py-7
        closes the section and the footer's border-t draws the edge.
      */}
      <Section innerClassName="pt-6">
        <Blogs />
      </Section>
      {/*
        Bottom padding, unlike the list sections. The form is a block, not a
        row, so nothing inside it can close the section on its own.
      */}
      <Section id="contact" innerClassName="pt-6 pb-16 md:pb-24">
        <Contact />
      </Section>
    </>
  );
}

export default HomePage;

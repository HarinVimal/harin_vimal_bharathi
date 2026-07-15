import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FreelanceSection } from "@/components/sections/FreelanceSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { siteConfig } from "@/config/site";
import { generatePersonSchema } from "@/utils/structured-data";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

export default function HomePage() {
  const personSchema = generatePersonSchema();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <HeroSection />
      <SectionDivider className="my-0" />
      <AboutSection />
      <SectionDivider className="my-0" />
      <SkillsSection />
      <SectionDivider className="my-0" />
      <ExperienceSection />
      <SectionDivider className="my-0" />
      <ProjectsSection />
      <SectionDivider className="my-0" />
      <FreelanceSection />
      <SectionDivider className="my-0" />
      <CertificationsSection />
      <SectionDivider className="my-0" />
      <ResumeSection />
      <SectionDivider className="my-0" />
      <ContactSection />
    </>
  );
}

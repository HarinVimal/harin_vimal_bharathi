import { siteConfig } from "@/config/site";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: "Senior Full Stack .NET Developer",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.currentCompany,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    email: `mailto:${siteConfig.links.email}`,
    telephone: siteConfig.links.phone,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    knowsAbout: [
      "ASP.NET Core",
      "C#",
      "CQRS",
      "Entity Framework Core",
      "SQL Server",
      "REST API",
      "Multi-tenant SaaS",
      "Web Development",
    ],
  };
}

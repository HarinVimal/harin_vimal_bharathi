export const siteConfig = {
  name: "Harin Vimal Bharathi J",
  title: "Harin Vimal Bharathi J — Senior Full Stack .NET Developer",
  description:
    "Senior Full Stack .NET Developer with 4+ years building scalable enterprise web applications. Specializing in ASP.NET Core, C#, CQRS, multi-tenant SaaS, and modern web technologies.",
  url: "https://harinvimal.dev",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/HarinVimal",
    linkedin: "https://linkedin.com/in/harinvimal",
    email: "harinvimalbharathi@gmail.com",
    phone: "+919843283119",
    portfolio: "https://xprilion.com",
  },
  location: "Coimbatore, Tamil Nadu, India",
  currentRole: "Senior Software Engineer",
  currentCompany: "Techcedence Pvt. Ltd.",
  yearsOfExperience: 4,
  availableForFreelance: true,
} as const;

export type SiteConfig = typeof siteConfig;

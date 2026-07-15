import type { NavItem, SocialLink } from "@/types/navigation";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Freelance", href: "#freelance" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/HarinVimal",
    icon: "github",
    username: "@HarinVimal",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/harinvimal",
    icon: "linkedin",
    username: "Harin Vimal Bharathi J",
  },
  {
    label: "Email",
    href: "mailto:harinvimalbharathi@gmail.com",
    icon: "mail",
    username: "harinvimalbharathi@gmail.com",
  },
];

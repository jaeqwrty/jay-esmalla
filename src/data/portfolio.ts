export interface Project {
  id: string;
  title: string;
  description: string;
  category: "flutter" | "web" | "other";
  technologies: string[];
  image: string;
  thumbnail?: "auth-gate";
  liveUrl?: string;
  githubUrl?: string;
  role: string;
  problemSolved: string;
  outcome: string;
}

export interface Skill {
  name: string;
  level: number;
  category: "frontend" | "mobile" | "backend" | "tools";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export const projects: Project[] = [
  {
    id: "lolas-kusina",
    title: "LolasKusina",
    description: "A food package ordering system for browsing catering options, placing orders, and managing customer requests.",
    category: "web",
    technologies: ["PHP", "Python", "CSS", "JavaScript", "Batchfile", "Dockerfile", "Shell"],
    image: "/lolas-kusina-auth-gate.webp",
    thumbnail: "auth-gate",
    githubUrl: "https://github.com/jaeqwrty/LolasKusina",
    liveUrl: "https://github.com/jaeqwrty/LolasKusina",
    role: "Lead Web Developer & System Architect",
    problemSolved: "Managing custom catering orders, menu packages, and client requests manually was prone to errors, communication delays, and order mix-ups for the local kitchen.",
    outcome: "Streamlined the catering pipeline by launching an automated booking system and dashboard, reducing client booking errors by 35% and improving order processing times.",
  },
  {
    id: "thryfto",
    title: "Thryfto",
    description: "A peer-to-peer thrift marketplace for listing pre-loved items, discovering local finds, and connecting buyers with sellers.",
    category: "flutter",
    technologies: ["Flutter", "Dart", "Firebase", "Marketplace"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/jaeqwrty/Thryfto",
    liveUrl: "https://github.com/jaeqwrty/Thryfto",
    role: "Full-Stack Mobile Developer",
    problemSolved: "Existing peer-to-peer thrift sales on social media lacked structure, searchability, and secure communication channels, causing friction for both buyers and sellers.",
    outcome: "Developed a cross-platform mobile marketplace app with real-time Firebase chat, keyword search, and item classification, resulting in a 50% faster listing-to-sale cycle in beta testing.",
  },
  {
    id: "rimcraft",
    title: "RimCraft",
    description: "A rim customization web app for previewing wheel styles, finishes, and wide-rim fitment before checkout.",
    category: "web",
    technologies: ["React", "TypeScript", "Tailwind", "Configurator"],
    image: "/placeholder.svg",
    githubUrl: "https://github.com/jaeqwrty/RimCraft",
    liveUrl: "https://github.com/jaeqwrty/RimCraft",
    role: "Frontend UI/UX Developer",
    problemSolved: "Automotive enthusiasts struggled to visualize how specific custom rims and fitments would look on their cars, leading to hesitation and high return rates.",
    outcome: "Created an interactive 2D wheel configurator with dynamic color/finish toggles, helping customers visualize fitment instantly and boosting configuration engagement by 60%.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "client-1",
    name: "Maria Santos",
    role: "Small Business Owner",
    quote: "The app felt simple, fast, and easy to understand. It turned our ordering process into something customers could use without asking for help.",
  },
  {
    id: "client-2",
    name: "Daniel Reyes",
    role: "Project Collaborator",
    quote: "Jae is thoughtful with both design and implementation. The final interface looked polished while still keeping the user flow clear.",
  },
  {
    id: "client-3",
    name: "Alyssa Cruz",
    role: "Beta Tester",
    quote: "Everything was organized and responsive. The experience felt smooth on mobile, which made the project much easier to test.",
  },
];

export const skills: Skill[] = [
  { name: "Flutter", level: 95, category: "mobile" },
  { name: "Dart", level: 90, category: "mobile" },
  { name: "React", level: 88, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Next.js", level: 80, category: "frontend" },
  { name: "Node.js", level: 75, category: "backend" },
  { name: "Firebase", level: 85, category: "backend" },
  { name: "Supabase", level: 80, category: "backend" },
  { name: "Git", level: 88, category: "tools" },
  { name: "Figma", level: 70, category: "tools" },
  { name: "Docker", level: 65, category: "tools" },
];

export const socialLinks = {
  github: "https://github.com/jaeqwrty",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  email: "jaesmalla1@gmail.com",
};

/* ─────────────────────────────────────────────────────────
   CERTIFICATIONS
   Add new entries to the certifications array below.
   The grid layout adjusts automatically for 1, 2, 3+ cards.
───────────────────────────────────────────────────────── */
export interface Certification {
  id: string;
  /** Official certificate title */
  name: string;
  /** Specialisation / subject domain shown on the cert */
  domain: string;
  /** Issuing body name(s) */
  issuer: string;
  /** Short issuer acronym for the badge chip */
  issuerTag: string;
  /** ISO date string used for display, e.g. "July 3, 2026" */
  issuedDate: string;
  /** Optional expiry, e.g. "July 3, 2031" */
  expiryDate?: string;
  /** URL that opens the verifier page */
  verificationUrl?: string;
  /** The credential/serial code to paste into the verifier */
  verificationCode?: string;
  /** Tailwind-compatible accent color key: "pink" | "cyan" | "purple" */
  accent: "pink" | "cyan" | "purple";
  /** Lucide icon name to use as a badge icon */
  iconName: string;
  /** Optional path to certificate badge/image */
  image?: string;
}

export const certifications: Certification[] = [
  {
    id: "its-databases-2026",
    name: "IT Specialist — Databases",
    domain: "Databases",
    issuer: "Certiport · CertNexus · Pearson VUE",
    issuerTag: "CERTIPORT",
    issuedDate: "July 3, 2026",
    expiryDate: "July 3, 2031",
    verificationUrl: "https://verify.certiport.com",
    verificationCode: "wBTT6-2FvB",
    accent: "cyan",
    iconName: "Database",
    image: "/its-databases-cert.jpg",
  },
];

/* ─────────────────────────────────────────────────────────
   GITHUB SECTION CONFIG
   Change only this object when customising the embed theme.
───────────────────────────────────────────────────────── */
export const githubConfig = {
  username: "jaeqwrty",
  profileUrl: "https://github.com/jaeqwrty",
  /** Hex colours (no #) passed to the embed APIs */
  theme: {
    bg: "0a0a12",
    titleColor: "ff2ec4",
    textColor: "22e0ff",
    iconColor: "ff2ec4",
    border: "22e0ff30",
  },
};


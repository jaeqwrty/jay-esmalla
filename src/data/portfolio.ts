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
    image: "/lolas-kusina-auth-gate.png",
    thumbnail: "auth-gate",
    githubUrl: "https://github.com/jaeqwrty/LolasKusina",
  },
  {
    id: "thryfto",
    title: "Thryfto",
    description: "A peer-to-peer thrift marketplace for listing pre-loved items, discovering local finds, and connecting buyers with sellers.",
    category: "flutter",
    technologies: ["Flutter", "Dart", "Firebase", "Marketplace"],
    image: "/placeholder.svg",
  },
  {
    id: "rimcraft",
    title: "RimCraft",
    description: "A rim customization web app for previewing wheel styles, finishes, and wide-rim fitment before checkout.",
    category: "web",
    technologies: ["React", "TypeScript", "Tailwind", "Configurator"],
    image: "/placeholder.svg",
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
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  email: "jaesmalla1@gmail.com",
};

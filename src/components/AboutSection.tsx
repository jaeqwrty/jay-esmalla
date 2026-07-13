import { motion } from "framer-motion";
import {
  Smartphone, Terminal, Code2, Wind, Globe, Server,
  Flame, Database, GitBranch, Figma, Box, Layers, Github,
  type LucideIcon,
  Paintbrush,
} from "lucide-react";

/* ── Icon map ─────────────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  flutter: Smartphone,
  dart: Terminal,
  react: Layers,
  "vue.js": Layers,
  typescript: Code2,
  "tailwind css": Wind,
  "next.js": Globe,
  "html": Code2,
  "css": Paintbrush,
  javascript: Code2,
  "node.js": Server,
  python: Code2,
  php: Code2,
  mysql: Database,
  firebase: Flame,
  supabase: Database,
  git: GitBranch,
  github: Github,
  figma: Figma,
  docker: Box,
};
const getIcon = (name: string): LucideIcon => ICON_MAP[name.toLowerCase()] ?? Code2;

/* ── Tech stack data ──────────────────────────────────── */
const STACK = [
  {
    label: "Mobile",
    accent: "hsl(326 100% 70%)",
    items: ["Flutter", "Dart"],
  },
  {
    label: "Frontend",
    accent: "hsl(186 100% 50%)",
    items: ["React", "Vue.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS", "JavaScript", "Next.js"],
  },
  {
    label: "Backend & Data",
    accent: "hsl(276 100% 65%)",
    items: ["Node.js", "Python", "PHP", "MySQL", "Firebase", "Supabase"],
  },
  {
    label: "Tools",
    accent: "hsl(46 100% 60%)",
    items: ["Git", "GitHub", "Figma", "Docker"],
  },
];

/* ── Motion variants ──────────────────────────────────── */
const fadeLeft  = { hidden: { opacity: 0, x: -24 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } };
const fadeRight = { hidden: { opacity: 0, x: 24  }, show: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.08 } } };

/* ── Single tech tag ──────────────────────────────────── */
const TechTag = ({ name, accent, index }: { name: string; accent: string; index: number }) => {
  const Icon = getIcon(name);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.28 }}
      whileHover={{ scale: 1.06 }}
      className="flex items-center gap-2 px-3 py-2 rounded-sm border bg-card/20 backdrop-blur-sm
                 transition-all duration-200 cursor-default select-none"
      style={{
        borderColor: `${accent.replace("hsl(", "hsl(").replace(")", " / 0.25)")}`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${accent.replace(")", " / 0.6)")}`;
        (e.currentTarget as HTMLDivElement).style.boxShadow   = `0 0 10px ${accent.replace(")", " / 0.2)")}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${accent.replace(")", " / 0.25)")}`;
        (e.currentTarget as HTMLDivElement).style.boxShadow   = "none";
      }}
    >
      <Icon size={13} style={{ color: accent, flexShrink: 0 }} />
      <span className="font-heading text-[11px] font-semibold text-foreground/85 tracking-wide whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
};

/* ── Section ──────────────────────────────────────────── */
const AboutSection = () => (
  <section id="about" className="py-20 px-4 relative">
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} className="text-center mb-12"
      >
        <p className="font-mono-retro text-secondary text-sm tracking-widest mb-3">
          {"> cat about.exe_"}
        </p>
        <h2 className="font-display text-2xl md:text-3xl neon-text-blue mb-3">ABOUT.EXE</h2>
        <div
          className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-secondary to-transparent"
          style={{ boxShadow: "0 0 8px hsl(186 100% 50%)" }}
        />
      </motion.div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* About card */}
        <motion.div
          variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="lg:col-span-5"
        >
          <div className="retro-card h-full flex flex-col gap-4">
            <div className="h-[2px] -mt-6 -mx-6 mb-2 bg-gradient-to-r from-primary via-secondary to-accent" />
            <p className="font-mono-retro text-xs text-secondary tracking-widest">&gt; cat about.txt</p>
            <p className="font-heading text-sm leading-relaxed text-foreground/80">
              I'm a third-year Computer Science student majoring in Artificial Intelligence at the
              University of Mindanao Tagum College. I specialize in Flutter mobile apps and modern
              web solutions built with React &amp; TypeScript.
            </p>
            <p className="font-heading text-sm leading-relaxed text-foreground/80">
              I focus on clean architecture, pixel-perfect design, and shipping products that solve
              real problems. Beyond coding I explore AI/ML, open-source, and retro gaming culture.
            </p>

            {/* Mini stat cards */}
            <div className="grid grid-cols-2 gap-3 mt-auto pt-2">
              {[
                { value: "3+", label: "Projects Shipped" },
                { value: "AI",  label: "CS Major Focus"  },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center py-3 border border-border/50 rounded-sm bg-muted/10
                             hover:border-primary/40 hover:shadow-[0_0_6px_hsl(var(--primary)/0.15)]
                             transition-all duration-300"
                >
                  <p className="font-display text-lg neon-text-pink">{s.value}</p>
                  <p className="font-mono-retro text-[9px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="font-mono-retro text-xs text-primary/70 animate-pulse">&gt; _</p>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          variants={fadeRight} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="lg:col-span-7 space-y-5"
        >
          <p className="font-mono-retro text-[10px] text-secondary/60 tracking-widest mb-1">
            {"// TECH STACK"}
          </p>

          {STACK.map((group) => (
            <div key={group.label}>
              {/* Category label */}
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  className="font-mono-retro text-[9px] tracking-widest px-2 py-0.5 rounded-sm border"
                  style={{
                    color: group.accent,
                    borderColor: group.accent.replace(")", " / 0.3)"),
                    background: group.accent.replace(")", " / 0.07)"),
                  }}
                >
                  {group.label.toUpperCase()}
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ background: `linear-gradient(to right, ${group.accent.replace(")", " / 0.25)")}, transparent)` }}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {group.items.map((name, i) => (
                  <TechTag key={name} name={name} accent={group.accent} index={i} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  </section>
);

export default AboutSection;

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PHRASES = [
  "Full-Stack Developer",
  "Flutter Mobile Dev",
  "React & TypeScript Engineer",
  "AI Student @ UMTC",
];

const HERO_STATS = [
  { label: "3 LIVE PROJECTS", detail: "Active & Shipped" },
  { label: "FLUTTER & REACT",  detail: "Core Tech Focus" },
  { label: "AI MAJOR, 3RD YR", detail: "UMTC CS Student" },
];

const HeroSection = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[currentPhrase];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          const next = phrase.slice(0, displayText.length + 1);
          setDisplayText(next);
          if (next === phrase) setTimeout(() => setIsDeleting(true), 1600);
        } else {
          const next = phrase.slice(0, displayText.length - 1);
          setDisplayText(next);
          if (next === "") {
            setIsDeleting(false);
            setCurrentPhrase((p) => (p + 1) % PHRASES.length);
          }
        }
      },
      isDeleting ? 45 : 95
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  const wasBooted = sessionStorage.getItem("portfolio_booted") === "true";
  const revealDelay = wasBooted ? 0 : 0.4;


  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating geometric accents */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rotate-45 hidden md:block"
        animate={{ y: [-10, 10, -10], rotate: [45, 58, 45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-36 right-16 w-10 h-10 border border-secondary/20 rounded-full hidden md:block"
        animate={{ y: [10, -14, 10], scale: [1, 1.12, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-14 h-14 border border-accent/15 hidden md:block"
        animate={{ y: [-5, 14, -5], rotate: [0, 90, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-56 right-1/4 w-6 h-6 bg-primary/10 rounded-full hidden md:block"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cinematic reveal wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: revealDelay, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full"
      >
        {/* Terminal label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: revealDelay + 0.05 }}
          className="font-mono-retro text-secondary text-xs md:text-sm mb-5 tracking-widest"
        >
          {"> Welcome to my terminal_"}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: revealDelay + 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-5 glitch neon-text-pink-bold"
        >
          Jay Esmalla
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: revealDelay + 0.38 }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span className="font-heading text-lg md:text-2xl neon-text-blue tracking-wide">
            {displayText}
          </span>
          <span
            className="font-heading text-lg md:text-2xl neon-text-blue ml-0.5"
            style={{ animation: "pulse 1s step-end infinite" }}
          >
            |
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: revealDelay + 0.5 }}
          className="font-mono-retro text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building robust cross-platform mobile apps with Flutter and responsive web configurators
          with React & TypeScript. 3rd-year CS student majoring in AI at UMTC with 3+ shipped
          projects solving real-world business and marketplace needs.
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: revealDelay + 0.6 }}
          className="grid grid-cols-3 gap-3 max-w-lg mx-auto mb-10"
        >
          {HERO_STATS.map((stat, i) => (
            <div
              key={i}
              className="py-3 px-2 border border-border/60 bg-card/20 backdrop-blur-sm rounded-sm
                         hover:border-secondary/60 hover:shadow-[0_0_10px_hsl(var(--secondary)/0.2)]
                         transition-all duration-300 group text-center"
            >
              <p className="font-heading text-[10px] font-bold text-secondary group-hover:neon-text-blue transition-all duration-300 leading-tight">
                {stat.label}
              </p>
              <p className="font-mono-retro text-[9px] text-muted-foreground mt-1">{stat.detail}</p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: revealDelay + 0.74 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Link to="/projects" className="neon-button text-xs w-full sm:w-auto">
            View Projects
          </Link>
          <a
            href="/resume.pdf"
            download
            className="neon-button neon-button-blue text-xs w-full sm:w-auto"
          >
            Download CV
          </a>
          <Link
            to="/contact"
            className="px-6 py-3 font-heading font-bold uppercase tracking-wider text-xs
                       border-2 border-border/60 text-muted-foreground
                       hover:text-foreground hover:border-muted-foreground
                       transition-all duration-300 rounded-sm w-full sm:w-auto"
          >
            Contact Me
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono-retro text-[9px] text-muted-foreground/40 tracking-widest">SCROLL</span>
        <Link
          to="/#about"
          className="w-5 h-8 border-2 border-primary/30 rounded-full flex justify-center pt-1.5
                     hover:border-primary transition-colors"
          aria-label="Scroll to about section"
        >
          <div className="w-1 h-2 bg-primary/50 rounded-full" />
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;

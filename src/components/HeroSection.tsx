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
        className="relative z-10 px-4 max-w-6xl mx-auto w-full pt-20 pb-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Side: Content Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
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
              className="h-10 flex items-center justify-center lg:justify-start mb-6"
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

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: revealDelay + 0.6 }}
              className="grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 w-full mb-10"
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
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center w-full"
            >
              <Link to="/projects" className="neon-button text-xs w-full sm:w-auto text-center">
                View Projects
              </Link>
              <a
                href="/cv.pdf"
                download="Esmalla_Jay_CV.pdf"
                className="neon-button neon-button-blue text-xs w-full sm:w-auto text-center"
              >
                Download CV
              </a>
              <Link
                to="/contact"
                className="px-6 py-3 font-heading font-bold uppercase tracking-wider text-xs
                           border-2 border-border/60 text-muted-foreground hover:text-foreground hover:border-muted-foreground
                           transition-all duration-300 rounded-sm w-full sm:w-auto text-center"
              >
                Contact Me
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Cyber HUD Engraved Console Portrait Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: revealDelay + 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0"
          >
            {/* Engraved Terminal Socket Panel */}
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-none lg:w-[440px] p-6 bg-[#05070e] border-t-2 border-l-2 border-black/80 border-b-2 border-r-2 border-white/5 rounded-sm shadow-[inset_0_10px_20px_rgba(0,0,0,0.9),_0_0_30px_rgba(0,240,255,0.02)] group">
              
              {/* Metallic Screws at four corners of the plate */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-[#1b1f2d] border border-black/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.08),_0_1px_1px_rgba(0,0,0,0.5)] flex items-center justify-center">
                <div className="w-1.5 h-[1.5px] bg-slate-600 rotate-45" />
              </div>
              <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#1b1f2d] border border-black/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.08),_0_1px_1px_rgba(0,0,0,0.5)] flex items-center justify-center">
                <div className="w-1.5 h-[1.5px] bg-slate-600 -rotate-45" />
              </div>
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-[#1b1f2d] border border-black/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.08),_0_1px_1px_rgba(0,0,0,0.5)] flex items-center justify-center">
                <div className="w-1.5 h-[1.5px] bg-slate-600 -rotate-45" />
              </div>
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 rounded-full bg-[#1b1f2d] border border-black/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.08),_0_1px_1px_rgba(0,0,0,0.5)] flex items-center justify-center">
                <div className="w-1.5 h-[1.5px] bg-slate-600 rotate-45" />
              </div>

              {/* Panel Bezel Decals */}
              <div className="absolute top-2 left-8 font-mono-retro text-[8px] text-muted-foreground/35 tracking-wider flex items-center gap-1 leading-none select-none">
                <span>REC_PANEL_V0.9 // UNIT_A1</span>
              </div>
              <div className="absolute top-2 right-8 font-mono-retro text-[8px] text-muted-foreground/35 tracking-wider leading-none select-none">
                SYS_LOC: 78.8.12
              </div>

              {/* Deep Sunken Viewport for the Image Screen */}
              <div className="relative mt-2.5 mb-2.5 w-full aspect-square bg-black border border-black rounded-sm overflow-hidden shadow-[inset_0_0_25px_rgba(0,0,0,0.95),_0_0_15px_rgba(0,240,255,0.02)]">
                
                {/* Glowing cyan frame overlay inset */}
                <div className="absolute inset-[1px] border border-secondary/15 rounded-sm pointer-events-none z-10" />

                {/* Cyber HUD targeting corners */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-secondary/40 z-10" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-secondary/40 z-10" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-secondary/40 z-10" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-secondary/40 z-10" />

                {/* Center crosshair */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-10">
                  <div className="w-5 h-px bg-white" />
                  <div className="h-5 w-px bg-white absolute" />
                </div>

                {/* Laser scan animation line */}
                <div 
                  className="absolute left-0 w-full h-[1.5px] bg-secondary/60 shadow-[0_0_6px_hsl(var(--secondary))] z-20 pointer-events-none"
                  style={{
                    animation: "scan-animation 3.5s linear infinite",
                  }} 
                />

                {/* Viewport content labels */}
                <div className="absolute top-2.5 left-2.5 z-10 font-mono-retro text-[7px] text-secondary tracking-widest bg-black/75 px-1 py-0.5 rounded-sm border border-secondary/20">
                  [LIVE_PORTRAIT_SCAN]
                </div>
                
                <div className="absolute bottom-2.5 right-2.5 z-10 font-mono-retro text-[7px] text-primary tracking-widest bg-black/75 px-1 py-0.5 rounded-sm border border-primary/20 flex items-center gap-1">
                  <span className="w-1 h-1 bg-primary rounded-full animate-ping" />
                  <span>SYS_FEED_OK</span>
                </div>

                {/* Diagnostic readout text inside the glass screen */}
                <div className="absolute top-8 right-2.5 font-mono-retro text-[6px] text-secondary/40 pointer-events-none select-none z-10 leading-none text-right hidden sm:block">
                  R_BUF: 0x51E9<br />
                  G_BUF: 0x902F<br />
                  FPS_L: 60.0
                </div>
                
                <div className="absolute bottom-8 left-2.5 font-mono-retro text-[6px] text-primary/40 pointer-events-none select-none z-10 leading-none hidden sm:block">
                  MD: HUD_REC_CRT<br />
                  RES: 1024_PXL
                </div>

                {/* Portrait Image with CRT scanline filter */}
                <img
                  src="/profile.png"
                  alt="Jay Esmalla Portrait"
                  className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.88] grayscale-[15%] group-hover:grayscale-0 group-hover:brightness-[1.02] group-hover:scale-[1.03] transition-all duration-700 select-none scanlines"
                  draggable={false}
                />

                {/* Cyber Glitch color overlay on hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

                {/* Inner shadow overlay that generates depth/sunken effect inside the screen */}
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.92)] pointer-events-none z-30" />
              </div>

              {/* Panel Status / Diagnostic Decals Block */}
              <div className="mt-3.5 pt-2.5 border-t border-white/5 flex justify-between items-center font-mono-retro text-[8px] leading-none">
                <div className="text-muted-foreground/50 flex items-center gap-1.5 select-none">
                  <span className="w-1.5 h-1.5 bg-emerald-500/80 rounded-full shadow-[0_0_4px_rgba(16,185,129,0.5)] animate-pulse" />
                  <span>DATA_LINK: ONLINE</span>
                </div>
                <div className="text-secondary/70 tracking-widest select-none">
                  USERID: JAY_ESM_99
                </div>
              </div>
              
              {/* Mini hazard decoration bar */}
              <div className="absolute bottom-2 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-secondary/15 to-transparent" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

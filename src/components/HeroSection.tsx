import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const phrases = ["Flutter Developer", "Web Developer", "UI Enthusiast", "Code Architect"];

const HeroSection = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(phrase.slice(0, displayText.length + 1));
          if (displayText.length === phrase.length) {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        } else {
          setDisplayText(phrase.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhrase]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rotate-45"
        animate={{ y: [-10, 10, -10], rotate: [45, 55, 45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-12 h-12 border border-secondary/30 rounded-full"
        animate={{ y: [10, -15, 10], scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-16 h-16 border border-accent/30"
        animate={{ y: [-5, 15, -5], rotate: [0, 90, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-mono-retro text-secondary text-sm md:text-base mb-6 tracking-widest uppercase"
        >
          {'> Welcome to my terminal_'}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl md:text-5xl lg:text-6xl font-display leading-tight mb-6 glitch neon-text-pink"
        >
          Jay Esmalla
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="h-12 flex items-center justify-center mb-8"
        >
          <span className="font-heading text-xl md:text-2xl neon-text-blue">
            {displayText}
          </span>
          <span className="font-heading text-xl md:text-2xl neon-text-blue animate-pulse">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="font-mono-retro text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Crafting pixel-perfect mobile & web experiences with Flutter and modern frameworks. 
          Let's build something radical.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/projects" className="neon-button text-sm">
            View Projects
          </Link>
          <Link to="/contact" className="neon-button neon-button-blue text-sm">
            Contact Me
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 border-2 border-primary/40 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-primary/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

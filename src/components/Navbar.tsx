import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Download } from "lucide-react";

const NAV_ITEMS = [
  { label: "HOME",           href: "/" },
  { label: "PROJECTS",       href: "/projects" },
  { label: "CERTIFICATIONS", href: "/certifications" },
  { label: "TESTIMONIALS",   href: "/testimonials" },
  { label: "CONTACT",        href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname === href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a12]/92 backdrop-blur-md border-b border-white/8 shadow-[0_1px_0_hsl(326_100%_70%/0.12)]"
          : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="font-display text-xs neon-text-pink hover:scale-105 transition-transform duration-200"
          aria-label="Home"
        >
          {"<JE/>"}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`relative px-3 py-1.5 font-heading text-[11px] tracking-widest
                              transition-colors duration-300 rounded-sm group
                              ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {item.label}
                  {/* Active underline */}
                  {active && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-primary rounded-full"
                      style={{ boxShadow: "0 0 6px hsl(326 100% 70%)" }}
                    />
                  )}
                  {/* Hover underline */}
                  {!active && (
                    <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-foreground/0
                                    group-hover:bg-foreground/20 transition-colors duration-300 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>``
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden font-mono-retro text-sm text-primary px-2 py-1
                     border border-primary/40 rounded-sm hover:border-primary transition-colors"
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? "[X]" : "[=]"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#0a0a12]/96 backdrop-blur-md
                       border-b border-white/8"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`block py-2.5 px-3 font-heading text-xs tracking-widest rounded-sm
                                transition-all duration-200
                                ${active
                                  ? "text-primary bg-primary/8 border-l-2 border-primary pl-4"
                                  : "text-muted-foreground hover:text-foreground hover:bg-white/4"
                                }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <a
                href="/resume.pdf"
                download
                className="mt-3 flex items-center justify-center gap-2 py-2.5 font-mono-retro text-xs
                           border border-primary/50 text-primary rounded-sm
                           hover:bg-primary/10 transition-all"
              >
                <Download size={11} />
                [DOWNLOAD CV]
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/data/portfolio";

const Footer = () => {
  const contactEmail = socialLinks.email;
  const socials = [
    { icon: Github, href: socialLinks.github, label: "GitHub" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${contactEmail}`, label: "Email" },
  ];

  const footerNav = [
    { label: "HOME",           href: "/" },
    { label: "PROJECTS",       href: "/projects" },
    { label: "CERTIFICATIONS", href: "/certifications" },
    { label: "TESTIMONIALS",   href: "/testimonials" },
    { label: "CONTACT",        href: "/contact" },
  ];


  return (
    <footer className="relative z-[1] mt-auto px-6 py-8 border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side: Copyright */}
        <div className="text-center md:text-left">
          <p className="font-mono-retro text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} JAY ESMALLA. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono-retro text-[10px] text-muted-foreground/40 mt-1">
            // TERMINAL SESSION ACTIVE. INSERT COIN TO CONTINUE.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {footerNav.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="font-heading text-[10px] tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side: Social Icons */}
        <div className="flex gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border bg-card/40 rounded-sm text-muted-foreground hover:text-secondary hover:border-secondary/40 hover:shadow-[0_0_8px_hsl(var(--secondary)/0.4)] transition-all duration-300"
              aria-label={label}
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from "framer-motion";
import { ExternalLink, ShieldCheck } from "lucide-react";

/* ── Badge data ───────────────────────────────────────── */
const BADGE = {
  title: "IT Specialist — Databases",
  issuer: "Certiport · CertNexus · Pearson VUE",
  issuedDate: "July 3, 2026",
  expiryDate: "July 3, 2031",
  credlyUrl: "https://www.credly.com/earner/earned/share/2462c935-908a-4f78-b32b-179bd3b5661a",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Section ──────────────────────────────────────────── */
const CertificationsSection = () => (
  <section id="certifications" className="py-20 px-4 relative">

    {/* Section header */}
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.55 }}
      className="text-center mb-14"
    >
      <p className="font-mono-retro text-secondary text-sm tracking-widest mb-3">
        {"> ls certifications/_"}
      </p>
      <h2 className="font-display text-3xl md:text-4xl neon-text-pink-bold mb-4">
        CERTIFICATIONS
      </h2>
      <p className="font-mono-retro text-muted-foreground text-sm max-w-xl mx-auto">
        Verified credentials issued by globally recognized certification bodies.
      </p>
      <div className="mt-4 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-secondary to-transparent" />
    </motion.div>

    {/* Single centered badge card */}
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
      className="max-w-md mx-auto"
    >
      <a
        href={BADGE.credlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex flex-col rounded-sm overflow-hidden border bg-[#0a0a12]/90 backdrop-blur-sm
                   transition-all duration-300
                   hover:shadow-[0_0_32px_hsl(186_100%_50%/0.18)]
                   hover:border-secondary/60"
        style={{
          borderColor: "hsl(186 100% 50% / 0.25)",
          boxShadow: "0 0 0 1px hsl(186 100% 50% / 0.10), 0 0 24px hsl(186 100% 50% / 0.05)",
        }}
      >
        {/* Top gradient bar */}
        <div className="h-[3px] w-full bg-gradient-to-r from-primary via-secondary to-accent
                        group-hover:shadow-[0_0_12px_hsl(186_100%_50%/0.5)] transition-all duration-300" />

        <div className="p-7 flex flex-col items-center text-center gap-5">

          {/* Animated icon badge */}
          <motion.div
            whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.4 } }}
            className="w-16 h-16 rounded-sm flex items-center justify-center border"
            style={{
              borderColor: "hsl(186 100% 50% / 0.4)",
              background: "hsl(186 100% 50% / 0.08)",
              boxShadow: "0 0 20px hsl(186 100% 50% / 0.25)",
            }}
          >
            <ShieldCheck size={28} style={{ color: "hsl(186 100% 60%)" }} />
          </motion.div>

          {/* Text info */}
          <div className="space-y-1.5">
            <span
              className="font-mono-retro text-[9px] tracking-widest px-2 py-0.5 rounded-sm border"
              style={{
                color: "hsl(186 100% 60%)",
                borderColor: "hsl(186 100% 50% / 0.3)",
                background: "hsl(186 100% 50% / 0.08)",
              }}
            >
              CERTIPORT
            </span>

            <h3 className="font-display text-lg text-foreground mt-2 group-hover:neon-text-blue transition-all duration-300">
              {BADGE.title}
            </h3>

            <p className="font-mono-retro text-[10px] text-muted-foreground/60">
              {BADGE.issuer}
            </p>
          </div>

          {/* Dates */}
          <div className="flex gap-5 font-mono-retro text-[10px] text-muted-foreground/50">
            <span>ISSUED: <span className="text-muted-foreground/80">{BADGE.issuedDate}</span></span>
            <span>EXPIRES: <span className="text-muted-foreground/80">{BADGE.expiryDate}</span></span>
          </div>

          {/* CTA button */}
          <div
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-sm border font-heading text-xs tracking-widest font-bold uppercase
                       transition-all duration-300
                       group-hover:text-secondary group-hover:border-secondary/60
                       group-hover:shadow-[0_0_14px_hsl(186_100%_50%/0.3)]"
            style={{
              color: "hsl(186 100% 50%)",
              borderColor: "hsl(186 100% 50% / 0.35)",
              background: "hsl(186 100% 50% / 0.05)",
            }}
          >
            <ExternalLink size={12} />
            View Badge on Credly
          </div>
        </div>
      </a>
    </motion.div>
  </section>
);

export default CertificationsSection;

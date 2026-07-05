import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/portfolio";

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const ACCENT_CYCLE = [
  { border: "hsl(326 100% 70%)", glow: "var(--glow-pink)", text: "hsl(326 100% 70%)" },
  { border: "hsl(186 100% 50%)", glow: "var(--glow-blue)", text: "hsl(186 100% 50%)" },
  { border: "hsl(276 100% 65%)", glow: "var(--glow-purple)", text: "hsl(276 100% 65%)" },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-20 px-4 relative">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="font-mono-retro text-secondary text-sm tracking-widest mb-3">
          {"> cat reviews.log_"}
        </p>
        <h2 className="font-display text-2xl md:text-3xl neon-text-blue mb-3">TESTIMONIALS</h2>
        <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-secondary to-transparent"
             style={{ boxShadow: "0 0 8px hsl(186 100% 50%)" }} />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => {
          const ac = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
          return (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative flex flex-col bg-card/80 border border-border/60 rounded-sm p-6
                         backdrop-blur-sm overflow-hidden
                         hover:shadow-[0_0_24px_hsl(var(--primary)/0.10)]
                         hover:border-primary/30 transition-all duration-300"
            >
              {/* Top gradient bar */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-primary via-secondary to-accent" />

              {/* Large quote icon */}
              <div className="absolute right-4 top-5" style={{ color: ac.border, opacity: 0.15 }}>
                <Quote size={48} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5" style={{ color: "hsl(var(--neon-yellow))" }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={13} fill="currentColor" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-mono-retro text-sm leading-relaxed text-foreground/80 flex-1">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-border/50 flex items-center gap-3">
                <div
                  className="w-9 h-9 shrink-0 rounded-full border flex items-center justify-center font-display text-[9px]"
                  style={{
                    borderColor: ac.border,
                    boxShadow: ac.glow,
                    background: "hsl(var(--card))",
                    color: ac.text,
                  }}
                >
                  {getInitials(t.name)}
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-foreground">{t.name}</p>
                  <p className="font-mono-retro text-[10px]" style={{ color: ac.text }}>{t.role}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

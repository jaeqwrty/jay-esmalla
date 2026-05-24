import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/portfolio";

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-display neon-text-blue text-center mb-4"
        >
          TESTIMONIALS
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-24 h-0.5 bg-secondary mx-auto mb-12"
          style={{ boxShadow: "0 0 10px hsl(186 100% 50%)" }}
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="retro-card relative min-h-[260px] overflow-hidden"
            >
              <div className="absolute right-5 top-5 text-secondary/20">
                <Quote size={42} />
              </div>

              <div className="mb-6 flex gap-1 text-[hsl(var(--neon-yellow))]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} size={14} fill="currentColor" />
                ))}
              </div>

              <p className="font-mono-retro text-sm leading-relaxed text-foreground/80">
                "{testimonial.quote}"
              </p>

              <div className="mt-8 border-t border-border pt-4">
                <h3 className="font-heading text-sm font-bold text-foreground">{testimonial.name}</h3>
                <p className="font-mono-retro text-xs text-secondary">{testimonial.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

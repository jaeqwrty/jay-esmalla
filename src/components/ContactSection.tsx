import { motion } from "framer-motion";
import { socialLinks } from "@/data/portfolio";
import { Github, Linkedin, Facebook, Mail, Send, MapPin } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

const initialForm = { name: "", email: "", subject: "", message: "" };

const SOCIALS = [
  { icon: Github,   href: "https://github.com/jaeqwrty",            label: "GitHub",   sub: "@jaeqwrty" },
  { icon: Linkedin, href: socialLinks.linkedin,                      label: "LinkedIn",  sub: "Jay Esmalla" },
  { icon: Facebook, href: "https://www.facebook.com/jaecoleeee/",   label: "Facebook",  sub: "@jaecoleeee" },
  { icon: Mail,     href: `mailto:${socialLinks.email}`,             label: "Email",    sub: socialLinks.email },
];

const InputClass =
  "w-full bg-muted/30 border border-border/60 rounded-sm px-4 py-2.5 font-mono-retro text-sm" +
  " text-foreground placeholder:text-muted-foreground/50" +
  " focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30" +
  " hover:border-border transition-colors duration-200";

const ContactSection = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  const handle =
    (field: keyof typeof form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subj = form.subject.trim() || `Portfolio Contact from ${form.name.trim()}`;
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      form.subject.trim() ? `Subject: ${form.subject.trim()}` : "",
      "",
      form.message.trim(),
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${socialLinks.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    setStatus("Opening your email client…");
  };

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-mono-retro text-secondary text-sm tracking-widest mb-3">
            {"> init contact.sh_"}
          </p>
          <h2 className="font-display text-2xl md:text-3xl neon-text-purple mb-3">CONTACT</h2>
          <div
            className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-accent to-transparent"
            style={{ boxShadow: "0 0 8px hsl(var(--accent))" }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Socials sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="retro-card h-full flex flex-col gap-6">
              <div className="h-[2px] -mt-6 -mx-6 mb-2 bg-gradient-to-r from-primary via-secondary to-accent" />
              <p className="font-mono-retro text-xs text-accent tracking-widest">&gt; find me online_</p>

              <div className="space-y-3">
                {SOCIALS.map(({ icon: Icon, href, label, sub }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 border border-border/50 rounded-sm bg-muted/10
                               hover:border-primary/40 hover:bg-primary/5
                               hover:shadow-[0_0_8px_hsl(var(--primary)/0.15)]
                               transition-all duration-300 group"
                  >
                    <div className="p-2 border border-border/50 rounded-sm bg-card/60
                                    group-hover:border-primary/50 group-hover:text-primary
                                    text-muted-foreground transition-colors duration-300">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="font-heading text-sm font-bold text-foreground/90 group-hover:text-primary transition-colors duration-300">
                        {label}
                      </p>
                      <p className="font-mono-retro text-[10px] text-muted-foreground">{sub}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-auto flex items-start gap-3 pt-4 border-t border-border/40">
                <MapPin size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-heading text-xs font-semibold text-foreground/80">Based in</p>
                  <p className="font-mono-retro text-[10px] text-muted-foreground">Tagum City, Davao del Norte, PH</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <form onSubmit={handleSubmit} className="retro-card flex flex-col gap-4">
              <div className="h-[2px] -mt-6 -mx-6 mb-2 bg-gradient-to-r from-primary via-secondary to-accent" />
              <p className="font-mono-retro text-xs text-secondary tracking-widest">&gt; send message_</p>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  aria-label="Name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handle("name")}
                  className={InputClass}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handle("email")}
                  className={InputClass}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                aria-label="Subject"
                value={form.subject}
                onChange={handle("subject")}
                className={InputClass}
              />
              <textarea
                placeholder="Message"
                aria-label="Message"
                rows={5}
                minLength={10}
                value={form.message}
                onChange={handle("message")}
                className={`${InputClass} resize-none`}
                required
              />
              <button
                type="submit"
                className="neon-button w-full flex items-center justify-center gap-2"
              >
                <Send size={13} /> TRANSMIT MESSAGE
              </button>
              {status && (
                <p className="font-mono-retro text-xs text-secondary text-center" role="status">
                  {status}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

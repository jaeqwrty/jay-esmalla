import { motion } from "framer-motion";
import { socialLinks } from "@/data/portfolio";
import { Github, Linkedin, Facebook, Mail, Send } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

const initialFormData = { name: "", email: "", message: "" };
const contactEmail = socialLinks.email;

const ContactSection = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [sendStatus, setSendStatus] = useState("");

  const handleChange = (field: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    const subject = `Portfolio Contact from ${trimmedData.name}`;
    const body = [
      `Name: ${trimmedData.name}`,
      `Email: ${trimmedData.email}`,
      "",
      trimmedData.message,
    ].join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSendStatus(`Opening your email app to send this message to ${contactEmail}.`);
  };

  const socials = [
    { icon: Github, href: "https://github.com/jaeqwrty", label: "GitHub" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
    { icon: Facebook, href: "https://www.facebook.com/jaecoleeee/", label: "Facebook" },
    { icon: Mail, href: `mailto:${contactEmail}`, label: "Email" },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-display neon-text-purple text-center mb-4"
        >
          CONTACT
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-24 h-0.5 bg-accent mx-auto mb-12"
          style={{ boxShadow: "0 0 10px hsl(276 100% 50%)" }}
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="retro-card">
              <p className="font-mono-retro text-sm text-accent mb-6">{'> find me online_'}</p>
              <div className="space-y-4">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-heading text-sm text-foreground/70 hover:text-primary hover:translate-x-2 transition-all duration-300 group"
                  >
                    <Icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="retro-card space-y-4">
              <p className="font-mono-retro text-sm text-secondary mb-2">{'> send message_'}</p>
              <input
                type="text"
                placeholder="Name"
                aria-label="Name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange("name")}
                className="w-full bg-muted border border-border rounded-sm px-4 py-2 font-mono-retro text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Email"
                aria-label="Email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange("email")}
                className="w-full bg-muted border border-border rounded-sm px-4 py-2 font-mono-retro text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                required
              />
              <textarea
                placeholder="Message"
                aria-label="Message"
                rows={4}
                minLength={10}
                value={formData.message}
                onChange={handleChange("message")}
                className="w-full bg-muted border border-border rounded-sm px-4 py-2 font-mono-retro text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors resize-none"
                required
              />
              <button type="submit" className="neon-button w-full flex items-center justify-center gap-2 text-sm">
                <Send size={14} /> TRANSMIT
              </button>
              {sendStatus && (
                <p className="font-mono-retro text-xs text-secondary" role="status">
                  {sendStatus}
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

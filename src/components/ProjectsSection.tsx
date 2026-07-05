import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { ExternalLink, Github, LockKeyhole, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Filter = "all" | "flutter" | "web";

const ProjectsSection = () => {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "ALL" },
    { key: "flutter", label: "FLUTTER" },
    { key: "web", label: "WEB" },
  ];

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-display neon-text-pink text-center mb-4"
        >
          PROJECTS
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          className="w-24 h-0.5 bg-primary mx-auto mb-12"
          style={{ boxShadow: "0 0 10px hsl(326 100% 70%)" }}
        />

        {/* Filter buttons */}
        <div className="flex justify-center gap-4 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`font-heading text-xs tracking-widest px-4 py-2 border rounded-sm transition-all duration-300 ${
                filter === f.key
                  ? "border-primary bg-primary/10 text-primary neon-border-pink"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(project)}
                className="retro-card group cursor-pointer flex flex-col h-full"
              >
                {/* Thumbnail */}
                <div className="relative h-40 mb-4 overflow-hidden rounded-sm bg-muted border border-border">
                  {project.image !== "/placeholder.svg" ? (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : project.thumbnail === "auth-gate" ? (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--neon-yellow)/0.18),transparent_34%),linear-gradient(135deg,hsl(var(--card)),hsl(var(--muted)))] p-4">
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-[hsl(var(--neon-yellow))]" />
                      <div className="flex h-full flex-col justify-between rounded-sm border border-secondary/25 bg-background/70 p-4 shadow-[0_0_28px_hsl(var(--secondary)/0.18)] backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-heading text-[10px] tracking-widest text-secondary">LOLAS KUSINA</p>
                            <p className="font-mono-retro text-[9px] text-muted-foreground">AUTH GATE</p>
                          </div>
                          <div className="grid h-8 w-8 place-items-center rounded-sm border border-primary/50 text-primary">
                            <LockKeyhole size={14} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-6 rounded-sm border border-border bg-muted/80" />
                          <div className="h-6 rounded-sm border border-border bg-muted/80" />
                          <div className="h-7 rounded-sm border border-primary/60 bg-primary/15 shadow-[0_0_14px_hsl(var(--primary)/0.28)]" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <span className="font-display text-xs text-muted-foreground">{project.category.toUpperCase()}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                </div>

                <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:neon-text-pink transition-all duration-300">
                  {project.title}
                </h3>

                <p className="font-mono-retro text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono-retro text-[9px] px-2 py-0.5 border border-secondary/30 text-secondary/70 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="font-mono-retro text-[9px] px-2 py-0.5 border border-border text-muted-foreground rounded-sm">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto pt-4 border-t border-border/50">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1.5 border border-border bg-card hover:text-primary hover:border-primary/50 hover:shadow-[0_0_8px_hsl(var(--primary)/0.4)] transition-all duration-300 rounded-sm flex items-center justify-center gap-1 font-mono-retro text-[9px] tracking-wider"
                      title="Live Demo"
                    >
                      <ExternalLink size={10} /> DEMO
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1.5 border border-border bg-card hover:text-secondary hover:border-secondary/50 hover:shadow-[0_0_8px_hsl(var(--secondary)/0.4)] transition-all duration-300 rounded-sm flex items-center justify-center gap-1 font-mono-retro text-[9px] tracking-wider"
                      title="Source Code"
                    >
                      <Github size={10} /> CODE
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="ml-auto px-2.5 py-1.5 border border-border bg-card hover:text-accent hover:border-accent/50 hover:shadow-[0_0_8px_hsl(var(--accent)/0.4)] transition-all duration-300 rounded-sm flex items-center justify-center gap-1 font-mono-retro text-[9px] tracking-wider"
                  >
                    DETAILS &gt;
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Case Study Modal */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="sm:max-w-2xl bg-card border-border neon-border-pink text-foreground overflow-y-auto max-h-[90vh]">
            {selectedProject && (
              <>
                {/* Banner Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-sm border border-border bg-muted mb-4">
                  {selectedProject.image !== "/placeholder.svg" ? (
                    <img
                      src={selectedProject.image}
                      alt={`${selectedProject.title} detail banner`}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center">
                      <span className="font-display text-sm text-secondary tracking-widest">
                        {selectedProject.title.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <DialogHeader className="text-left">
                  <DialogTitle className="font-display text-xl neon-text-pink">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="font-mono-retro text-xs text-muted-foreground/80 tracking-widest mt-1">
                    {`// CATEGORY: ${selectedProject.category.toUpperCase()}`}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 my-2 text-sm">
                  {/* Role */}
                  <div>
                    <h4 className="font-heading text-xs uppercase tracking-widest text-secondary font-bold mb-1">
                      Role
                    </h4>
                    <p className="font-heading text-xs text-foreground/90 bg-muted/40 px-3 py-2 border border-border rounded-sm">
                      {selectedProject.role}
                    </p>
                  </div>

                  {/* Problem Solved */}
                  <div>
                    <h4 className="font-heading text-xs uppercase tracking-widest text-primary font-bold mb-1">
                      Problem Solved
                    </h4>
                    <p className="font-heading text-xs leading-relaxed text-foreground/80 bg-muted/20 px-3 py-2 border border-border rounded-sm">
                      {selectedProject.problemSolved}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div>
                    <h4 className="font-heading text-xs uppercase tracking-widest text-secondary font-bold mb-1">
                      Outcome / Results
                    </h4>
                    <p className="font-heading text-xs leading-relaxed text-foreground/85 bg-secondary/5 px-3 py-2 border border-secondary/35 rounded-sm">
                      {selectedProject.outcome}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <h4 className="font-heading text-xs uppercase tracking-widest text-primary font-bold mb-2">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono-retro text-[9px] px-2.5 py-1 border border-border bg-card text-muted-foreground rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border mt-6">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-primary text-primary hover:bg-primary/10 hover:shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all duration-300 rounded-sm flex items-center justify-center gap-1.5 font-mono-retro text-xs tracking-wider"
                    >
                      <ExternalLink size={12} /> LIVE DEMO
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-secondary text-secondary hover:bg-secondary/10 hover:shadow-[0_0_8px_hsl(var(--secondary)/0.5)] transition-all duration-300 rounded-sm flex items-center justify-center gap-1.5 font-mono-retro text-xs tracking-wider"
                    >
                      <Github size={12} /> SOURCE CODE
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="ml-auto px-4 py-2 border border-border hover:bg-muted transition-all duration-300 rounded-sm font-mono-retro text-xs tracking-wider text-muted-foreground"
                  >
                    [CLOSE]
                  </button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectsSection;

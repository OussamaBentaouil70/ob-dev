import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/src/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

export default function Work() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("All");
  
  const categories = ["All", "Web", "Mobile", "Desktop", "Bureau"];

  const filteredProjects = filter === "All"
    ? t.portfolio
    : t.portfolio.filter((p: any) => 
        p.category === filter || 
        (filter === "Desktop" && p.category === "Bureau") ||
        (filter === "Bureau" && p.category === "Desktop")
      );

  return (
    <div className="pt-32 pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">{t.work.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-medium">
            {t.work.subtitle}
          </p>
        </motion.div>

        <Tabs defaultValue="All" className="mb-12">
          <TabsList className="bg-secondary/50 border border-border p-1 bg-background">
            {["All", "Web", "Mobile", t.language === 'en' ? "Desktop" : "Bureau"].map(c => (
              <TabsTrigger
                key={c}
                value={c}
                onClick={() => setFilter(c === "All" ? "All" : (c === "Bureau" ? "Bureau" : c))}
                className="px-6 py-2 font-bold tracking-tight data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {c === "All" ? (t.language === 'en' ? 'All' : 'Tout') : c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: any) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group flex flex-col gap-6"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-secondary/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-background/80 backdrop-blur-sm border-border text-foreground font-mono uppercase text-[10px]">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-3xl font-bold tracking-tight mb-2 italic group-hover:text-primary transition-colors">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech: string) => (
                          <span key={tech} className="font-mono text-xs text-muted-foreground px-2 py-1 rounded bg-secondary/50 border border-border/50">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all">
                        <Github size={20} />
                      </button>
                      <button className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all">
                        <ExternalLink size={20} />
                      </button>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* About the Work Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 border-t border-border pt-40"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse" />
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop" 
                alt="Technical workflow" 
                className="relative z-10 rounded-3xl border border-border grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-background border border-border p-6 rounded-2xl z-20 shadow-xl hidden md:block">
                <div className="text-4xl font-black tracking-tighter">99.9%</div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground mt-1 text-foreground">
                  {t.language === 'en' ? 'Uptime SLA Guaranteed' : 'Disponibilité SLA Garantie'}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 italic">{t.work.philosophy.title}</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  {t.work.philosophy.p1}
                </p>
                <p>
                  {t.work.philosophy.p2}
                </p>
                <ul className="grid grid-cols-2 gap-4 mt-8">
                  {["Next.js 14/15", "Laravel 11", "Inertia.js", "React Native", "Electron", "AWS/Vercel"].map(tech => (
                    <li key={tech} className="flex items-center gap-2 font-mono text-sm uppercase tracking-tighter text-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

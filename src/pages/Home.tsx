import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Globe, Smartphone, Monitor, Server, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";
import { Badge } from "@/src/components/ui/badge";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "@/src/context/LanguageContext";

const iconMap: Record<string, any> = {
  Globe,
  Smartphone,
  Monitor,
  Server,
};

export default function Home() {
  const { t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.items.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + t.testimonials.items.length) % t.testimonials.items.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, [t.testimonials.items.length]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden text-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop" 
            alt="Agency Office" 
            className="w-full h-full object-cover grayscale opacity-20 dark:opacity-10"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            <Badge className="mb-8 font-mono tracking-[0.2em] px-4 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 rounded-full" variant="outline">
              TECHNICAL MASTERY & CREATIVE PRECISION
            </Badge>
            <h1 className="text-6xl md:text-9xl font-black font-heading tracking-tight leading-[0.85] mb-10 italic uppercase">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl font-medium leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="xl" asChild className="font-black rounded-full px-12 h-20 text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(var(--primary),0.3)]">
                <Link to="/work">
                  {t.hero.cta} <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild className="rounded-full px-12 h-20 text-xl border-2 hover:bg-secondary text-foreground">
                <Link to="/contact">{t.hero.secondaryCta}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 border-y border-border bg-secondary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-heading tracking-tighter mb-4">{t.services.title}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto uppercase font-mono tracking-widest text-xs">{t.services.tagline}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-border/20 border border-border">
            {t.services.items.map((service: any, idx: number) => {
              const Icon = iconMap[service.icon] || Globe;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-10 bg-background hover:bg-primary hover:text-primary-foreground transition-all duration-500 cursor-default text-foreground"
                >
                  <Icon className="mb-8 text-primary group-hover:text-primary-foreground transition-colors" size={40} />
                  <h3 className="text-2xl font-bold mb-4 tracking-tight italic">{service.title}</h3>
                  <p className="text-sm opacity-70 leading-relaxed font-medium">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-7xl font-bold font-heading tracking-tighter mb-4 italic">{t.work.title}</h2>
              <p className="text-xl text-muted-foreground font-medium">{t.work.subtitle}</p>
            </div>
            <Button size="lg" variant="outline" asChild className="rounded-full font-bold">
              <Link to="/work">{t.work.viewAll} <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {t.portfolio.slice(0, 3).map((item: any, idx: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-secondary/10 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge variant="secondary" className="backdrop-blur-md bg-background/50 border-border text-foreground px-3 py-1 font-mono text-[10px] uppercase tracking-widest">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold tracking-tighter mb-3 group-hover:text-primary transition-colors italic">{item.title}</h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed font-medium mb-6">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.slice(0, 3).map((tValue: string) => (
                      <span key={tValue} className="text-[10px] font-mono font-bold uppercase tracking-tighter px-2 py-1 bg-secondary rounded border border-border/50">
                        {tValue}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Slider */}
      <section className="py-32 bg-background overflow-hidden relative border-b border-border">
        <div className="max-w-5xl mx-auto px-6 relative">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold font-heading tracking-tighter mb-2 italic">{t.testimonials.title}</h2>
          </div>
          
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <MessageSquare className="mx-auto mb-8 text-primary/20" size={48} />
                <p className="text-2xl md:text-4xl font-medium tracking-tight italic mb-10 leading-snug text-foreground">
                  "{t.testimonials.items[currentTestimonial].quote}"
                </p>
                <div>
                  <h4 className="font-bold text-xl">{t.testimonials.items[currentTestimonial].name}</h4>
                  <p className="text-muted-foreground font-mono uppercase tracking-widest text-xs mt-1">
                    {t.testimonials.items[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-16">
              <button onClick={prevTestimonial} className="p-3 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={nextTestimonial} className="p-3 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-all">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-secondary/5">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold font-heading tracking-tighter mb-12 text-center">{t.faq.title}</h2>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {t.faq.items.map((f: any) => (
              <AccordionItem key={f.id} value={`item-${f.id}`} className="border border-border rounded-xl px-6 bg-background">
                <AccordionTrigger className="text-left font-bold text-lg py-6">{f.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 bg-foreground text-background text-center relative overflow-hidden text-background">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[2px] border-background/5 rounded-full pointer-events-none"
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black font-heading tracking-tighter mb-8 leading-[0.8] italic uppercase">{t.cta.title}</h2>
          <p className="text-xl mb-12 opacity-80 max-w-lg mx-auto font-medium">
            {t.cta.subtitle}
          </p>
          <Button size="xl" asChild className="rounded-full bg-background text-foreground hover:bg-background/90 px-12 h-20 text-xl font-black shadow-2xl">
            <Link to="/contact">{t.cta.button}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

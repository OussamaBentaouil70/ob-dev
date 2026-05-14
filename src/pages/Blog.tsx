import { motion } from "motion/react";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Link } from "react-router-dom";
import { useLanguage } from "@/src/context/LanguageContext";

export default function Blog() {
  const { t } = useLanguage();
  
  return (
    <div className="pt-32 pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 underline decoration-primary/20 underline-offset-8">{t.blog.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-medium">
            {t.blog.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          {t.blogs.map((post: any, idx: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-10 items-center border-b border-border pb-16 last:border-0"
            >
              <div className="md:col-span-5 aspect-[16/10] rounded-3xl overflow-hidden border border-border bg-secondary/10 relative shadow-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
              </div>
              <div className="md:col-span-7">
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <Badge variant="outline" className="font-mono tracking-widest px-4 py-1 bg-secondary text-foreground uppercase text-[10px] border-border shadow-sm">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
                    <Calendar size={12} className="text-primary" /> {post.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono uppercase tracking-widest">
                    <Clock size={12} className="text-primary" /> {post.readTime} {t.blog.readTime}
                  </div>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 italic group-hover:text-primary transition-colors cursor-pointer leading-[0.9]">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-muted-foreground mb-10 text-xl max-w-2xl leading-relaxed font-medium">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 font-black text-lg group-hover:gap-4 transition-all">
                  {t.blog.cta} <ArrowRight size={20} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Calendar, Share2, Tag } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { useLanguage } from "@/src/context/LanguageContext";

export default function BlogDetail() {
  const { t } = useLanguage();
  const { id } = useParams();
  const post = t.blogs.find((b: any) => b.id === id);

  if (!post) {
    return (
      <div className="pt-40 text-center min-h-screen font-heading">
        <h1 className="text-4xl font-bold italic">{t.language === 'en' ? 'Post Not Found' : 'Article Non Trouvé'}</h1>
        <Button asChild className="mt-8 rounded-full font-black">
          <Link to="/blog">{t.blog.back}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button variant="ghost" asChild className="mb-12 hover:gap-3 transition-all -ml-4 font-bold">
            <Link to="/blog">
              <ArrowLeft size={18} className="mr-2" /> {t.blog.back}
            </Link>
          </Button>

          <div className="flex items-center gap-4 mb-8">
            <Badge className="bg-primary text-primary-foreground font-mono uppercase text-[10px] tracking-widest px-3">
              {post.category}
            </Badge>
            <div className="h-px flex-grow bg-border" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-12 italic">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 mb-16 py-6 border-y border-border">
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground">
              <Calendar size={14} className="text-primary" /> {post.date}
            </div>
            <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground">
              <Clock size={14} className="text-primary" /> {post.readTime} {t.blog.readTime}
            </div>
            <div className="ml-auto flex gap-4">
               <button className="text-muted-foreground hover:text-primary transition-colors"><Share2 size={18} /></button>
            </div>
          </div>

          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full aspect-[21/9] object-cover rounded-3xl border border-border shadow-2xl mb-16 grayscale hover:grayscale-0 transition-all duration-700" 
            referrerPolicy="no-referrer"
          />

          <div className="prose prose-invert max-w-none">
            <p className="text-2xl font-medium leading-relaxed mb-12 text-foreground/90 italic">
              {post.excerpt}
            </p>
            <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap space-y-8">
              {post.content}
            </div>
          </div>

          <div className="mt-32 pt-16 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h4 className="font-bold mb-2">
                {t.language === 'en' ? 'Want more insights?' : 'Plus d\'expertise ?'}
              </h4>
              <p className="text-muted-foreground">
                {t.language === 'en' 
                  ? 'Follow us on technical deep-dives and engineering breakthroughs.' 
                  : 'Suivez nos plongées techniques et avancées en ingénierie.'
                }
              </p>
            </div>
            <div className="flex gap-4">
               <Button className="rounded-full px-8 font-black">{t.blog.subscribe}</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

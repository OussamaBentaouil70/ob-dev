import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-6 text-foreground">
            <span className="w-8 h-8 bg-foreground rounded flex items-center justify-center text-background font-black text-xs">OB</span>
            {t.agencyName}
          </Link>
          <p className="text-muted-foreground max-w-sm mb-8">
            {t.language === 'en' 
              ? 'Crafting professional, enterprise-grade digital experiences for visionary brands worldwide.' 
              : 'Création d\'expériences numériques professionnelles de qualité entreprise pour les marques visionnaires du monde entier.'
            }
          </p>
          <div className="flex gap-4">
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={18} />
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={18} />
            </button>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Github size={18} />
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Agency</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">{t.nav.home}</Link></li>
            <li><Link to="/work" className="hover:text-primary transition-colors">{t.work.title}</Link></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">{t.blog.title}</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">Capabilities</h4>
          <ul className="space-y-4 text-sm text-muted-foreground font-medium">
            {t.services.items.map((s: any) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
        <p>© {new Date().getFullYear()} {t.agencyName}. {t.language === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}</p>
        <p className="opacity-50">Built with precision for the modern web.</p>
      </div>
    </footer>
  );
}

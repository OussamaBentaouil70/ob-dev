import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";
import { useLanguage } from "@/src/context/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.work, path: "/work" },
    { name: t.nav.blog, path: "/blog" },
    { name: t.nav.contact, path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border py-4"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <span className="w-8 h-8 bg-foreground rounded flex items-center justify-center text-background font-black text-xs">OB</span>
          {t.agencyName}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium tracking-tight hover:text-primary transition-colors",
                location.pathname === link.path ? "text-primary italic underline underline-offset-4" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-widest border border-border hover:bg-secondary transition-all"
              >
                <Globe size={12} className="text-primary" />
                {language.toUpperCase()}
                <ChevronDown size={10} className={cn("transition-transform duration-200", isLangOpen && "rotate-180")} />
              </button>

              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-background border border-border rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in duration-200">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'fr', label: 'Français' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'en' | 'fr');
                        setIsLangOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-2.5 text-xs font-bold transition-colors hover:bg-secondary",
                        language === lang.code ? "text-primary bg-primary/5" : "text-muted-foreground"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <Link
            to="/contact"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-black hover:scale-105 active:scale-95 transition-all"
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="text-[10px] font-bold border border-border px-2 py-1 rounded flex items-center gap-1"
            >
              {language.toUpperCase()}
              <ChevronDown size={10} />
            </button>
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-2 w-28 bg-background border border-border rounded-lg shadow-xl overflow-hidden py-1 z-50">
                {['en', 'fr'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang as 'en' | 'fr');
                      setIsLangOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 text-xs font-bold",
                      language === lang ? "text-primary italic" : "text-muted-foreground"
                    )}
                  >
                    {lang === 'en' ? 'English' : 'Français'}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={toggleTheme} className="p-2">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-background border-b border-border p-6 md:hidden flex flex-col gap-4 shadow-xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold tracking-tight"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="bg-primary text-primary-foreground text-center py-4 rounded-xl font-bold mt-4"
          >
            {t.nav.cta}
          </Link>
        </motion.div>
      )}
    </nav>
  );
}

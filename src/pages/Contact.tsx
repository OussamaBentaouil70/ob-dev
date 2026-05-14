import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/src/context/LanguageContext";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    console.log("Form data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 italic">{t.contact.title}</h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-1">Email</h4>
                  <p className="text-xl font-medium">hello@ob-dev.agency</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-1">Office</h4>
                  <p className="text-xl font-medium">Paris / Berlin / Tel Aviv</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-secondary/20 p-8 md:p-12 rounded-2xl border border-border"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  {t.language === 'en' ? 'Transmission Received' : 'Transmission Reçue'}
                </h3>
                <p className="text-muted-foreground">
                  {t.language === 'en' 
                    ? "We'll scan your requirements and get back to you shortly." 
                    : "Nous allons analyser vos besoins et vous recontacter rapidement."
                  }
                </p>
                <Button variant="link" className="mt-8 font-bold" onClick={() => setSubmitted(false)}>
                  {t.language === 'en' ? 'Send another message' : 'Envoyer un autre message'}
                </Button>
              </div>
            ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                       {t.contact.labels.id}
                    </label>
                    <Input
                      {...register("name")}
                      placeholder={t.contact.placeholders.name}
                      className="bg-background border-border h-14 rounded-xl focus:ring-primary focus:border-primary transition-all px-6 text-lg"
                    />
                    {errors.name && <p className="text-destructive text-xs font-mono">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                       {t.contact.labels.comm}
                    </label>
                    <Input
                      {...register("email")}
                      placeholder={t.contact.placeholders.email}
                      className="bg-background border-border h-14 rounded-xl focus:ring-primary focus:border-primary transition-all px-6 text-lg"
                    />
                    {errors.email && <p className="text-destructive text-xs font-mono">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    {t.contact.labels.core}
                  </label>
                  <Input
                    {...register("subject")}
                    placeholder={t.contact.placeholders.subject}
                    className="bg-background border-border h-14 rounded-xl focus:ring-primary focus:border-primary transition-all px-6 text-lg"
                  />
                  {errors.subject && <p className="text-destructive text-xs font-mono">{errors.subject.message}</p>}
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    {t.contact.labels.tech}
                  </label>
                  <Textarea
                    {...register("message")}
                    placeholder={t.contact.placeholders.message}
                    className="bg-background border-border min-h-[180px] rounded-xl focus:ring-primary focus:border-primary transition-all p-6 text-lg leading-relaxed"
                  />
                  {errors.message && <p className="text-destructive text-xs font-mono">{errors.message.message}</p>}
                </div>

                <Button size="xl" className="w-full font-black tracking-tight h-16 bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all rounded-full shadow-2xl text-xl" disabled={isSubmitting}>
                  {isSubmitting ? t.contact.status : t.contact.cta}
                </Button>
                
                <p className="text-center text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  {t.contact.secure}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

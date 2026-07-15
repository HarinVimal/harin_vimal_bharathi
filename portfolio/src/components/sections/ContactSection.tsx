"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { toast } from "sonner";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { GlowButton } from "@/components/buttons/GlowButton";
import { FadeIn } from "@/components/animations/FadeIn";
import { siteConfig } from "@/config/site";
import { submitContactForm } from "@/services/contact.service";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: siteConfig.links.email, href: `mailto:${siteConfig.links.email}` },
  { icon: Phone, label: "Phone", value: siteConfig.links.phone, href: `tel:${siteConfig.links.phone}` },
  { icon: MapPin, label: "Location", value: siteConfig.location, href: null },
];

const SOCIAL_LINKS = [
  { icon: GitHubIcon, label: "GitHub", href: siteConfig.links.github, username: "@HarinVimal" },
  { icon: LinkedInIcon, label: "LinkedIn", href: siteConfig.links.linkedin, username: "harinvimal" },
];

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormValues) => {
    const result = await submitContactForm(data);
    if (result.success) {
      setIsSubmitted(true);
      reset();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <section id="contact" className="section relative" aria-label="Contact me">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contact"
          title="Let's work"
          titleHighlight="together"
          description="Have a project in mind or want to discuss an opportunity? I'd love to hear from you."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          {/* Contact info panel */}
          <FadeIn variant="left" className="lg:col-span-2">
            <div className="rounded-2xl glass border border-white/[0.06] p-6 space-y-6 h-full">
              <div>
                <h3 className="font-semibold text-zinc-100 mb-1">Get in touch</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  I&apos;m always open to discussing new projects, enterprise consulting,
                  or freelance opportunities.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-3">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                      <Icon className="h-4 w-4 text-indigo-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-zinc-300 hover:text-indigo-400 transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm text-zinc-300">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Connect
                </p>
                <div className="space-y-2">
                  {SOCIAL_LINKS.map(({ icon: Icon, label, href, username }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-zinc-900/50 p-3 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-all duration-200 group"
                      aria-label={`${siteConfig.name} on ${label}`}
                    >
                      <Icon className="h-4 w-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-medium text-zinc-300">{label}</p>
                        <p className="text-xs text-zinc-600">{username}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability badge */}
              <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  <span className="text-sm font-medium text-emerald-400">Available for work</span>
                </div>
                <p className="text-xs text-zinc-500">
                  Open to freelance projects and consulting engagements.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Contact form */}
          <FadeIn variant="right" className="lg:col-span-3">
            <div className="rounded-2xl glass border border-white/[0.06] p-6">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-16 text-center gap-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <CheckCircle2 className="h-8 w-8 text-emerald-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-100">Message sent!</h3>
                    <p className="text-sm text-zinc-500 max-w-sm">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <GlowButton
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      size="sm"
                    >
                      Send another message
                    </GlowButton>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                    aria-label="Contact form"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-zinc-300">
                          Full Name <span className="text-red-400" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          aria-required="true"
                          aria-describedby={errors.name ? "name-error" : undefined}
                          {...register("name")}
                          className={cn(
                            "w-full rounded-xl border bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors",
                            "focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30",
                            errors.name ? "border-red-500/50" : "border-white/[0.08]",
                          )}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1 flex items-center gap-1 text-xs text-red-400" role="alert">
                            <AlertCircle className="h-3 w-3" aria-hidden="true" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-zinc-300">
                          Email Address <span className="text-red-400" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          aria-required="true"
                          aria-describedby={errors.email ? "email-error" : undefined}
                          {...register("email")}
                          className={cn(
                            "w-full rounded-xl border bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors",
                            "focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30",
                            errors.email ? "border-red-500/50" : "border-white/[0.08]",
                          )}
                          placeholder="john@company.com"
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1 flex items-center gap-1 text-xs text-red-400" role="alert">
                            <AlertCircle className="h-3 w-3" aria-hidden="true" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium text-zinc-300">
                        Subject <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        aria-required="true"
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        {...register("subject")}
                        className={cn(
                          "w-full rounded-xl border bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors",
                          "focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30",
                          errors.subject ? "border-red-500/50" : "border-white/[0.08]",
                        )}
                        placeholder="Project inquiry, freelance work..."
                      />
                      {errors.subject && (
                        <p id="subject-error" className="mt-1 flex items-center gap-1 text-xs text-red-400" role="alert">
                          <AlertCircle className="h-3 w-3" aria-hidden="true" />
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-zinc-300">
                        Message <span className="text-red-400" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        aria-required="true"
                        aria-describedby={errors.message ? "message-error" : undefined}
                        {...register("message")}
                        className={cn(
                          "w-full resize-none rounded-xl border bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors",
                          "focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30",
                          errors.message ? "border-red-500/50" : "border-white/[0.08]",
                        )}
                        placeholder="Tell me about your project or what you'd like to discuss..."
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 flex items-center gap-1 text-xs text-red-400" role="alert">
                          <AlertCircle className="h-3 w-3" aria-hidden="true" />
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <GlowButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      icon={<Send className="h-4 w-4" />}
                      iconPosition="right"
                      className="w-full"
                      aria-label="Send message"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </GlowButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

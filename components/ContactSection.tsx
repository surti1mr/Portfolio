"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAchievements } from "@/components/AchievementsProvider";

const contactItems = [
  {
    icon: "📧",
    label: "surti1mr@cmich.edu",
    href: "mailto:surti1mr@cmich.edu",
    isExternal: false,
  },
  {
    icon: "💼",
    label: "linkedin.com/in/mayank-surti-593bb3185",
    href: "https://linkedin.com/in/mayank-surti-593bb3185/",
    isExternal: true,
  },
  {
    icon: "🐙",
    label: "github.com/surti1mr",
    href: "https://github.com/surti1mr",
    isExternal: true,
  },
  {
    icon: "📍",
    label: "Farmington Hills, Michigan (open to relocation)",
    href: null,
    isExternal: false,
  },
  {
    icon: "📞",
    label: "(248) 704-9118",
    href: "tel:+12487049118",
    isExternal: false,
  },
];

export default function ContactSection() {
  const reducedMotion = useReducedMotion();
  const { unlock } = useAchievements();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    unlock("recruiter_mode");
    const subject = encodeURIComponent(
      `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:surti1mr@cmich.edu?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#0F1629]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label mb-3">{'// contact'}</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-[#E8F4FD] mb-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-[#8899AA] text-base mb-12 max-w-xl">
            Open to full-time roles in AI Application Engineering, Agentic AI,
            LLM/RAG systems, and Full-Stack AI development. Based in Michigan,
            open to relocation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — contact info */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {contactItems.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <span className="text-xl select-none flex-shrink-0">
                  {item.icon}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    onClick={() => unlock("recruiter_mode")}
                    className="text-[#8899AA] hover:text-[#00D4FF] transition-colors duration-200 text-sm break-all"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-[#8899AA] text-sm">{item.label}</span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#8899AA] mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-[#0A0E1A] border border-[#1E2D42] rounded-md px-4 py-3 text-[#E8F4FD] text-sm placeholder-[#3a4a5a] focus:outline-none focus:border-[#00D4FF] transition-colors duration-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#8899AA] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-[#0A0E1A] border border-[#1E2D42] rounded-md px-4 py-3 text-[#E8F4FD] text-sm placeholder-[#3a4a5a] focus:outline-none focus:border-[#00D4FF] transition-colors duration-200"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#8899AA] mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full bg-[#0A0E1A] border border-[#1E2D42] rounded-md px-4 py-3 text-[#E8F4FD] text-sm placeholder-[#3a4a5a] focus:outline-none focus:border-[#00D4FF] transition-colors duration-200 resize-none"
                  placeholder="Let me know what time works for you and I'll schedule a call for a quick discussion."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#00D4FF] text-bg font-semibold text-sm rounded-md hover:bg-[#00bde0] active:scale-95 transition-all duration-200"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

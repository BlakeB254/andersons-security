"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Phone } from "lucide-react";
import { brand } from "@/config/brand";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { MetatronsCube } from "@/components/sacred/MetatronsCube";

export function CTASection() {
  return (
    <SectionWrapper id="cta" className="relative overflow-hidden">
      {/* Sacred geometry background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-30 dark:opacity-100">
        <MetatronsCube size={600} opacity={0.03} animate />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-fib-2 rounded-full bg-primary/10 px-fib-4 py-fib-2 text-primary mb-fib-4">
            <Shield size={16} />
            <span className="text-sm font-medium">Get Protected Today</span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          Ready to Secure Your Business?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-fib-5 text-lg text-muted-foreground"
        >
          Join 500+ businesses that trust {brand.name} for their security needs.
          Get a free consultation and custom security plan today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-fib-6 flex flex-col sm:flex-row gap-fib-4 justify-center"
        >
          <Link
            href="/book"
            className="btn-cta inline-flex items-center justify-center gap-fib-2 rounded-fib-3 px-fib-7 py-fib-4 text-lg font-medium text-white animate-glow-pulse"
          >
            <Shield size={20} />
            Book a Consultation
          </Link>
          <a
            href={`tel:${brand.contactPhone}`}
            className="inline-flex items-center justify-center gap-fib-2 rounded-fib-3 border border-border px-fib-7 py-fib-4 text-lg font-medium text-foreground transition-colors hover:bg-muted"
          >
            <Phone size={20} />
            {brand.contactPhone}
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

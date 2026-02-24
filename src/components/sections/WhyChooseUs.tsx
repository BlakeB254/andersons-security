"use client";

import {
  Clock,
  GraduationCap,
  Radio,
  BadgeCheck,
  Headset,
  Zap,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

const benefits = [
  {
    icon: Clock,
    title: "24/7 Response",
    description:
      "Round-the-clock availability with rapid dispatch for any security concern, day or night.",
  },
  {
    icon: GraduationCap,
    title: "Trained Personnel",
    description:
      "Every guard undergoes rigorous training including conflict resolution, first aid, and threat assessment.",
  },
  {
    icon: Radio,
    title: "Modern Equipment",
    description:
      "State-of-the-art communication systems, GPS tracking, and surveillance technology.",
  },
  {
    icon: BadgeCheck,
    title: "Licensed & Insured",
    description:
      "Fully licensed, bonded, and insured with all state and federal certifications current.",
  },
  {
    icon: Headset,
    title: "Dedicated Support",
    description:
      "A dedicated account manager for every client ensures personalized, responsive service.",
  },
  {
    icon: Zap,
    title: "Rapid Deployment",
    description:
      "Emergency guard deployment within hours, not days. We move fast when security matters.",
  },
];

export function WhyChooseUs() {
  return (
    <SectionWrapper id="why-choose-us">
      <ScrollReveal>
        <div className="text-center mb-fib-7">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-fib-3">
            The Anderson Difference
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Why Choose Us
          </h2>
          <p className="mt-fib-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Over a decade of protecting businesses with unmatched professionalism and reliability.
          </p>
        </div>
      </ScrollReveal>

      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-fib-5">
        {benefits.map((benefit) => (
          <StaggerItem key={benefit.title}>
            <div className="group rounded-fib-4 border border-border bg-card p-fib-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
              <div className="mb-fib-4 inline-flex rounded-fib-3 bg-primary/10 p-fib-3 text-primary transition-colors group-hover:bg-primary/20">
                <benefit.icon size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold">
                {benefit.title}
              </h3>
              <p className="mt-fib-2 text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}

"use client";

import { Building2, Shield, Truck } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { services } from "@/config/brand";
import Link from "next/link";

const iconMap = {
  building: Building2,
  shield: Shield,
  truck: Truck,
} as const;

export function FeaturesGrid() {
  return (
    <SectionWrapper id="features">
      <ScrollReveal>
        <div className="text-center mb-fib-7">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-fib-3">
            What We Offer
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Our Security Services
          </h2>
          <p className="mt-fib-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive security solutions tailored to protect your business, assets, and people.
          </p>
        </div>
      </ScrollReveal>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-fib-5">
        {services.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <StaggerItem key={service.id}>
              <div className="group rounded-fib-4 border border-border bg-card p-fib-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 relative overflow-hidden">
                {service.featured && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-fib-4 py-fib-1 rounded-bl-fib-3">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-fib-4 inline-flex rounded-fib-3 bg-primary/10 p-fib-4 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="mt-fib-1 text-sm font-medium text-primary">
                  {service.tagline}
                </p>
                <p className="mt-fib-3 text-sm text-muted-foreground">
                  {service.shortDescription}
                </p>
                <div className="mt-fib-4 flex flex-wrap gap-fib-2">
                  {service.idealFor.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-muted px-fib-3 py-fib-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-fib-5">
                  <Link
                    href="/services"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Learn more &rarr;
                  </Link>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerChildren>
    </SectionWrapper>
  );
}

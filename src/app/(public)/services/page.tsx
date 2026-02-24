import { createMetadata } from "@/lib/metadata";
import { brand, services } from "@/config/brand";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import {
  Building2,
  Shield,
  Truck,
  ClipboardList,
  Key,
  Users,
  Map,
  BadgeCheck,
  User,
  Calendar,
  MapPin,
  Radar,
  GraduationCap,
  CheckCircle2,
  Star,
  Phone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { ServicesFAQ } from "@/components/sections/ServicesFAQ";

export const metadata = createMetadata({
  title: "Services",
  description: `Professional security services from ${brand.name}. Commercial security, armed guards, and fleet protection.`,
});

const serviceIcons = {
  building: Building2,
  shield: Shield,
  truck: Truck,
} as const;

const featureIcons: Record<string, React.FC<{ size?: number; className?: string }>> = {
  clipboard: ClipboardList,
  key: Key,
  users: Users,
  map: Map,
  badge: BadgeCheck,
  user: User,
  calendar: Calendar,
  building: Building2,
  truck: Truck,
  "map-pin": MapPin,
  radar: Radar,
  "graduation-cap": GraduationCap,
};

export default function ServicesPage() {
  return (
    <div className="pt-fib-9">
      {/* Hero */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-fib-2 rounded-full bg-primary/10 px-fib-4 py-fib-2 text-primary mb-fib-4">
              <Shield size={16} />
              <span className="text-sm font-medium">Our Services</span>
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              Professional Security Solutions
            </h1>
            <p className="mt-fib-5 text-lg text-muted-foreground">
              From commercial properties to high-value transport, we deliver tailored security
              services that protect what matters most to your business.
            </p>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Service Cards */}
      {services.map((service, index) => {
        const ServiceIcon = serviceIcons[service.icon];
        return (
          <SectionWrapper key={service.id} className={index % 2 === 0 ? "bg-muted/20" : ""}>
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-fib-7 items-start">
                {/* Info side */}
                <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="inline-flex rounded-fib-3 bg-primary/10 p-fib-4 text-primary mb-fib-4">
                    <ServiceIcon size={32} />
                  </div>
                  <h2 className="font-display text-3xl font-bold sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-fib-2 text-primary font-medium">
                    {service.tagline}
                  </p>
                  <p className="mt-fib-4 text-muted-foreground leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Benefits */}
                  <div className="mt-fib-5 space-y-fib-3">
                    {service.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-fib-3">
                        <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ideal For badges */}
                  <div className="mt-fib-5">
                    <p className="text-sm font-medium text-muted-foreground mb-fib-3">
                      Ideal For:
                    </p>
                    <div className="flex flex-wrap gap-fib-2">
                      {service.idealFor.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/20 bg-primary/5 px-fib-3 py-fib-1 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features grid side */}
                <div className={index % 2 !== 0 ? "lg:order-1" : ""}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-fib-4">
                    {service.features.map((feature) => {
                      const FeatureIcon = featureIcons[feature.icon] || Shield;
                      return (
                        <div
                          key={feature.label}
                          className="rounded-fib-4 border border-border bg-card p-fib-5 transition-all hover:border-primary/20"
                        >
                          <div className="inline-flex rounded-fib-2 bg-primary/10 p-fib-2 text-primary mb-fib-3">
                            <FeatureIcon size={18} />
                          </div>
                          <h4 className="font-semibold text-sm">{feature.label}</h4>
                          <p className="mt-fib-1 text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </SectionWrapper>
        );
      })}

      {/* Pricing Section */}
      <SectionWrapper className="bg-muted/20">
        <ScrollReveal>
          <div className="text-center mb-fib-7">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-fib-3">
              Transparent Pricing
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Simple, Competitive Rates
            </h2>
            <p className="mt-fib-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              No hidden fees. No surprise charges. Just straightforward security pricing.
            </p>
          </div>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-fib-5 max-w-5xl mx-auto">
          {/* Standard */}
          <StaggerItem>
            <div className="rounded-fib-4 border border-border bg-card p-fib-6 text-center transition-all hover:border-primary/20">
              <Building2 size={28} className="mx-auto text-primary mb-fib-4" />
              <h3 className="font-display text-lg font-semibold">Commercial Security</h3>
              <div className="mt-fib-4">
                <span className="font-display text-4xl font-bold text-primary">$35</span>
                <span className="text-muted-foreground">/hr</span>
              </div>
              <p className="mt-fib-2 text-sm text-muted-foreground">per guard</p>
              <ul className="mt-fib-5 space-y-fib-3 text-left">
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Uniformed security officers
                </li>
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Property patrol services
                </li>
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Access control management
                </li>
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Incident reporting
                </li>
              </ul>
              <Link
                href="/book"
                className="mt-fib-5 inline-flex items-center justify-center gap-fib-2 rounded-fib-3 border border-primary px-fib-5 py-fib-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground w-full"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
            </div>
          </StaggerItem>

          {/* Armed — MOST POPULAR */}
          <StaggerItem>
            <div className="rounded-fib-4 border-2 border-primary bg-card p-fib-6 text-center relative transition-all shadow-lg shadow-primary/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-fib-1 rounded-full bg-primary px-fib-4 py-fib-1 text-xs font-bold text-primary-foreground">
                  <Star size={12} />
                  MOST POPULAR
                </span>
              </div>
              <Shield size={28} className="mx-auto text-primary mb-fib-4" />
              <h3 className="font-display text-lg font-semibold">Armed Guards</h3>
              <div className="mt-fib-4">
                <span className="font-display text-4xl font-bold text-primary">$45</span>
                <span className="text-muted-foreground">+/hr</span>
              </div>
              <p className="mt-fib-2 text-sm text-muted-foreground">per guard</p>
              <ul className="mt-fib-5 space-y-fib-3 text-left">
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Licensed armed officers
                </li>
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Executive protection
                </li>
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Event security coverage
                </li>
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Background-verified personnel
                </li>
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Rapid threat response
                </li>
              </ul>
              <Link
                href="/book"
                className="mt-fib-5 btn-cta inline-flex items-center justify-center gap-fib-2 rounded-fib-3 px-fib-5 py-fib-3 text-sm font-medium text-white w-full"
              >
                Book Now
                <ArrowRight size={16} />
              </Link>
            </div>
          </StaggerItem>

          {/* Custom */}
          <StaggerItem>
            <div className="rounded-fib-4 border border-border bg-card p-fib-6 text-center transition-all hover:border-primary/20">
              <Truck size={28} className="mx-auto text-primary mb-fib-4" />
              <h3 className="font-display text-lg font-semibold">Custom Solutions</h3>
              <div className="mt-fib-4">
                <span className="font-display text-4xl font-bold text-primary">Custom</span>
              </div>
              <p className="mt-fib-2 text-sm text-muted-foreground">tailored pricing</p>
              <ul className="mt-fib-5 space-y-fib-3 text-left">
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Fleet &amp; transport security
                </li>
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Multi-site packages
                </li>
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Long-term contracts
                </li>
                <li className="flex items-start gap-fib-2 text-sm">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Custom SOP development
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-fib-5 inline-flex items-center justify-center gap-fib-2 rounded-fib-3 border border-primary px-fib-5 py-fib-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground w-full"
              >
                Contact Us
                <Phone size={16} />
              </Link>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </SectionWrapper>

      {/* FAQ */}
      <ServicesFAQ />

      {/* Bottom CTA */}
      <SectionWrapper className="bg-muted/20">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Not Sure Which Service You Need?
            </h2>
            <p className="mt-fib-4 text-lg text-muted-foreground">
              Our security consultants will assess your needs and recommend the right solution.
              Free consultation, no obligation.
            </p>
            <div className="mt-fib-6 flex flex-col sm:flex-row gap-fib-4 justify-center">
              <Link
                href="/contact"
                className="btn-cta inline-flex items-center justify-center gap-fib-2 rounded-fib-3 px-fib-6 py-fib-4 text-base font-medium text-white"
              >
                <Phone size={18} />
                Free Consultation
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-fib-2 rounded-fib-3 border border-border px-fib-6 py-fib-4 text-base font-medium text-foreground transition-colors hover:bg-muted"
              >
                <Shield size={18} />
                Book Online
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </SectionWrapper>
    </div>
  );
}

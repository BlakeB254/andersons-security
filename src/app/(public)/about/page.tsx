import { createMetadata } from "@/lib/metadata";
import { brand } from "@/config/brand";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { Counter } from "@/components/animations/Counter";
import {
  Shield,
  Users,
  Building2,
  Truck,
  Target,
  Eye,
  Heart,
  Award,
  Star,
  Handshake,
  BadgeCheck,
  ShieldCheck,
  FileCheck2,
  HardHat,
  UserCheck,
  Stethoscope,
} from "lucide-react";

export const metadata = createMetadata({
  title: "About Us",
  description: `Learn about ${brand.name} — ${brand.tagline}. Founded in ${brand.founded}, protecting 500+ businesses with 250+ trained security professionals.`,
});

const timeline = [
  {
    year: "2010",
    title: "Founded",
    description:
      "James Anderson founded Anderson's Top Notch Security with a vision to provide reliable, professional security services. Started with 5 dedicated guards.",
    icon: Shield,
  },
  {
    year: "2013",
    title: "Armed Services",
    description:
      "Expanded into armed guard services after receiving full state licensing. Added executive protection and high-value asset security.",
    icon: BadgeCheck,
  },
  {
    year: "2016",
    title: "Fleet Security",
    description:
      "Launched fleet and transport security division. Began securing high-value cargo and providing armed escort services across the region.",
    icon: Truck,
  },
  {
    year: "2019",
    title: "Regional Expansion",
    description:
      "Expanded operations across the region, opening satellite offices and growing our team to serve a wider client base.",
    icon: Building2,
  },
  {
    year: "2022",
    title: "500+ Clients",
    description:
      "Reached the milestone of protecting over 500 businesses. Recognized as one of the top security providers in the region.",
    icon: Users,
  },
  {
    year: "2024",
    title: "Technology Integration",
    description:
      "Integrated modern security technology including GPS tracking, real-time reporting systems, and online booking platform.",
    icon: Star,
  },
];

const values = [
  {
    icon: Heart,
    title: "Integrity",
    description:
      "We operate with complete honesty and transparency. Our clients trust us because we earn it every day.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "We set the highest standards for training, performance, and professionalism in everything we do.",
  },
  {
    icon: Handshake,
    title: "Teamwork",
    description:
      "Our strength comes from working together — guards, management, and clients as one unified team.",
  },
  {
    icon: Target,
    title: "Dedication",
    description:
      "We are dedicated to the safety and security of every client, going above and beyond expectations.",
  },
];

const certifications = [
  { icon: ShieldCheck, label: "State Licensed" },
  { icon: BadgeCheck, label: "Licensed Armed Provider" },
  { icon: FileCheck2, label: "Fully Bonded & Insured" },
  { icon: HardHat, label: "OSHA Compliant" },
  { icon: UserCheck, label: "Background Verified" },
  { icon: Stethoscope, label: "CPR/First Aid Certified" },
];

export default function AboutPage() {
  return (
    <div className="pt-fib-9">
      {/* Hero */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-fib-2 rounded-full bg-primary/10 px-fib-4 py-fib-2 text-primary mb-fib-4">
              <Shield size={16} />
              <span className="text-sm font-medium">About Us</span>
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              Protecting What Matters Since {brand.founded}
            </h1>
            <p className="mt-fib-5 text-lg text-muted-foreground">
              For over 15 years, {brand.name} has been the trusted security partner
              for businesses of all sizes. Our commitment to excellence sets us apart.
            </p>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Our Story */}
      <SectionWrapper className="bg-muted/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-fib-7 items-center">
          <ScrollReveal direction="left">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary mb-fib-3">
                Our Story
              </p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                Built on Trust, Driven by Purpose
              </h2>
              <div className="mt-fib-5 space-y-fib-4 text-muted-foreground leading-relaxed">
                <p>
                  In 2010, James Anderson founded Anderson&apos;s Top Notch Security with a simple
                  mission: provide security services that businesses could truly rely on. Starting
                  with just 5 guards and a commitment to excellence, James built the company from
                  the ground up.
                </p>
                <p>
                  What began as a small commercial security operation has grown into a comprehensive
                  security firm with over 250 trained professionals protecting more than 500
                  businesses across the region. From armed guards and executive protection to fleet
                  security and transport escorts, we&apos;ve expanded our services to meet every
                  security need.
                </p>
                <p>
                  Today, {brand.name} is recognized as one of the most trusted security providers
                  in the region. Our 99% client satisfaction rate and long-term client relationships
                  speak to the quality of service we deliver every day.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="grid grid-cols-2 gap-fib-4">
              <div className="rounded-fib-4 border border-border bg-card p-fib-5 text-center">
                <div className="font-display text-3xl font-bold text-primary">
                  <Counter value={15} suffix="+" />
                </div>
                <p className="mt-fib-2 text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="rounded-fib-4 border border-border bg-card p-fib-5 text-center">
                <div className="font-display text-3xl font-bold text-primary">
                  <Counter value={250} suffix="+" />
                </div>
                <p className="mt-fib-2 text-sm text-muted-foreground">Guards Deployed</p>
              </div>
              <div className="rounded-fib-4 border border-border bg-card p-fib-5 text-center">
                <div className="font-display text-3xl font-bold text-primary">
                  <Counter value={500} suffix="+" />
                </div>
                <p className="mt-fib-2 text-sm text-muted-foreground">Clients Protected</p>
              </div>
              <div className="rounded-fib-4 border border-border bg-card p-fib-5 text-center">
                <div className="font-display text-3xl font-bold text-primary">
                  <Counter value={99} suffix="%" />
                </div>
                <p className="mt-fib-2 text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="text-center mb-fib-7">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-fib-3">
              Our Journey
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Milestones
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          <div className="space-y-fib-6">
            {timeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.year} delay={index * 0.1}>
                  <div className={`relative flex items-start gap-fib-5 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Content */}
                    <div className={`flex-1 pl-fib-7 md:pl-0 ${index % 2 === 0 ? "md:pr-fib-7 md:text-right" : "md:pl-fib-7"}`}>
                      <span className="text-sm font-bold text-primary">{item.year}</span>
                      <h3 className="font-display text-lg font-semibold mt-fib-1">
                        {item.title}
                      </h3>
                      <p className="mt-fib-2 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>

                    {/* Icon circle */}
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center z-10">
                      <Icon size={14} className="text-primary" />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper className="bg-muted/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-fib-6 max-w-5xl mx-auto">
          <ScrollReveal direction="left">
            <div className="rounded-fib-4 border border-border bg-card p-fib-6">
              <div className="inline-flex rounded-fib-3 bg-primary/10 p-fib-3 text-primary mb-fib-4">
                <Target size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold">Our Mission</h3>
              <p className="mt-fib-4 text-muted-foreground leading-relaxed">
                To provide exceptional security services that protect people, property, and assets
                with unwavering professionalism. We are committed to delivering peace of mind
                through highly trained personnel, modern technology, and transparent business
                practices.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="rounded-fib-4 border border-border bg-card p-fib-6">
              <div className="inline-flex rounded-fib-3 bg-primary/10 p-fib-3 text-primary mb-fib-4">
                <Eye size={24} />
              </div>
              <h3 className="font-display text-2xl font-bold">Our Vision</h3>
              <p className="mt-fib-4 text-muted-foreground leading-relaxed">
                To be the most trusted security company in the nation — known for integrity,
                innovation, and results. We envision a future where every business has access to
                world-class security services, and we&apos;re building that future one client
                at a time.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="text-center mb-fib-7">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-fib-3">
              What Drives Us
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Core Values
            </h2>
          </div>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-fib-5 max-w-5xl mx-auto">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <StaggerItem key={value.title}>
                <div className="rounded-fib-4 border border-border bg-card p-fib-6 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <div className="mx-auto mb-fib-4 inline-flex rounded-full bg-primary/10 p-fib-4 text-primary">
                    <Icon size={28} />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{value.title}</h3>
                  <p className="mt-fib-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </SectionWrapper>

      {/* Certifications */}
      <SectionWrapper className="bg-muted/20">
        <ScrollReveal>
          <div className="text-center mb-fib-7">
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-fib-3">
              Trust &amp; Compliance
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Certifications &amp; Credentials
            </h2>
            <p className="mt-fib-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Every certification maintained, every standard exceeded. Your security is in qualified hands.
            </p>
          </div>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-fib-4 max-w-5xl mx-auto">
          {certifications.map((cert) => {
            const Icon = cert.icon;
            return (
              <StaggerItem key={cert.label}>
                <div className="rounded-fib-4 border border-border bg-card p-fib-5 text-center transition-all hover:border-primary/20">
                  <Icon size={32} className="mx-auto text-primary mb-fib-3" />
                  <p className="text-xs font-medium text-foreground">{cert.label}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </SectionWrapper>
    </div>
  );
}

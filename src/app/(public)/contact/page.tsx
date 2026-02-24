import { createMetadata } from "@/lib/metadata";
import { brand, businessHours } from "@/config/brand";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata = createMetadata({
  title: "Contact Us",
  description: `Get in touch with ${brand.name}. Call ${brand.contactPhone} or email ${brand.contactEmail} for a free security consultation.`,
});

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: brand.contactPhone,
    href: `tel:${brand.contactPhone}`,
    description: "Call us 24/7 for emergencies",
  },
  {
    icon: Mail,
    label: "Email",
    value: brand.contactEmail,
    href: `mailto:${brand.contactEmail}`,
    description: "We respond within 2 hours",
  },
  {
    icon: MapPin,
    label: "Address",
    value: `${brand.address.street}\n${brand.address.city}, ${brand.address.state} ${brand.address.zip}`,
    href: "#",
    description: "Walk-ins welcome during business hours",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-fib-9">
      {/* Hero */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-fib-2 rounded-full bg-primary/10 px-fib-4 py-fib-2 text-primary mb-fib-4">
              <Shield size={16} />
              <span className="text-sm font-medium">Contact Us</span>
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              Let&apos;s Talk Security
            </h1>
            <p className="mt-fib-5 text-lg text-muted-foreground">
              Ready to protect your business? Get in touch for a free security assessment
              and custom protection plan. We respond to every inquiry.
            </p>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Contact Info Cards */}
      <SectionWrapper className="bg-muted/20">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-fib-5 max-w-5xl mx-auto">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <StaggerItem key={info.label}>
                <a
                  href={info.href}
                  className="block rounded-fib-4 border border-border bg-card p-fib-6 text-center transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mx-auto mb-fib-4 inline-flex rounded-full bg-primary/10 p-fib-4 text-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{info.label}</h3>
                  <p className="mt-fib-2 text-sm text-foreground whitespace-pre-line">
                    {info.value}
                  </p>
                  <p className="mt-fib-2 text-xs text-muted-foreground">
                    {info.description}
                  </p>
                </a>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </SectionWrapper>

      {/* Contact Form + Business Hours */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-fib-7 max-w-6xl mx-auto">
          {/* Form */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="rounded-fib-4 border border-border bg-card p-fib-6">
                <h2 className="font-display text-2xl font-bold mb-fib-5">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-fib-5">
            {/* Business Hours */}
            <ScrollReveal direction="right">
              <div className="rounded-fib-4 border border-border bg-card p-fib-6">
                <div className="flex items-center gap-fib-3 mb-fib-5">
                  <Clock size={20} className="text-primary" />
                  <h3 className="font-display text-lg font-semibold">Business Hours</h3>
                </div>
                <div className="space-y-fib-3">
                  {businessHours.map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-foreground font-medium">{schedule.day}</span>
                      <span className="text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-fib-5 rounded-fib-3 bg-primary/5 border border-primary/10 p-fib-4">
                  <p className="text-xs text-primary font-medium">
                    24/7 Emergency Line Available
                  </p>
                  <p className="text-xs text-muted-foreground mt-fib-1">
                    For urgent security needs outside business hours, call our emergency dispatch.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick CTA */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="rounded-fib-4 border border-primary/20 bg-card p-fib-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
                <Shield size={24} className="text-primary mb-fib-4" />
                <h3 className="font-display text-lg font-semibold">
                  Need Security Fast?
                </h3>
                <p className="mt-fib-2 text-sm text-muted-foreground">
                  Skip the form and book your security service directly online. Same-day deployment available.
                </p>
                <Link
                  href="/book"
                  className="mt-fib-4 btn-cta inline-flex items-center gap-fib-2 rounded-fib-3 px-fib-5 py-fib-3 text-sm font-medium text-white"
                >
                  Book Online
                  <ArrowRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}

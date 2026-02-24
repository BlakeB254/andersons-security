import { createMetadata } from "@/lib/metadata";
import { brand } from "@/config/brand";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import {
  Shield,
  ShieldCheck,
  Headset,
  Lock,
} from "lucide-react";
import { BookingWizard } from "@/components/sections/BookingWizard";
import { BookingFAQ } from "@/components/sections/BookingFAQ";

export const metadata = createMetadata({
  title: "Book Online",
  description: `Book security services online with ${brand.name}. Fast, secure booking with transparent pricing starting at $35/hr.`,
});

const trustIndicators = [
  {
    icon: ShieldCheck,
    label: "Licensed & Insured",
    description: "Fully licensed, bonded, and insured",
  },
  {
    icon: Headset,
    label: "24/7 Support",
    description: "Dedicated account manager included",
  },
  {
    icon: Lock,
    label: "Secure Payment",
    description: "SSL-encrypted checkout process",
  },
];

export default function BookPage() {
  return (
    <div className="pt-fib-9">
      {/* Hero */}
      <SectionWrapper>
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-fib-2 rounded-full bg-primary/10 px-fib-4 py-fib-2 text-primary mb-fib-4">
              <Shield size={16} />
              <span className="text-sm font-medium">Secure Online Booking</span>
            </div>
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              Book Your Security Service
            </h1>
            <p className="mt-fib-5 text-lg text-muted-foreground">
              Secure your protection in minutes. Choose your service, select your dates,
              and we&apos;ll handle the rest. Transparent pricing, no surprises.
            </p>
          </div>
        </ScrollReveal>
      </SectionWrapper>

      {/* Trust Indicators */}
      <div className="max-w-5xl mx-auto px-fib-5">
        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-fib-4">
          {trustIndicators.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.label}>
                <div className="flex items-center gap-fib-3 rounded-fib-3 border border-primary/10 bg-primary/5 p-fib-4">
                  <Icon size={20} className="text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>

      {/* Booking Wizard */}
      <SectionWrapper>
        <ScrollReveal>
          <BookingWizard />
        </ScrollReveal>
      </SectionWrapper>

      {/* FAQ */}
      <BookingFAQ />
    </div>
  );
}

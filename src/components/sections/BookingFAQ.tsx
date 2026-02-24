"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is your base rate for security guards?",
    answer:
      "Our base rate for unarmed commercial security starts at $35/hr per guard. Armed guard services start at $45/hr per guard, and specialized transport security starts at $50/hr. Volume discounts are available for long-term contracts.",
  },
  {
    question: "Is there a rush deployment fee?",
    answer:
      "Yes, for deployments needed within 72 hours of booking, a one-time rush fee of $250 applies for commercial services and $350 for armed/transport services. Same-day emergency deployment is available for critical situations.",
  },
  {
    question: "Do you charge differently for overnight shifts?",
    answer:
      "There is a $5/hr per guard upcharge for overnight hours (10 PM - 6 AM) on standard commercial services, and a $10/hr upcharge for armed overnight services. This reflects the additional training and alertness required for night operations.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "You can cancel or reschedule at no charge up to 48 hours before your service start date. Cancellations within 48 hours incur a fee equal to one shift (minimum 4 hours). No-shows or same-day cancellations are charged at the full daily rate.",
  },
];

export function BookingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="booking-faq" className="bg-muted/20">
      <ScrollReveal>
        <div className="text-center mb-fib-7">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-fib-3">
            Pricing FAQ
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Booking Questions
          </h2>
        </div>
      </ScrollReveal>

      <div className="max-w-3xl mx-auto space-y-fib-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="rounded-fib-4 border border-border bg-card overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="flex items-center justify-between w-full p-fib-5 text-left"
            >
              <span className="font-medium text-foreground pr-fib-4">
                {faq.question}
              </span>
              <ChevronDown
                size={20}
                className={cn(
                  "shrink-0 text-muted-foreground transition-transform duration-200",
                  openIndex === index && "rotate-180 text-primary"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-200",
                openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-fib-5 pb-fib-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

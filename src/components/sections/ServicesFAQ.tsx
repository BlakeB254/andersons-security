"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How quickly can you deploy security personnel?",
    answer:
      "For standard requests, we can deploy guards within 24-48 hours. For emergency or rush deployments, we offer same-day service with a rush fee. Our rapid deployment team is available 24/7 for urgent security needs.",
  },
  {
    question: "Are your guards licensed and insured?",
    answer:
      "Yes, all of our security personnel are fully licensed by the state, bonded, and insured. Our armed guards hold additional certifications including firearms training, and all guards undergo thorough background checks and ongoing training.",
  },
  {
    question: "How does your pricing work?",
    answer:
      "Our pricing is transparent and straightforward. Commercial security starts at $35/hr per guard, and armed guard services start at $45/hr per guard. We offer volume discounts for long-term contracts and multi-site deployments. Get a custom quote for your specific needs.",
  },
  {
    question: "Do you provide security for one-time events?",
    answer:
      "Absolutely. We provide security for events of all sizes including concerts, corporate events, private parties, sporting events, and conventions. Our event security team handles everything from crowd management to VIP protection.",
  },
  {
    question: "What training do your security guards receive?",
    answer:
      "Every guard completes a comprehensive training program covering conflict resolution, emergency response, first aid/CPR, report writing, customer service, and use of security technology. Armed guards receive additional firearms training and tactical response certification. Ongoing training is mandatory.",
  },
];

export function ServicesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq">
      <ScrollReveal>
        <div className="text-center mb-fib-7">
          <p className="text-sm font-medium uppercase tracking-widest text-primary mb-fib-3">
            FAQ
          </p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Common Questions
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

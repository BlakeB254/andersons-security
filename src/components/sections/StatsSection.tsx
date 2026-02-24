"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Counter } from "@/components/animations/Counter";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { stats } from "@/config/brand";

export function StatsSection() {
  return (
    <SectionWrapper id="stats" className="bg-muted/30">
      <ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-fib-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl font-bold text-primary sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-fib-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}

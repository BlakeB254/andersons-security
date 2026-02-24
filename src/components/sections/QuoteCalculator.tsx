"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, Shield, Users, Clock, CalendarDays } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionWrapper } from "@/components/layout/SectionWrapper";

const RATE_PER_HOUR = 35;

export function QuoteCalculator() {
  const [guards, setGuards] = useState(2);
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [days, setDays] = useState(5);

  const total = guards * hoursPerDay * days * RATE_PER_HOUR;

  return (
    <SectionWrapper id="quote-calculator">
      <ScrollReveal>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-fib-4 border border-primary/20 bg-card p-fib-6 md:p-fib-7 relative overflow-hidden">
            {/* Gold accent bar at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            <div className="text-center mb-fib-6">
              <div className="inline-flex items-center gap-fib-3 rounded-full bg-primary/10 px-fib-4 py-fib-2 text-primary mb-fib-4">
                <Calculator size={16} />
                <span className="text-sm font-medium">Instant Quote</span>
              </div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Estimate Your Security Cost
              </h2>
              <p className="mt-fib-3 text-sm text-muted-foreground">
                Adjust the sliders to get an instant estimate. Final pricing may vary based on specific requirements.
              </p>
            </div>

            <div className="space-y-fib-6">
              {/* Guards slider */}
              <div>
                <div className="flex items-center justify-between mb-fib-3">
                  <label className="flex items-center gap-fib-2 text-sm font-medium text-foreground">
                    <Users size={16} className="text-primary" />
                    Number of Guards
                  </label>
                  <span className="text-lg font-bold text-primary">{guards}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={guards}
                  onChange={(e) => setGuards(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-fib-1">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              {/* Hours per day slider */}
              <div>
                <div className="flex items-center justify-between mb-fib-3">
                  <label className="flex items-center gap-fib-2 text-sm font-medium text-foreground">
                    <Clock size={16} className="text-primary" />
                    Hours per Day
                  </label>
                  <span className="text-lg font-bold text-primary">{hoursPerDay}</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={24}
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-fib-1">
                  <span>4 hrs</span>
                  <span>24 hrs</span>
                </div>
              </div>

              {/* Days slider */}
              <div>
                <div className="flex items-center justify-between mb-fib-3">
                  <label className="flex items-center gap-fib-2 text-sm font-medium text-foreground">
                    <CalendarDays size={16} className="text-primary" />
                    Number of Days
                  </label>
                  <span className="text-lg font-bold text-primary">{days}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-fib-1">
                  <span>1 day</span>
                  <span>30 days</span>
                </div>
              </div>

              {/* Result */}
              <div className="border-t border-border pt-fib-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-fib-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Total</p>
                    <p className="font-display text-3xl font-bold text-primary sm:text-4xl">
                      ${total.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-fib-1">
                      {guards} guard{guards > 1 ? "s" : ""} &times; {hoursPerDay} hrs &times; {days} day{days > 1 ? "s" : ""} @ ${RATE_PER_HOUR}/hr
                    </p>
                  </div>
                  <Link
                    href="/book"
                    className="btn-cta rounded-fib-3 px-fib-6 py-fib-4 text-base font-medium text-white flex items-center gap-fib-2"
                  >
                    <Shield size={18} />
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}

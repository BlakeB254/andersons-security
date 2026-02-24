"use client";

import { useState } from "react";
import {
  Building2,
  Shield,
  Truck,
  CalendarDays,
  Users,
  Clock,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const serviceTypes = [
  {
    id: "commercial",
    title: "Commercial Security",
    description: "Uniformed guards for commercial properties",
    icon: Building2,
    rate: 35,
  },
  {
    id: "armed",
    title: "Armed Guards",
    description: "Licensed armed security personnel",
    icon: Shield,
    rate: 45,
  },
  {
    id: "transport",
    title: "Fleet & Transport",
    description: "Escort and transport security",
    icon: Truck,
    rate: 50,
  },
];

const steps = [
  { id: 1, label: "Service", icon: Shield },
  { id: 2, label: "Schedule", icon: CalendarDays },
  { id: 3, label: "Details", icon: Users },
  { id: 4, label: "Payment", icon: CreditCard },
];

export function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [guards, setGuards] = useState(1);
  const [hoursPerDay, setHoursPerDay] = useState(8);

  const selectedRate = serviceTypes.find((s) => s.id === selectedService)?.rate ?? 35;
  const estimatedDaily = guards * hoursPerDay * selectedRate;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-fib-7 max-w-lg mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                    isActive && "border-primary bg-primary/10 text-primary",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    !isActive && !isCompleted && "border-border text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Icon size={18} />
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs sm:text-sm mt-fib-2 font-medium",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 sm:w-16 h-px mx-fib-2 mb-fib-4",
                    currentStep > step.id ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="rounded-fib-4 border border-border bg-card p-fib-6 md:p-fib-7 min-h-[400px]">
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-fib-2">
              Select Your Service
            </h2>
            <p className="text-sm text-muted-foreground mb-fib-6">
              Choose the type of security service you need.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-fib-4">
              {serviceTypes.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedService === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={cn(
                      "rounded-fib-4 border-2 p-fib-5 text-left transition-all",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-slate-600 hover:border-primary/40"
                    )}
                  >
                    <Icon
                      size={28}
                      className={cn(
                        "mb-fib-3",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <h3 className="font-semibold text-sm">{service.title}</h3>
                    <p className="text-xs text-muted-foreground mt-fib-1">
                      {service.description}
                    </p>
                    <p className="mt-fib-3 text-lg font-bold text-primary whitespace-nowrap">
                      ${service.rate}<span className="text-xs font-normal text-muted-foreground">/hr</span>
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Schedule */}
        {currentStep === 2 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-fib-2">
              Select Your Schedule
            </h2>
            <p className="text-sm text-muted-foreground mb-fib-6">
              Choose your preferred start date and duration.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-fib-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-fib-2">
                  Start Date
                </label>
                <div className="rounded-fib-3 border border-border bg-background p-fib-5 flex items-center gap-fib-3 text-muted-foreground">
                  <CalendarDays size={20} className="text-primary" />
                  <span className="text-sm">Select a date...</span>
                </div>
                <p className="text-xs text-muted-foreground mt-fib-2">
                  Calendar integration coming soon
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-fib-2">
                  End Date
                </label>
                <div className="rounded-fib-3 border border-border bg-background p-fib-5 flex items-center gap-fib-3 text-muted-foreground">
                  <CalendarDays size={20} className="text-primary" />
                  <span className="text-sm">Select a date...</span>
                </div>
                <p className="text-xs text-muted-foreground mt-fib-2">
                  Or choose ongoing service
                </p>
              </div>
            </div>

            <div className="mt-fib-5 rounded-fib-3 bg-primary/5 border border-primary/10 p-fib-4 flex items-start gap-fib-3">
              <Info size={16} className="text-primary mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                Need guards within 72 hours? A rush deployment fee of $250 applies. Same-day
                deployment available for emergencies.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {currentStep === 3 && (
          <div>
            <h2 className="font-display text-2xl font-bold mb-fib-2">
              Service Details
            </h2>
            <p className="text-sm text-muted-foreground mb-fib-6">
              Specify the number of guards and hours needed.
            </p>

            <div className="space-y-fib-6">
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
                  max={10}
                  value={guards}
                  onChange={(e) => setGuards(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-fib-1">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>

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

              {/* Price Summary */}
              <div className="rounded-fib-3 border border-primary/20 bg-primary/5 p-fib-5">
                <h4 className="text-sm font-medium text-foreground mb-fib-3">
                  Price Summary
                </h4>
                <div className="space-y-fib-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate per guard</span>
                    <span className="text-foreground">${selectedRate}/hr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guards</span>
                    <span className="text-foreground">{guards}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hours/day</span>
                    <span className="text-foreground">{hoursPerDay}</span>
                  </div>
                  <div className="border-t border-border pt-fib-2 mt-fib-2 flex justify-between font-semibold">
                    <span className="text-foreground">Estimated Daily</span>
                    <span className="text-primary text-lg">${estimatedDaily.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Payment (Coming Soon) */}
        {currentStep === 4 && (
          <div className="text-center py-fib-6">
            <div className="mx-auto mb-fib-5 inline-flex rounded-full bg-primary/10 p-fib-5 text-primary">
              <CreditCard size={40} />
            </div>
            <h2 className="font-display text-2xl font-bold">
              Secure Checkout
            </h2>
            <p className="mt-fib-3 text-muted-foreground max-w-md mx-auto">
              Our secure Stripe-powered checkout is being integrated. In the meantime,
              complete your booking by calling us or submitting a contact form.
            </p>
            <div className="mt-fib-5 inline-flex items-center gap-fib-2 rounded-full bg-primary/10 px-fib-5 py-fib-3 text-sm font-medium text-primary">
              <Info size={16} />
              Coming Soon — Stripe Integration
            </div>

            {/* Price Summary for review */}
            <div className="mt-fib-6 max-w-sm mx-auto rounded-fib-4 border border-border bg-muted/30 p-fib-5 text-left">
              <h4 className="text-sm font-medium text-foreground mb-fib-3">
                Booking Summary
              </h4>
              <div className="space-y-fib-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="text-foreground font-medium">
                    {serviceTypes.find((s) => s.id === selectedService)?.title ?? "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guards</span>
                  <span className="text-foreground">{guards}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hours/day</span>
                  <span className="text-foreground">{hoursPerDay}</span>
                </div>
                <div className="border-t border-border pt-fib-2 mt-fib-2 flex justify-between font-semibold">
                  <span className="text-foreground">Daily Estimate</span>
                  <span className="text-primary">${estimatedDaily.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-fib-7 pt-fib-5 border-t border-border">
          <button
            onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
            disabled={currentStep === 1}
            className={cn(
              "inline-flex items-center gap-fib-2 rounded-fib-3 px-fib-5 py-fib-3 text-sm font-medium transition-colors",
              currentStep === 1
                ? "text-muted-foreground cursor-not-allowed border border-border/50 bg-muted/30"
                : "text-foreground border border-border hover:bg-muted"
            )}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep((s) => Math.min(4, s + 1))}
              disabled={currentStep === 1 && !selectedService}
              className={cn(
                "inline-flex items-center gap-fib-2 rounded-fib-3 px-fib-5 py-fib-3 text-sm font-medium",
                currentStep === 1 && !selectedService
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "btn-cta text-white"
              )}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          ) : (
            <a
              href="/contact"
              className="btn-cta inline-flex items-center gap-fib-2 rounded-fib-3 px-fib-5 py-fib-3 text-sm font-medium text-white"
            >
              Contact to Complete
              <ArrowRight size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Check } from "lucide-react";
import { usePlans } from "@/context/PlansContext";
import Link from "next/link";

export default function PlansPage() {
  const { plans } = usePlans();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Plans</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage subscription plans — all plans are billed yearly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`relative bg-card border-2 ${plan.color} rounded-2xl p-6 flex flex-col`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-600 text-white">
                  Most Popular
                </span>
              </div>
            )}

            {/* Plan header */}
            <div className="mb-6">
              <span
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${plan.badge}`}
              >
                {plan.name}
              </span>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">
                  ${plan.price}
                </span>
                <span className="text-muted-foreground text-sm ml-1">
                  / {plan.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {plan.credits.toLocaleString()} credits {plan.usage}
              </p>
            </div>

            {/* Benefits */}
            <div className="flex-1 space-y-3 mb-6">
              {plan.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Check
                      size={10}
                      className="text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Action button */}
            <Link
              href={`/plans/${index}/edit`}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors text-center block ${plan.buttonStyle}`}
            >
              Edit Plan
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

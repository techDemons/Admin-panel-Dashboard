"use client";

import { useMemo, useState } from "react";
import { Check, Plus, Trash2 } from "lucide-react";

type Plan = {
  name: string;
  price: number;
  credits: number;
  usage: string;
  period: string;
  color: string;
  badge: string;
  buttonStyle: string;
  benefits: string[];
  popular?: boolean;
};

const initialPlans: Plan[] = [
  {
    name: "Basic",
    price: 99,
    credits: 100,
    usage: "included",
    period: "year",
    color: "border-gray-300 dark:border-gray-600",
    badge: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
    buttonStyle:
      "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200",
    benefits: [
      "Up to 100 credits per year",
      "5 projects included",
      "Basic video generation",
      "Email support",
      "Standard subtitle styles",
    ],
  },
  {
    name: "Pro",
    price: 249,
    credits: 500,
    usage: "included",
    period: "year",
    color: "border-violet-400 dark:border-violet-500",
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    buttonStyle:
      "bg-violet-600 text-white hover:bg-violet-700",
    popular: true,
    benefits: [
      "Up to 500 credits per year",
      "Unlimited projects",
      "Advanced video generation",
      "Priority email & chat support",
      "All subtitle styles",
      "Custom hooks & CTAs",
      "Team collaboration (up to 5)",
    ],
  },
  {
  name: "Prime",
  price: 499,
  credits: 2000,
  usage: "included",
  period: "year",
  color: "border-[#32d2a6]",
  badge: "bg-[#32d2a6]/10 text-[#32d2a6]",
  buttonStyle: "bg-[#32d2a6] text-black hover:bg-[#28b893]",
  benefits: [
    "Up to 2,000 credits per year",
    "Unlimited projects",
    "Premium video generation with AI",
    "Dedicated account manager",
    "All subtitle styles + custom fonts",
    "Custom hooks & CTAs library",
    "Team collaboration (unlimited)",
    "API access",
    "White-label exports",
    "Advanced analytics & reporting",
  ],
}
];

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const editingPlan = useMemo(
    () => (editingIndex === null ? null : plans[editingIndex]),
    [editingIndex, plans]
  );
  const [draft, setDraft] = useState<Plan | null>(null);

  const handleEditPlan = (index: number) => {
    setEditingIndex(index);
    setDraft({ ...plans[index], benefits: [...plans[index].benefits] });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setDraft(null);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null || !draft) return;
    setPlans((prev) =>
      prev.map((p, i) => (i === editingIndex ? draft : p))
    );
    setEditingIndex(null);
    setDraft(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Plans</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage subscription plans — all plans are billed yearly
        </p>
      </div>

      {/* Edit Panel */}
      {draft && editingPlan && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Edit Plan — {editingPlan.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Update plan details, credits, usage, and benefits.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 rounded-lg text-sm border border-border text-muted-foreground hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${editingPlan.buttonStyle}`}
              >
                Save Changes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Plan Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={draft.name}
                  onChange={(e) =>
                    setDraft((prev) =>
                      prev ? { ...prev, name: e.target.value } : prev
                    )
                  }
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Price (USD)
                </label>
                <input
                  type="number"
                  min={0}
                  value={draft.price}
                  onChange={(e) =>
                    setDraft((prev) =>
                      prev ? { ...prev, price: Number(e.target.value) } : prev
                    )
                  }
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Credits
                </label>
                <input
                  type="number"
                  min={0}
                  value={draft.credits}
                  onChange={(e) =>
                    setDraft((prev) =>
                      prev ? { ...prev, credits: Number(e.target.value) } : prev
                    )
                  }
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Credits Usage Text
                </label>
                <input
                  type="text"
                  value={draft.usage}
                  onChange={(e) =>
                    setDraft((prev) =>
                      prev ? { ...prev, usage: e.target.value } : prev
                    )
                  }
                  placeholder="included / per year / per month"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Billing Period
                </label>
                <input
                  type="text"
                  value={draft.period}
                  onChange={(e) =>
                    setDraft((prev) =>
                      prev ? { ...prev, period: e.target.value } : prev
                    )
                  }
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Benefits
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Add, remove, or edit benefit text.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setDraft((prev) =>
                      prev
                        ? { ...prev, benefits: [...prev.benefits, ""] }
                        : prev
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Plus size={14} />
                  Add Benefit
                </button>
              </div>

              <div className="space-y-3">
                {draft.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={benefit}
                      onChange={(e) =>
                        setDraft((prev) => {
                          if (!prev) return prev;
                          const next = [...prev.benefits];
                          next[i] = e.target.value;
                          return { ...prev, benefits: next };
                        })
                      }
                      className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                      onClick={() =>
                        setDraft((prev) => {
                          if (!prev) return prev;
                          const next = prev.benefits.filter((_, idx) => idx !== i);
                          return { ...prev, benefits: next };
                        })
                      }
                      className="p-2 rounded-md border border-border text-muted-foreground hover:text-red-600 hover:border-red-500/60 hover:bg-red-500/10 transition-colors"
                      aria-label="Remove benefit"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <Check size={10} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Action button */}
            <button
              onClick={() => handleEditPlan(index)}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${plan.buttonStyle}`}
            >
              Edit Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

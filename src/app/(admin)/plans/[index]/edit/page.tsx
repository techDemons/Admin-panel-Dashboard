"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePlans, Plan } from "@/context/PlansContext";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";

export default function EditPlanPage() {
  const params = useParams();
  const router = useRouter();
  const { plans, updatePlan } = usePlans();

  const planIndex = Number(params.index);
  const plan = plans[planIndex];

  const [draft, setDraft] = useState<Plan>(() => ({
    ...plan,
    benefits: [...plan.benefits],
  }));

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium text-foreground mb-2">
          Plan not found
        </p>
        <Link
          href="/plans"
          className="text-sm text-primary hover:underline"
        >
          Back to Plans
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    if (!draft.name.trim()) {
      toast.error("Plan name cannot be empty");
      return;
    }
    if (draft.price < 0) {
      toast.error("Price cannot be negative");
      return;
    }
    if (draft.credits < 0) {
      toast.error("Credits cannot be negative");
      return;
    }
    const emptyBenefit = draft.benefits.some((b) => !b.trim());
    if (emptyBenefit) {
      toast.error("All benefits must be filled in before saving");
      return;
    }
    updatePlan(planIndex, draft);
    toast.success(`"${draft.name}" plan updated successfully`);
    router.push("/plans");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/plans"
            className="p-2 rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Edit Plan — {plan.name}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Update plan details, credits, usage, and benefits
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/plans"
            className="px-4 py-2 rounded-lg text-sm border border-border text-muted-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${plan.buttonStyle}`}
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
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
                  setDraft((prev) => ({ ...prev, name: e.target.value }))
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
                  setDraft((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
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
                  setDraft((prev) => ({
                    ...prev,
                    credits: Number(e.target.value),
                  }))
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
                  setDraft((prev) => ({ ...prev, usage: e.target.value }))
                }
                placeholder="included / per year / per month"
                className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Billing Period
              </label>
              <div className="w-full px-3 py-2 rounded-lg border border-input bg-muted text-muted-foreground text-sm">
                Year
              </div>
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
                onClick={() => {
                  const hasEmpty = draft.benefits.some((b) => !b.trim());
                  if (hasEmpty) {
                    toast.error("Please fill in the empty benefit before adding a new one");
                    return;
                  }
                  setDraft((prev) => ({
                    ...prev,
                    benefits: [...prev.benefits, ""],
                  }));
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Plus size={14} />
                Add Benefit
              </button>
            </div>

            <div className="space-y-3">
              {draft.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) =>
                      setDraft((prev) => {
                        const next = [...prev.benefits];
                        next[i] = e.target.value;
                        return { ...prev, benefits: next };
                      })
                    }
                    className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    onClick={() =>
                      setDraft((prev) => ({
                        ...prev,
                        benefits: prev.benefits.filter((_, idx) => idx !== i),
                      }))
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
    </div>
  );
}

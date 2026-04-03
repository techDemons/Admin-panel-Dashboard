"use client";

import { useState } from "react";
import StatsBar from "@/components/admin/Subscription/StatsBar";
import { mockSubscribers, Subscriber } from "@/lib/mockData";
import { Search, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

const planBadge: Record<Subscriber["plan"], string> = {
  Free: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
  Pro: "bg-[#5a4dd9] text-white",
  Prime: "bg-[#32d2a6] text-black",
};

const statusBadge: Record<Subscriber["status"], string> = {
  Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Cancelled: "bg-red-500/10 text-red-600 dark:text-red-400",
  Expired: "bg-gray-500/10 text-gray-500",
};

export default function SubscriptionsPage() {
  const [subscribers, setSubscribers] = useState(mockSubscribers);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    sub: Subscriber | null;
    action: "cancel" | "activate" | null;
  }>({ open: false, sub: null, action: null });

  const filtered = subscribers.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === "All" || s.plan === filterPlan;
    const matchStatus = filterStatus === "All" || s.status === filterStatus;
    return matchSearch && matchPlan && matchStatus;
  });

  // const handleUpgrade = (id: string) => {
  //   setSubscribers((prev) =>
  //     prev.map((s) => {
  //       if (s.id !== id) return s;
  //       const next = s.plan === "Free" ? "Pro" : "Prime";
  //       return { ...s, plan: next as Subscriber["plan"] };
  //     })
  //   );
  //   const sub = subscribers.find((s) => s.id === id);
  //   toast.success(`"${sub?.name}" plan has been upgraded`);
  // };

  const handleConfirm = () => {
    if (!confirmModal.sub || !confirmModal.action) return;
    const { sub, action } = confirmModal;

    if (action === "cancel") {
      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === sub.id ? { ...s, status: "Cancelled" as const } : s
        )
      );
      toast.warning(`"${sub.name}" subscription has been cancelled`);
    } else {
      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === sub.id ? { ...s, status: "Active" as const } : s
        )
      );
      toast.success(`"${sub.name}" subscription has been reactivated`);
    }

    setConfirmModal({ open: false, sub: null, action: null });
  };

  return (
    <div className="space-y-6">
      {/* Confirmation Modal */}
      {confirmModal.open && confirmModal.sub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-black mb-4">
              {confirmModal.action === "cancel"
                ? "Cancel Subscription"
                : "Activate Subscription"}
            </h3>
            <p className="text-sm text-black/60 mb-5">
              {confirmModal.action === "cancel"
                ? "Do you want to cancel this subscription?"
                : "Do you want to reactivate this subscription?"}
            </p>
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-black/50 w-24 shrink-0">Name:</span>
                <span className="text-sm font-medium text-black">{confirmModal.sub.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-black/50 w-24 shrink-0">Email:</span>
                <span className="text-sm font-medium text-black">{confirmModal.sub.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-black/50 w-24 shrink-0">Plan:</span>
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${planBadge[confirmModal.sub.plan]}`}
                >
                  {confirmModal.sub.plan}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-black/50 w-24 shrink-0">Billing Cycle:</span>
                <span className="text-sm font-medium text-black">{confirmModal.sub.billingCycle}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-black/50 w-24 shrink-0">Status:</span>
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[confirmModal.sub.status]}`}
                >
                  {confirmModal.sub.status}
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() =>
                  setConfirmModal({ open: false, sub: null, action: null })
                }
                className="px-4 py-2 rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                  confirmModal.action === "cancel"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                  {confirmModal.action === "cancel" ? "Deactivate Subscription" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscriptions</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Monitor subscription metrics and manage subscribers
        </p>
      </div>

      <StatsBar />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search subscribers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="relative">
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          >
            <option value="All">All Plans</option>
            <option value="Free">Free</option>
            <option value="Pro">Pro</option>
            <option value="Prime">Prime</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Expired">Expired</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  User
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Plan
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Billing Cycle
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Start Date
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Next Billing
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-foreground">{sub.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {sub.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${planBadge[sub.plan]}`}
                    >
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {sub.billingCycle}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {sub.startDate}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {sub.nextBilling}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[sub.status]}`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {sub.status === "Active" && (
                        <button
                          onClick={() =>
                            setConfirmModal({
                              open: true,
                              sub,
                              action: "cancel",
                            })
                          }
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 min-w-[104px] text-xs font-semibold rounded-md border border-red-500/60 text-red-600 hover:bg-red-500/10 hover:border-red-500 transition-colors"
                        >
                          Deactivate
                        </button>
                      )}
                      {(sub.status === "Cancelled" ||
                        sub.status === "Expired") && (
                        <button
                          onClick={() =>
                            setConfirmModal({
                              open: true,
                              sub,
                              action: "activate",
                            })
                          }
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 min-w-[104px] text-xs font-semibold rounded-md
      bg-primary/80 text-white shadow-sm
      hover:bg-primary/98 active:scale-[0.98]
      transition-all duration-150"
                        >
                          Activate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

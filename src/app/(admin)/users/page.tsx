"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockUsers, User } from "@/lib/mockData";
import { Search, ChevronDown, Eye } from "lucide-react";
import { toast } from "react-toastify";

const planBadge: Record<User["plan"], string> = {
  Free: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
  Pro: "bg-[#5a4dd9] text-white",
  Prime: "bg-[#32d2a6] text-black",
};

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [confirmModal, setConfirmModal] = useState<{
  open: boolean;
  user: User | null;
  action: "suspend" | "activate" | null;
}>({
  open: false,
  user: null,
  action: null,
});
  const router = useRouter();

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = filterPlan === "All" || u.plan === filterPlan;
    const matchStatus = filterStatus === "All" || u.status === filterStatus;
    return matchSearch && matchPlan && matchStatus;
  });

  const handleToggleStatus = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;

    const isActive = user.status === "Active";

    if (isActive) {
      setConfirmModal({ open: true, user, action: "suspend" });
    } else {
      setConfirmModal({ open: true, user, action: "activate" });
    }
  };

  const handleConfirmAction = () => {
    if (!confirmModal.user || !confirmModal.action) return;
    const userId = confirmModal.user.id;
    const userName = confirmModal.user.name;

    if (confirmModal.action === "suspend") {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, status: "Suspended" as User["status"] } : u
        )
      );
      toast.info(`User "${userName}" has been suspended`);
    } else {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, status: "Active" as User["status"] } : u
        )
      );
      toast.success(`User "${userName}" has been reactivated`);
    }

    setConfirmModal({ open: false, user: null, action: null });
  };

  return (
    <div className="space-y-6">
      {/* Confirmation Modal */}
      {confirmModal.open && confirmModal.user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-black mb-4">
              {confirmModal.action === "suspend" ? "Suspend Account" : "Activate Account"}
            </h3>
            <p className="text-sm text-black/60 mb-5">
              {confirmModal.action === "suspend"
                ? "Are you sure you want to suspend this account?"
                : "Are you sure you want to reactivate this account?"}
            </p>
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-black/50 w-20 shrink-0">Name</span>
                <span className="text-sm font-medium text-black">{confirmModal.user.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-black/50 w-20 shrink-0">Email</span>
                <span className="text-sm font-medium text-black">{confirmModal.user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-black/50 w-20 shrink-0">Plan</span>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${planBadge[confirmModal.user.plan]}`}>
                  {confirmModal.user.plan}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-black/50 w-20 shrink-0">Joined</span>
                <span className="text-sm font-medium text-black">{confirmModal.user.joinedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-black/50 w-20 shrink-0">Last Active</span>
                <span className="text-sm font-medium text-black">{confirmModal.user.lastActive}</span>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal({ open: false, user: null, action: null })}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                  confirmModal.action === "suspend"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {confirmModal.action === "suspend" ? "Suspend" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage registered users
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search by name or email..."
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
            <option value="Suspended">Suspended</option>
            {/* <option value="Inactive">Inactive</option> */}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Name
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Email
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Plan
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Joined
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Last Active
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
              {filtered.map((user) => {
                const isActive = user.status === "Active";
                const isSuspended = user.status === "Suspended";
                const canToggle = isActive || isSuspended;

                return (
                  <tr
                    key={user.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${planBadge[user.plan]}`}
                      >
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {user.joinedDate}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {user.lastActive}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => canToggle && handleToggleStatus(user.id)}
                          disabled={!canToggle}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                            isActive ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
                          }`}
                          title={
                            canToggle
                              ? isActive
                                ? "Toggle to suspend"
                                : "Toggle to activate"
                              : "Inactive users cannot be toggled"
                          }
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                              isActive ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span
                          className={`text-xs font-medium ${
                            isActive
                              ? "text-emerald-600 dark:text-emerald-400"
                              : isSuspended
                              ? "text-red-600 dark:text-red-400"
                              : "text-gray-500"
                          }`}
                        >
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => router.push(`/users/${user.id}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md 
      bg-primary/80 text-white shadow-sm 
      hover:bg-primary/98 active:scale-[0.98] 
      transition-all duration-150"
                      ><Eye size={14} />
                        View Profile
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No users found.
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

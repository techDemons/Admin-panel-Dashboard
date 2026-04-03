"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { mockUsers, mockProjects, userProjects, User } from "@/lib/mockData";
import { ArrowLeft, Eye, Pencil, X, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

const planBadge: Record<string, string> = {
  Free: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
  Pro: "bg-[#5a4dd9] text-white",
  Prime: "bg-[#32d2a6] text-black",
};

const statusBadge: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Suspended: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const user = mockUsers.find((u) => u.id === id);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editEmail, setEditEmail] = useState(user?.email || "");
  const [editPlan, setEditPlan] = useState<User["plan"]>(user?.plan || "Free");

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground text-lg">User not found</p>
        <button
          onClick={() => router.push("/users")}
          className="mt-4 text-primary hover:underline text-sm"
        >
          Back to Users
        </button>
      </div>
    );
  }

  const projectIds = userProjects[user.id] || [];
  const projects = projectIds
    .map((pid) => mockProjects.find((p) => p.id === pid))
    .filter(Boolean);

  const handleStartEdit = () => {
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPlan(user.plan);
    setEditing(true);
  };

  const handleSave = () => {
    user.name = editName;
    user.email = editEmail;
    user.plan = editPlan;
    setEditing(false);
    toast.success("User details updated successfully");
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/users")}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Details</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Viewing profile for {user.name}
          </p>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Profile Information
          </h2>
          {!editing ? (
            <button
              onClick={handleStartEdit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              <Pencil size={14} />
              Edit Details
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              >
                <X size={14} />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Check size={14} />
                Save
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Name
            </p>
            {editing ? (
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            ) : (
              <p className="text-sm font-medium text-foreground">{user.name}</p>
            )}
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Email
            </p>
            {editing ? (
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            ) : (
              <p className="text-sm font-medium text-foreground">{user.email}</p>
            )}
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Plan
            </p>
            {editing ? (
              <select
                value={editPlan}
                onChange={(e) => setEditPlan(e.target.value as User["plan"])}
                className="w-full px-3 py-1.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Prime">Prime</option>
              </select>
            ) : (
              <span
                className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${planBadge[user.plan]}`}
              >
                {user.plan}
              </span>
            )}
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Joined
            </p>
            <p className="text-sm font-medium text-foreground">
              {user.joinedDate}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Last Active
            </p>
            <p className="text-sm font-medium text-foreground">
              {user.lastActive}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              Status
            </p>
            <span
              className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[user.status]}`}
            >
              {user.status}
            </span>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Projects</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {projects.length} project{projects.length !== 1 ? "s" : ""} assigned
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Project Name
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Project ID
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Created
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                if (!project) return null;
                const projectStatusStyle =
                  project.status === "generated"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : project.status === "generating"
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400";

                return (
                  <tr
                    key={project.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {project.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                      {project.id}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${projectStatusStyle}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {project.createdAt}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/users/${user.id}/project/${project.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <Eye size={14} />
                        View Project
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {projects.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    No projects assigned to this user.
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { mockProjects, Project } from "@/lib/mockData";
import { Trash2, Search, AlertTriangle, X, Eye } from "lucide-react";
import { toast } from "react-toastify";

const statusStyles: Record<Project["status"], string> = {
  generated: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  generating: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  failed: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const project = projects.find((p) => p.id === deleteTarget);
    setProjects((prev) => prev.filter((p) => p.id !== deleteTarget));
    toast.success(`Project "${project?.name}" has been deleted`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      {/* Delete confirmation banner */}
      {deleteTarget && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
          <div className="flex items-center gap-3 bg-card border border-border rounded-xl shadow-xl px-5 py-4 max-w-md w-full animate-slide-up">
            <div className="p-2 rounded-lg bg-red-500/10 shrink-0">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <p className="text-sm font-medium text-foreground flex-1">
              Do you want to delete this project?
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
            <button
              onClick={() => setDeleteTarget(null)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Project Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and monitor all projects
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Project ID
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Project Name
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Total Videos
                </th>
                {/* <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Multiplier
                </th> */}
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Created On
                </th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left px-5 py-3 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {project.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {project.name}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {project.totalVideos}
                  </td>
                  {/* <td className="px-4 py-3 text-foreground">
                    x{project.combinationMultiplier}
                  </td> */}
                  <td className="px-4 py-3 text-muted-foreground">
                    {project.createdAt}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        statusStyles[project.status]
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
  <div className="flex items-center gap-2">

    {/* View Details */}
    <Link
      href={`/projects/${project.id}`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md 
      bg-primary/80 text-white shadow-sm 
      hover:bg-primary/98 active:scale-[0.98] 
      transition-all duration-150"
    >
      <Eye size={14} />
      View Projects
    </Link>

    {/* Delete */}
    {/* <button
      onClick={() => setDeleteTarget(project.id)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md 
      border border-red-200 dark:border-red-800 
      text-red-600 dark:text-red-400 
      hover:bg-red-50 dark:hover:bg-red-900/20
      active:scale-[0.98] 
      transition-all duration-150"
    >
      <Trash2 size={14} />
      Delete
    </button> */}

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
                    No projects found.
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
